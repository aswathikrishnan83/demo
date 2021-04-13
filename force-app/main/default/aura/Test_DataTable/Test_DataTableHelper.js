({
    getAccountData: function(cmp, evt) {
        var action = cmp.get('c.getAccount');
         var sPageURL = decodeURIComponent(window.location.search.substring(1));
        var state=sPageURL.split('=');
        var formState=state[1];
        
        console.log('state'+ state[1]);
        action.setParams({ 'State':state[1]});
        action.setCallback(this, function(response) {
            var state = response.getState();
             console.log('state'+state);
            if (state === "SUCCESS") {
                console.log('state'+state);
                cmp.set('v.data', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);




    }
})