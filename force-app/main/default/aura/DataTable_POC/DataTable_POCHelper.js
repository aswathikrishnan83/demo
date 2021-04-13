({
    saveEdition: function(cmp, draftValues) {
        console.log('draftValues' + JSON.stringify(draftValues));



        var action = cmp.get("c.updateClientType");
        action.setParams({ "clientTypeLst": draftValues });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('edit state' + state);
            if (state === "SUCCESS") {
                console.log('success!!!!!');
                cmp.set('v.suppressSavePanel', true);
            }
            //$A.get('e.force:refreshView').fire();

        });
        $A.enqueueAction(action);
    }

})