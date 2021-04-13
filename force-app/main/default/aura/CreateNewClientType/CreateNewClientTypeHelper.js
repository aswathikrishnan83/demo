({
    validateClientTypeForm: function(component) {
        var validClientType = true;
        // Show error messages if required fields are blank
        var allValid = component.find('clientTypeField').reduce(function(validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);
        if (allValid) {
            // Verify we have an account to attach it to
            var clientType = component.get("v.newClientType");
            if ($A.util.isEmpty(clientType)) {
                validClientType = false;
                console.log("Quick action context doesn't have a valid clientType.");
            }
            return (validClientType);
        }
    },
    getPickListValues: function(component) {
        var action = component.get("c.getPickListValues");
        action.setParams({
            objectType: 'Client_Type__c',
            selectedField: 'Client_Type__c'
        });
        action.setCallback(this, function(response) {
            var pklist = response.getReturnValue();
            console.log('picklist'+JSON.stringify(pklist));
            pklist.unshift('---select a value---');
            component.set("v.cTypeVals", pklist);
        })
         
        $A.enqueueAction(action);
    }
})