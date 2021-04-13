({
    doInit : function(cmp,event){
       /* console.log('init-->');
        var action = cmp.get("c.getUserInfo");
       action.setCallback(this, function(response) {
           let state = response.getState();
           console.log('state user'+state);
           if(cmp.isValid() && state === 'SUCCESS') {
               console.log('rturned user data::'+JSON.stringify(response.getReturnValue()));
               var res=response.getReturnValue();
               cmp.set('v.accountName',res.acc.Name);
               
                         }
       });
        $A.enqueueAction(action);*/
   
        var action = cmp.get("c.getContents");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(cmp.isValid() && state === 'SUCCESS') {
                console.log('contents'+JSON.stringify(response.getReturnValue()));
                cmp.set("v.contents", response.getReturnValue()); 
                console.log('state images'+state);
            }
        });
        $A.enqueueAction(action);
    }

})