trigger Invoicelineitems on Invoice_Line_Item__c (after insert,after update) {
    if(trigger.isAfter)
    {
        LineItemHelper.updateInvoice(trigger.newMap);
    }

}