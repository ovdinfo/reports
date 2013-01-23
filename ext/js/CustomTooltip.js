function CustomTooltip(tooltipId, width){
	var tooltipId = tooltipId;
	$("body").append("<div class='tooltip' id='"+tooltipId+"'></div>");
	
	if(width){
		$("#"+tooltipId).css("width", width);
	}
	
	hideTooltip();
	
	function showTooltip(content, obj){
		$("#"+tooltipId).html(content);
		$("#"+tooltipId).show();		
		updatePosition(obj);
	}
	
	function hideTooltip(){
		$("#"+tooltipId).hide();
	}
	
	function updatePosition(obj){
	    var ttleft = ($(window).width() - $('#vis').width())/2 - 53;
	    var cx = $(obj).attr("cx");
	    var cy = $(obj).attr("cy");
	    var r = $(obj).attr("r");
	    r = Math.round(r);
	    var tttop = 165 - r;
	    cx = Math.round(cx) + ttleft;
	    cy = Math.round(cy) + tttop;
		var ttid = "#"+tooltipId;
		$(ttid).css('top', cy + 'px').css('left', cx + 'px');
	}
	
	return {
		showTooltip: showTooltip,
		hideTooltip: hideTooltip,
		updatePosition: updatePosition
	}
}
