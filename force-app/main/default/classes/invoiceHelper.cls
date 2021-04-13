public class invoiceHelper {
    public static void checklineitems(Map<Id,Invoice__c>invoiceMap)
    {
        Set<Id>invoiceId=invoiceMap.keySet();
        for(Invoice__c i:[Select Id,Name From Invoice__c where Id IN(Select Invoice__c  FROM Invoice_Line_Item__c) AND Id IN:invoiceId])
        {
            i.Name.addError('Cannot delete Invoice');
        }
    }

}