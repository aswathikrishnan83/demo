({
	showText : function(cmp,event) {
        var text=cmp.get('v.titleText');
        if(text.length>30)
        {
            console.log('greater than 30');
            cmp.set('v.showFlag',true);
        }
        else
        {
            cmp.set('v.showFlag',false);
        }
		
	}
})