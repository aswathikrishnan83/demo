({
	handleCmpEvt : function(component, event, helper) {
        alert('caught');
        var message=event.getParam("msg");
        component.set("v.msgfromevt",message);
      
	}
})