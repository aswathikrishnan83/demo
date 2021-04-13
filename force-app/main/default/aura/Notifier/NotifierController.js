({
	fireEvt : function(component, event, helper) {
        alert('here');
        var cmpEvt=component.getEvent("test");
        cmpEvt.setParams({
            "msg":"this is a test"
        });
        cmpEvt.fire();
		
	}
})