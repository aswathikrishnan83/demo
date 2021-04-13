({
	doInit : function(component, event, helper) {
		console.log('in init===>');
    	var action= component.get('c.updateClientType');
        action.setParams({caseId:component.get('v.recordId'),val:false});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                console.log('case updated');
                 $A.get('e.force:refreshView').fire();
            } 
        });
        $A.enqueueAction(action);
	},
    showClientType: function(component,event,helper){
        var action= component.get('c.updateClientType');
        action.setParams({caseId:component.get('v.recordId'),val:true});
        action.setCallback(this,function(response){
            if(response.getState() == "SUCCESS"){
                console.log('case updated');
                 $A.get('e.force:refreshView').fire();
            } 
        });
        $A.enqueueAction(action);
	}
    /*recordLoaded: function(component,event,helper){
        console.log(JSON.stringify(component.get('v.caseRecord'),null,2));
        var caseRecord = component.get('v.caseRecord');
        if(caseRecord.Show_Client_Type__c!= true){
        caseRecord.Show_Client_Type__c = true;
        //component.set('v.caseRecord',caseRecord);
        component.set('v.recordLoaded',false);
        component.find("recordLoader").saveRecord($A.getCallback(function(saveResult) {
            if (saveResult.state === "SUCCESS" || saveResult.state === "DRAFT") {
                        //alert('success');                    
            } else if (saveResult.state === "INCOMPLETE") {
                console.log("User is offline, device doesn't support drafts.");
            } else if (saveResult.state === "ERROR") {
                console.log(JSON.stringify(saveResult.error));
            } else {
                console.log('Unknown problem, state: ' + saveResult.state + ', error: ' + JSON.stringify(saveResult.error));
            }
        }));
        }
    }*/
})