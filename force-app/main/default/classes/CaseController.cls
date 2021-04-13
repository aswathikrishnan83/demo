public class CaseController {

    @AuraEnabled
    public static void updateClientType(Id caseId,Boolean val){
        Case newCase = new Case(Id=caseId);
        newCase.Show_Client_Type__c = val;
        update newCase;
        system.debug('case'+newCase);
    }
 
    
    
}