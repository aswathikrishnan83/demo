public class TaskController {
    public final static List<String>keys=new List<String>{'bad','words','here'};
    @AuraEnabled
    public static List<Account> taskInfo()
        {
          String userId=UserInfo.getUserId();
          
         // List<Task>TaskLst=[Select whoId,whatId,Subject from Task where OwnerId=:userId];
          List<Account>TaskLst=[Select Id,Name,(Select Subject,OwnerId,whatId From Tasks where OwnerId=:userId and Status!='Completed')From Account];
          return taskLst;
              
        }
     @AuraEnabled
    public static String doSave(String key)
    {
        for(String k:keys)
        {
            if(key.containsIgnoreCase(k))
            {
                throw new AuraHandledException('Bad word detected');
            }
  
        
       }
          return(key);

}
}