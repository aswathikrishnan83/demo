trigger Invoice on Invoice__c (before delete) {
    if(trigger.isBefore)
    {
        invoiceHelper.checklineitems(trigger.oldMap);
    }

}