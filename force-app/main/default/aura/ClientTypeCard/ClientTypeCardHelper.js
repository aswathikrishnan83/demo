({
	getUpdatedCardInfo : function(component,event) {
		var action = component.get('c.getClientTypeInfo');
        var caseId = component.get('v.caseId');
        var currRcdId = component.get('v.currRcdId');
        component.set('v.caseId',caseId);
        console.log('caseId' + caseId);
        action.setParams({ 'caseId': caseId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state' + state);
            if (state === "SUCCESS") {
                console.log('state' + state);
                var clientTypeLstObj={};
                var result = response.getReturnValue();
                console.log('result card' + JSON.stringify(result));
                //component.set('v.clientTypeLst', response.getReturnValue());
                var clientTypelST=[];
                for(var i=0;i<result.clientTypeLst.length;i++)
                {   
                    console.log('insidde '+result.clientTypeLst.length);
                    
                    if(result.clientTypeLst[i].Id==currRcdId){
                    	clientTypeLstObj.Name=result.clientTypeLst[i].Name; 
                        clientTypeLstObj.Client_Type__c=result.clientTypeLst[i].Client_Type__c; 
                        clientTypeLstObj.Company=result.clientTypeLst[i].Company__c; 
                         clientTypeLstObj.Id=result.clientTypeLst[i].Id; 
                        clientTypeLstObj.checkbox=result.clientTypeLst[i].checkBox__c; 
                        if(!$A.util.isEmpty(result.clientTypeLst[i].Appraiser_ID__c))
                        {
                            clientTypeLstObj.AppraiserId=result.clientTypeLst[i].Appraiser_ID__c; 
                        }
                        if(!$A.util.isEmpty(result.clientTypeLst[i].TAXID__c))
                        {
                            clientTypeLstObj.TaxId=result.clientTypeLst[i].TAXID__c;
                        }
                        if(!$A.util.isEmpty(result.clientTypeLst[i].LENDER_ID__c))
                        {
                            clientTypeLstObj.LenderId=result.clientTypeLst[i].LENDER_ID__c; 
                        }
                        if(!$A.util.isEmpty(result.clientTypeLst[i].CHUMS_ID__c))
                        {
                            clientTypeLstObj.ChumsId=result.clientTypeLst[i].CHUMS_ID__c; 
                        }
                        if (result.clientTypeLst[i].Client_Type__c =='Taxator'){
                            clientTypeLstObj.type = 'appriser1';
                        }
                        else if (result.clientTypeLst[i].Client_Type__c =='Appraiser'){
                            clientTypeLstObj.type = 'appraiser2';
                        }
                        else{
                            clientTypeLstObj.type = 'appraiser3';
                        }
                     	clientTypeLstObj.caseId=caseId;
                    	clientTypeLstObj.contactId=result.clientTypeLst[i].contactId;
                    
                        
                    }
                    
					//clientTypelST.push(clientTypeLstObj); 
                                        
                    
                    
                } 
                component.set('v.acc', clientTypeLstObj);
               // component.set('v.clientTypeLst', clientTypelST);
                
                console.log('cleint type lst'+JSON.stringify(clientTypeLstObj));
                
            }
        
		
	});
            $A.enqueueAction(action);
	}
})