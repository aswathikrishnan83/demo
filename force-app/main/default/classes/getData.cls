public with sharing class getData {
    @AuraEnabled
    public static List<Account> getAccount(String State){
        try {
            //this s in serevr
            //this is from client
            //this is from client2
             String queryStr='Select Name From Account where State__c =:State';
             List<Account>AccLst=Database.Query(queryStr);
             return AccLst;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    //end test

}
