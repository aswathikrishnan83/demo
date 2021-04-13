public with sharing class getData {
    //testing again
    @AuraEnabled
    public static List<Account> getAccount(String State){
        try {

             String queryStr='Select Name From Account where State__c =:State';
             List<Account>AccLst=Database.Query(queryStr);
             return AccLst;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //end test

}
