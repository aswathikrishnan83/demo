({
    doInit: function(component, event, helper) {
        // Prepare a new record from template
        helper.getPickListValues(component);
        console.log('contactId----->' + component.get('v.contactId'));
        component.find("clientTypeRecordCreator").getNewRecord(
            "Client_Type__c", // sObject type (entityAPIName)
            null, // recordTypeId
            false, // skip cache?
            $A.getCallback(function() {
                var rec = component.get("v.newClientType");
                console.log(JSON.stringify(rec, null, 2));
                var error = component.get("v.newClientTypeError");
                if (error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                } else {
                    console.log("Record template initialized: " + rec.apiName);
                }
            })
        );
    },
    handleClientTypeChange: function(component, event, helper) {
        console.log('-----simple client type-----');
        console.log('-----selectedValue-----'+component.get('v.selectedValue'));
        var clientType = component.get('v.simplenewClientType');
        clientType.Client_Type__c=component.get('v.selectedValue');
        console.log(JSON.stringify(component.get('v.simplenewClientType'),null,2));
        component.set('v.simplenewClientType',clientType);
    },
    handleSaveRecord: function(component, event, helper) {
        if (helper.validateClientTypeForm(component)) {
            component.set("v.simplenewClientType.ContactName__c", component.get("v.contactId"));
            component.find("clientTypeRecordCreator").saveRecord(function(saveResult) {
                if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                    // record is saved successfully
                    var resultsToast = $A.get("e.force:showToast");
                    resultsToast.setParams({
                        "title": "Saved",
                        "message": "The record was saved."
                    });
                    resultsToast.fire();
                    $A.get('e.force:refreshView').fire(); //this is not working here or after notifyclose.
                    component.find("overlayLib").notifyClose();


                } else if (saveResult.state === "INCOMPLETE") {
                    // handle the incomplete state
                    console.log("User is offline, device doesn't support drafts.");
                } else if (saveResult.state === "ERROR") {
                    // handle the error state
                    console.log('Problem saving contact, error: ' +
                        JSON.stringify(saveResult.error));
                } else {
                    console.log('Unknown problem, state: ' + saveResult.state +
                        ', error: ' + JSON.stringify(saveResult.error));
                }
            });
        }
    }
})