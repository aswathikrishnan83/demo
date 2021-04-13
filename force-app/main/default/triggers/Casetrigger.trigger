trigger Casetrigger on Case (Before insert) {
    system.debug('Called case trigger');
 /*   if(trigger.isInsert)
    {
       caseHelper.updateClientType(trigger.new);
    }*/
    
    for(Case c:trigger.new)
    {
        List<Contact>conLst=[Select Email from Contact where Email =:c.Customer_Email__c];
        if(!conLst.isEmpty())
        {
            
        }
    }

}