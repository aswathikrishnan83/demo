({
    doInit: function(component, event, helper) {
        component.set('v.columns', [
            { label: 'Client Type', fieldName: 'Client_Type__c', type: 'text' },
            { label: 'Company', fieldName: 'Company__c', type: 'text' },
            { label: 'Tax Id', fieldName: 'TAXID__c', type: 'text', editable: true },
            { label: 'Lender Id', fieldName: 'LENDER_ID__c', type: 'text', editable: true },

            { label: 'Appraiser Id', fieldName: 'Appraiser_ID__c', type: 'text', editable: true }




        ]);
        var action = component.get('c.getClientTypeInfo');
        var caseId = component.get('v.recordId');
        console.log('caseId' + caseId);
        action.setParams({ 'caseId': caseId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state' + state);
            if (state === "SUCCESS") {
                console.log('state' + state);
                var result = response.getReturnValue();
                console.log('result' + JSON.stringify(result));
                //component.set('v.data', response.getReturnValue());
                var formRes = [];
                for (var i = 0; i < result.clientTypeLst.length; i++) {
                    var res = {};
                    if ($A.util.isEmpty(result.clientTypeLst[i].TAXID__c)) {
                        res.TAXID__c = 'Not Applicable';
                    } else {
                        //console.log('tax id' + result[i].TAXID__c);
                        res.TAXID__c = result.clientTypeLst[i].TAXID__c;

                    }
                    if ($A.util.isEmpty(result.clientTypeLst[i].LENDER_ID__c)) {
                        res.LENDER_ID__c = 'Not Applicable';
                    } else {
                        res.LENDER_ID__c = result.clientTypeLst[i].LENDER_ID__c;
                    }
                    if ($A.util.isEmpty(result.clientTypeLst[i].Appraiser_ID__c)) {
                        res.Appraiser_ID__c = 'Not Applicable';
                    } else {
                        res.Appraiser_ID__c = result.clientTypeLst[i].Appraiser_ID__c;
                    }
                    res.Id = result.clientTypeLst[i].Id;
                    res.Client_Type__c = result.clientTypeLst[i].Client_Type__c;
                    res.Company__c = result.clientTypeLst[i].Company__c;
                    formRes.push(res);
                    console.log('formRes' + JSON.stringify(formRes));
                    component.set('v.contactId', result.contactId);
                    console.log('contact id' + component.get('v.contactId'));

                }
            }
            component.set('v.data', formRes);

        });
        $A.enqueueAction(action);



    },
    handleSaveEdition: function(cmp, event, helper) {
        var draftValues = event.getParam('draftValues');

        helper.saveEdition(cmp, draftValues);
    },
    handleClick: function(cmp, event, helper) {
        console.log('new client type');
        var modalBody;
        console.log('contact datatable' + cmp.get('v.contactId'));
        var contactId = cmp.get('v.contactId');

        $A.createComponent("c:CreateNewClientType", { "contactId": contactId },
            function(content, status) {
                if (status === "SUCCESS") {
                    modalBody = content;
                    cmp.find('overlayLib').showCustomModal({
                        header: "Create a new Client Type",
                        body: modalBody,
                        showCloseButton: true,
                        cssClass: "slds-modal_medium",
                        closeCallback: function() {

                        }
                    })
                }
            });
    }

})