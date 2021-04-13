({
	init : function(cmp,event) {
        var action=cmp.get('c.taskInfo');
        action.setCallback(this,function(response)
                           {
                               var result=response.getState();
                               if(result==="SUCCESS")
                               {
                                   var results=response.getReturnValue();
                                   cmp.set("v.data",response);
                                   console.log('data'+JSON.stringify(results));
                                   var formatedresp=[];
                                   for(var i=0;i<results.length;i++)
                                   {
                                    
                                        if(!$A.util.isEmpty(results[i].Tasks))
                                           {
                                               console.log('inside if');
                                               var formatResp={};
                                               formatResp.AccountName=results[i].Name;
                                               formatResp.Id=results[i].Id;
                                               for(var j=0;j<results[i].Tasks.length;j++)
                                               {
                                                 console.log('inside for loop');
                                              // console.log('formatResp'+JSON.stringify(results[i].Tasks[j].Subject));
                                                 formatResp.Id=results[i].Tasks[j].Id;
                                                formatResp.TaskName=results[i].Tasks[j].Subject;
                                               formatedresp.push(formatResp);
                                               
                                               
                                               }
                                              
                                           }
                                       
                                       
                                       
                                   }
                                   
                                    cmp.set("v.data",formatedresp);
                                   console.log('data'+JSON.stringify(cmp.get("v.data")));
                               }
                               
                           }
                           
                          );
        $A.enqueueAction(action);
		
	}
})