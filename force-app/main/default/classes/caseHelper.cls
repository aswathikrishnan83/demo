public with sharing class caseHelper {
    //This method is used to update the clienttype in case object based on the recent case created by the contact
    public static void updateClientType(List<case>caseLst) {
        system.debug('caselst'+caseLst);
         Set<Id>conId=new Set<Id>();
       
        system.debug('caselst'+caselst.size());
        for(Case c:caselst)
           {
               system.debug('conId'+c.ContactId);
               conId.add(c.ContactId);
               
           }
      
        List<Contact>updatedContact=new List<Contact>();
        List<Case>clientTypeLst=[Select 	ClientType__c,AppraiserNumber_Text__c,	Tax_Number_Text__c,Lender_ID_Text__c From Case  where ContactId=:conId AND 	ClientType__c!='' Order By CreatedDate DESC LIMIT 1];
        if(clientTypeLst.size()>0)
        {
            
           for(Case c:caselst)
           {
               c.ClientType__c=clientTypeLst[0].ClientType__c;
               c.AppraiserNumber_Text__c=clientTypeLst[0].AppraiserNumber_Text__c;
               c.Tax_Number_Text__c=clientTypeLst[0].Tax_Number_Text__c;
               c.Lender_ID_Text__c=clientTypeLst[0].Lender_ID_Text__c;
           }
        }
        
    

    }
}