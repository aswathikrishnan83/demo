trigger Account on Account (before insert,before update) {
    system.debug('Inside acc trigger');
    if(trigger.isInsert||trigger.isUpdate)
    {
     //   accountHelper.updateTasks(trigger.newMap);
    }

}