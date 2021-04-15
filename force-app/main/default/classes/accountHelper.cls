public with sharing class accountHelper {
    public static void updateTasks(Map<Id,Account>AccMap)
        {
            //query metadata type
            //update task
            /*This is some change for committing to git.
            @author:Aswathi Rajeesh
            Date:1/11/2021
            Comments:Created for updating task for an account*/
            //testing from server again
            //test
            //testing from client
            List<Account>accLst=AccMap.values();
            Create_Task_for_account__mdt[] acctasks=[Select 	Task_Name__c From Create_Task_for_account__mdt];
            system.debug('metadat size'+acctasks.size());
            for(Account a:accLst)
            {
                   system.debug('inside acc loop');
                    for(Create_Task_for_account__mdt tsk:acctasks)
                    {
                        system.debug('inside task loop');
                        Task t=new Task();
                        t.OwnerId=a.CreatedById;
                        t.WhatId=a.Id;
                        system.debug('task name-->'+tsk.Task_Name__c);
                        t.Subject=tsk.Task_Name__c;
                        Insert t;
                    }
                    
            }
        }

    
}