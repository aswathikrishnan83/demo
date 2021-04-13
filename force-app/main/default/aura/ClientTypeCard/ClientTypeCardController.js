({
	handleEdit : function(component, event, helper) {
        console.log('inside edit--');
        
        //$A.get('e.force:refreshView').fire();
        var clientType=component.get('v.acc');
        console.log('client type edit'+JSON.stringify(clientType));
        component.set('v.currRcdId',clientType.Id);
        component.set('v.editView',true);
        component.set('v.normalView',false);
        component.set('v.hideEdit',false);
        component.set('v.viewLoading',true);
        
		
	},
    handleCheckBoxChange: function(cmp,event,helper){
      console.log('inside check box checked===>');  
        //var dataRcd = event.currentTarget.dataset.rcd;
        console.log('dataRcd===>'+JSON.stringify(cmp.get('v.acc')));
        //
              debugger;
        console.log('Assign checck'+JSON.stringify(cmp.get('v.acc'))); 
          
        var ClientType=cmp.get('v.acc');
       console.log('selected client type'+JSON.stringify(ClientType));
         console.log('case id-->'+cmp.get('v.caseId'));
        console.log('case id***'+cmp.get('v.caseId'));
         var caseId=cmp.get('v.caseId');
         var action=cmp.get('c.associateToCase');
        var comp=cmp.get('v.acc').Company;
        console.log('comp'+comp);
         
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
       console.log('client type new--'+ClientType.Client_Type__c);
        action.setParams(
            {
              "caseId":caseId,
             "ClientType":ClientType.Client_Type__c,
             "AppraiserId":AppraiserId,
             "LenderId":LenderId,
             "TaxId":TaxId,
             "comp":comp
             
                            
                            }
                         
                        
                        );
       
        action.setCallback(this, function(response) {
            
            var state=response.getState();
            console.log('state--->'+state);
           	$A.get('e.force:refreshView').fire(); 
        });
        $A.enqueueAction(action);
       
        
        
       
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
       $A.get('e.force:refreshView').fire();
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
        helper.getUpdatedCardInfo(component,event);
        $A.get('e.force:refreshView').fire();
	},
    onCheck: function(cmp,event,helper)
    {
        console.log('clicked checck'+JSON.stringify(cmp.get('v.acc')));
        
    }

   
    
})