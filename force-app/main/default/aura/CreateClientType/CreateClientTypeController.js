({
    nextTab: function(component, event, helper) {
        console.log('clicked next');
        component.set("v.showRadioButton", false);
        var vale = component.get("v.radioValue");
        console.log('vale' + vale);
        if (vale == 'Appraiser') {
            console.log('appraiser')
            component.set("v.Appraiser", true);


        } else if (vale == 'Lender') {
            component.set("v.Lender", true);

        } else if (vale == 'Taxator') {
            component.set('v.Taxator', true);
        }


    },
    saveRcd: function(component, event, helper) {
        var test = '123';
        console.log('save invoked' + test);
    },
    handleError: function(component, event, helper) {
        console.log('inside handle error');
    },
    handleLoad: function(component, event, helper) {
        console.log('inside handle load');
    },
    closeModal: function(component, event, helper) {
        component.find("overlayLib").notifyClose();
    },
    handleSave: function(component, event, helper) {
        console.log('submit save');

        var lenderId = component.find("lenderid").get('v.value');
        console.log('lender' + lenderId);
        var AppraiserId = component.find("appraiserid").get('v.value');
        console.log('appr' + AppraiserId);
        var taxId = component.find("TAXID__c").get('v.value');
        var Comp = component.find("company").get('v.value');
        var contactId = component.get("v.contactId");
        console.log('contact id modal-->' + contactId);
        console.log('appraiser id' + AppraiserId);
        console.log('Comp' + Comp);
        var clientType = component.get("v.clientType");
        var action = component.get("c.saveClientType");
        action.setParams({
            "AppraiserId": AppraiserId,
            "Comp": Comp,
            "lenderId": lenderId,
            "taxId": taxId,
            "ClientType": clientType,
            "contactId": contactId
        });
        console.log('after passing params');
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('save state' + state);
            if (state === "SUCCESS") {
                console.log('success!!!!!');

            }
            //$A.get('e.force:refreshView').fire();
            component.find("overlayLib").notifyClose();

        });
        $A.enqueueAction(action);
    }



})