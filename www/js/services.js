app.factory("DateService",function($log){
	return {
		getFormattedTime:  function(){
			var  months= ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			var d = new Date();
			var hours = d.getHours();
			var day = d.getDate();
			var month =months[d.getMonth()];
			var minutes = d.getMinutes();
			var sec = d.getSeconds();
			var year= d.getFullYear();
			if(minutes<10)
				minutes = '0'+minutes;
			if(sec<10)
				sec = '0'+sec;
    		hours = (hours+24)%24; 
    		var mid='AM';
    		if(hours==0){ 
    			hours=12;
    		}
    		else if(hours>12)
    		{
    			hours=hours%12;
    			mid='PM';
    		}
    		else if(hours==12)
    			 mid='PM';
    		
			return month+' '+day+','+year+' '+hours+':'+minutes+':'+sec+' '+mid;
		}
	}
});