({
	saveKey : function(component, event, helper) {
        var key=component.get("v.Key");
        var action=component.get("c.doSave");
        action.setParams({
            "key":key
        })
        action.setCallback(this,function(response)
                           {
                               var res=response.getState();
                               console.log('res'+res);
                               if(res==="SUCCESS")
                               {
                                   var result=response.getReturnValue();
                               }
                               
                           });
        $A.enqueueAction(action);
       
		
	}
})