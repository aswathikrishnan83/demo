trigger ContentDocumentLnk on ContentDocumentLink (Before insert) {
  for(ContentDocumentLink con:Trigger.new)
    {
        con.Visibility='AllUsers';
        con.ShareType='I';
    }

}