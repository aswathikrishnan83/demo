({
	doInit : function(component, event, helper) { 
        console.log('test');
        component.set('v.normalView',true);
    
       var action = component.get('c.getClientTypeInfo');
        var caseId = component.get('v.recordId');
        component.set('v.caseId',caseId)
        console.log('caseId' + caseId);
        action.setParams({ 'caseId': caseId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('state' + state);
            if (state === "SUCCESS") {
                console.log('state' + state);
                var result = response.getReturnValue();
                console.log('result card' + JSON.stringify(result));
                //component.set('v.clientTypeLst', response.getReturnValue());
                var clientTypelST=[];
                for(var i=0;i<result.clientTypeLst.length;i++)
                {   
                    console.log('insidde '+result.clientTypeLst.length);
                    var clientTypeLstObj={};
                    
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
                    clientTypelST.push(clientTypeLstObj); 
                    component.set('v.contactId', result.contactId);
                    
                    
                    
                    
                } 
                component.set('v.clientTypeLst', clientTypelST);
                
                console.log('cleint type lst'+JSON.stringify(component.get('v.clientTypeLst')));
                
            }
        
		
	});
            $A.enqueueAction(action);
        
    },
    onchange: function(cmp,event,helper){
        // event.currentTarget.dataset.record
        // div.getAttribute('data-record-id');
        var dataId = event.target;
        console.log('current target'+JSON.stringify(dataId));
    	var recordId = dataId.getAttribute('data-record');//dataId.dataset.record;
        console.log('checkbox checked:recordId='+recordId);  
    },
    updateClientType:function(cmp,event,helper){
      console.log('inside selection===>');  
    },
    handleClick:function(cmp,event,helper)
    {
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
    },
    handleEdit : function(component, event, helper) {
        console.log('inside edit--');
        var clientType=component.get('v.acc');
        console.log('client type edit'+JSON.stringify(clientType));
        component.set('v.editView',true);
        component.set('v.normalView',false);
        component.set('v.hideEdit',false);
        component.set('v.viewLoading',true);
		
	},
    handleSave:function(component,event,helper)
    {
        console.log('inside save');
        var name=component.find('name').get('v.value');
        var cmp=component.find('cmp').get('v.value');
        var appId=component.find('app').get('v.value');
        var taxId=component.find('tax').get('v.value');
        var lenId=component.find('len').get('v.value');
        var chumId=component.find('chum').get('v.value');
        var ClientType={};
        Client_Type__c.Name=name;
        Client_Type__c.Company__c=cmp;
        Client_Type__c.Appraiser_ID__c=appId;
        Client_Type__c.TAXID__c=taxId;
        Client_Type__c.LENDER_ID__c=lenId;
        Client_Type__c.CHUMS_ID__c=chumId;
        var action=component.get('c.updateClientType');
        action.setParams({'ClientType':JSON.stringify(ClientType)});
        action.setCallback(this, function(response) {
                           
                        var state=response.getState();
                               console.log('state'+state);
                               
                           });
        $A.enqueueAction(action);
        
        
        console.log('vale'+val);
        var updatedRec=component.get('v.acc');
        component.set('v.hideEdit',true);
        component.set('v.editView',false);
        console.log('updated rec'+JSON.stringify(updatedRec));
        
    },
   handleSubmit : function(component, event, helper) {
       event.preventDefault(); // Prevent default submit
       var fields = event.getParam("fields");
       
       component.find('editForm').submit(fields); // Submit form
       component.set('v.normalView',true);
       component.set('v.editView',false);
       console.log('handle handleSubmit');
       
	},
    editFormLoaded: function(component,event,helper){
      	component.set('v.viewLoading',false);  
    },
    cancelEditForm: function(component,event,helper){
      console.log('cancel clicked');
        component.set('v.hideEdit',true);
        component.set('v.normalView',true);
        component.set('v.editView',false);
        
    },
    handleEditFormSubmit: function(component,event,helper){
        component.set('v.viewLoading',true); 
    },
	handleSuccess : function(component, event, helper) {
        console.log('record updated successfully');
        component.set('v.viewLoading',false); 
        component.set('v.normalView',true);
        component.set('v.editView',false);
        component.set('v.hideEdit',true);
        $A.get('e.force:refreshView').fire();
	},
    onCheck: function(cmp,event,helper)
    {
        console.log('clicked checck'+JSON.stringify(cmp.get('v.acc')));
        
    },
    handleAssign:function(cmp,event,helper)
    {
        debugger;
        console.log('Assign checck'+JSON.stringify(cmp.get('v.acc'))); 
          
        var ClientType=cmp.get('v.acc');
         console.log('case id-->'+cmp.get('v.caseId'));
        console.log('case id***'+cmp.get('v.caseId'));
         var caseId=cmp.get('v.caseId');
         var action=cmp.get('c.associateToCase');
         
        if(!$A.util.isEmpty(cmp.get('v.acc').AppraiserId))
        {
            console.log('inside appraiser'); 
            var AppraiserId=cmp.get('v.acc').AppraiserId;
        }
        else
        {
             var AppraiserId='';
        }
        console.log('appraiser id'+AppraiserId);
         if(!$A.util.isEmpty(cmp.get('v.acc').LenderId))
        {
            console.log('inside lender id');  
            var LenderId=cmp.get('v.acc').LenderId;
        }
        else
        {
            var LenderId='';
        }
          if(!$A.util.isEmpty(cmp.get('v.acc').TaxId))
        {
              var TaxId=cmp.get('v.acc').TaxId;
        }
        else
        {
            TaxId='';
        }
       // console.log('AppraiserId'+AppraiserId);
        action.setParams(
            {"caseId":caseId,
             "ClientType":ClientType.Client_Type__c,
             "AppraiserId":AppraiserId,
             "LenderId":LenderId,
             "TaxId":TaxId
             
                            
                            }
                         
                        
                        );
       
        action.setCallback(this, function(response) {
            
            var state=response.getState();
            console.log('state--->'+state);
           	$A.get('e.force:refreshView').fire(); 
        });
        $A.enqueueAction(action);
       
        
        
        console.log('assign state'+state);
       
    },
   handleAssign:function(cmp,event,helper)
    {
        debugger;
        console.log('Assign checck'+JSON.stringify(cmp.get('v.acc'))); 
        console.log('slected clienttype-->'+JSON.stringify(cmp.get('v.clientTypeLst'),null,2));
          
        var ClientType=cmp.get('v.acc');
         console.log('case id-->'+cmp.get('v.caseId'));
        console.log('case id***'+cmp.get('v.caseId'));
         var caseId=cmp.get('v.caseId');
         var action=cmp.get('c.associateToCase');
         
        if(!$A.util.isEmpty(cmp.get('v.acc').AppraiserId))
        {
            console.log('inside appraiser'); 
            var AppraiserId=cmp.get('v.acc').AppraiserId;
        }
        else
        {
             var AppraiserId='';
        }
        console.log('appraiser id'+AppraiserId);
         if(!$A.util.isEmpty(cmp.get('v.acc').LenderId))
        {
            console.log('inside lender id');  
            var LenderId=cmp.get('v.acc').LenderId;
        }
        else
        {
            var LenderId='';
        }
          if(!$A.util.isEmpty(cmp.get('v.acc').TaxId))
        {
              var TaxId=cmp.get('v.acc').TaxId;
        }
        else
        {
            TaxId='';
        }
       // console.log('AppraiserId'+AppraiserId);
        action.setParams(
            {"caseId":caseId,
             "ClientType":ClientType.Name,
             "AppraiserId":AppraiserId,
             "LenderId":LenderId,
             "TaxId":TaxId
             
                            
                            }
                         
                        
                        );
       
        action.setCallback(this, function(response) {
            
            var state=response.getState();
            console.log('state--->'+state);
           	$A.get('e.force:refreshView').fire(); 
        });
        $A.enqueueAction(action);
       
        
        
        console.log('assign state'+state);
       
    }
    
            
            
})