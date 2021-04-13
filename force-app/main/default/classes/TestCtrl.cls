public class TestCtrl {

    @AuraEnabled
     public static List<ContentDocumentLink> getContents() {
         
         List<Id>accountId=new List<Id>();
         List<User> userList = [select contactid from user where id =:UserInfo.getUserId()];
         if(!userList.isEmpty())
         {
             system.debug('user lis'+userList);
         }
         List<Contact>conLst=[Select AccountId From Contact where  Id =:userList[0].contactid];
         if(!conLst.isEmpty())
         {
             accountId.add(conLst[0].AccountId);
         }
         
         //Querying the content document link object with the account id
         
         List<Id> contentIds = new List<Id>();
         
         for (ContentDocument cont :[Select Id ,Title from ContentDocument]) {
             contentIds.add(cont.Id);
         }
         
         
         // return[SELECT Id, FileType, SystemModstamp,Title, ContentUrl,ContentDocumentId,ContentDocument.LatestPublishedVersionId, PathOnClient, VersionData from contentVersion WHERE OwnerId =: UserInfo.getUserId() and NetworkId=: communityId order By CreatedDate DESC];
         
         // return [SELECT Id,Title FROM ContentVersion WHERE ContentDocumentId IN :contentIds];
         return[SELECT Id, ContentDocumentId, LinkedEntityId FROM ContentDocumentLink where LinkedEntityId =:accountId];
    }
      @AuraEnabled
      public static Map<String,Object> getUserInfo() 
      {
          Map<String,Object>usrMap=new Map<String,Object>();
          try
          {
             usrMap.put('userType',UserInfo.getUserType());
                if (UserInfo.getUserType() != 'Guest') {
                User usr = [Select ContactId, Profile.Name from User where Id =: UserInfo.getUserId()];
                usrMap.put('usr', usr);

                Contact con = [Select Id, FirstName, LastName, Name, AccountId, Email, Phone from Contact where Id =: usr.ContactId];
                usrMap.put('con', con);

                Account acc = [Select Name from Account where Id =: con.AccountId];
                usrMap.put('acc', acc);
                }
          }
          catch(Exception e)
          {
              system.debug('excep'+e);
          }
          return usrMap;
          
      }
}