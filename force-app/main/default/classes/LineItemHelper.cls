public class LineItemHelper {
   public static void updateInvoice(Map<Id,Invoice_Line_Item__c>lineItemsMap)
    {
        Set<Id>InvoiceLineItemId=lineItemsMap.keySet();
        Set<Id>invoiceId=new Set<Id>();
        List<Invoice_Line_Item__c>lineItemlst=[Select Invoice__c From Invoice_Line_Item__c where Id IN:InvoiceLineItemId AND Status__c='Closed'];
        if(!lineItemlst.isEmpty())
        {
            for(Invoice_Line_Item__c i:lineItemlst)
            {
                invoiceId.add(i.Invoice__c);
            }
        }
        
        Map<Id,Invoice__c>Invoicemp=new Map<Id,Invoice__c>([Select Id,Status__c From Invoice__c where Id IN:invoiceId]);
        for(Invoice_Line_Item__c i:lineItemlst)
        {
            Invoicemp.get(i.Invoice__c).Status__c='Closed';
        }
        update Invoicemp.values();
        
    }

}