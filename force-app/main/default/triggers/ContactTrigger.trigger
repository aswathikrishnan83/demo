trigger ContactTrigger on Contact (before insert) {
   if(trigger.isBefore)
   {
       for(Contact c:trigger.new)
       {
           String evtName=c.Event_Name__c;
           List<Events_conf_mgmnt__c>eventLst=[Select Id,Name From Events_conf_mgmnt__c];
           if(c.Events_conf_mgmnts__c!='')
           {
               c.Events_conf_mgmnts__c=eventLst[0].Id;
           }
       }
   }

}