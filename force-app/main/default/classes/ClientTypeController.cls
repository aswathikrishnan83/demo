public class ClientTypeController {
    
    @AuraEnabled
    public static ClientTypeWrapper getClientTypeInfo(String caseId)
    {
        ClientTypeWrapper res=new ClientTypeWrapper();
        List<Client_Type__c>clientTypeLst=new List<Client_Type__c>();
        List<Case>contactList=[Select ContactId From Case where Id=:caseId];
        system.debug('contactList server'+contactList);
        if(contactList.size()>0)
        {
            clientTypeLst=[Select Appraiser_ID__c,Company__c,CHUMS_ID__c,LENDER_ID__c,TAXID__c ,Name,Client_Type__c,checkBox__c From Client_Type__c where ContactName__c=:contactList[0].ContactId order by createddate desc];
        }
        res.clientTypeLst=clientTypeLst;
        res.contactId=contactList[0].ContactId;
        system.debug('clientTypeLst'+clientTypeLst);
    
    return res;
    }
    @AuraEnabled        
    public static String[] getPickListValues(String objectType, String selectedField) {
        String[] pkListValues = new String[]{};
        Schema.SObjectType obj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = obj.getDescribe();
        Schema.DescribeFieldResult result = res.fields.getMap().get(selectedField).getDescribe();
        List<Schema.PicklistEntry> pkle = result.getPicklistValues();
        for( Schema.PicklistEntry pklVal : pkle){
            pkListValues.add(pklVal.getLabel());
        }     
        return pkListValues;
    }
    @AuraEnabled
    public static void updateClientType(Client_Type__c clientTypeLst)
    {
        //Test
    
      update clientTypeLst;
    }
     @AuraEnabled
     public static void associateToCase(Id caseId,String ClientType,String AppraiserId,String TaxId,String LenderId,String comp){
        // case caseLst=new case();
         system.debug('caseid' +caseId);
         system.debug('ClientType'+ClientType);
          system.debug('Appraiser Id'+AppraiserId);
          system.debug('Tax Id'+TaxId);
          system.debug('Lender Id'+LenderId);
         
         List<case> caseLst=[Select Id,ClientType__c,AppraiserNumber_Text__c,CHUMS_ID_Text__c,Lender_ID_Text__c,Tax_Number_Text__c,Company__c From case where Id=:caseId];
         if(caseLst.size()>0)
         { 
            system.debug('case size'+caseLst.size());
             
            caseLst[0].ClientType__c=ClientType;
            caseLst[0].Tax_Number_Text__c=TaxId;
            caseLst[0].AppraiserNumber_Text__c=AppraiserId;
            caseLst[0].Lender_ID_Text__c=LenderId;
            caseLst[0].Company__c=comp;
             
          
             
         }
        update caseLst;
     }
    
   

}