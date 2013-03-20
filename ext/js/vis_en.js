requirejs.config({
    appDir: ".",
    baseUrl: "/ext",
    paths: { 
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min','libs/jquery/jquery.min'],
        'jquery-ui': ['//ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min','libs/jquery-ui/jquery-ui.min'],
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.2.2/js/bootstrap.min','libs/bootstrap/js/bootstrap.min'],
        'underscore': 'libs/underscore/underscore-min',
        'spin': 'libs/spin/spin.min',
        'moment': 'libs/moment/moment.min',
        'jQRangeSliders': 'libs/jqrangeslider/jQAllRangeSliders-min',
        'd3': 'libs/d3/d3.v2.min',
        'd3.legend': 'libs/d3/d3.legend',
        'CustomTooltip': 'js/CustomTooltip'
    },
    shim: {
        'bootstrap' : ['jquery'],
        'jQRangeSliders' : ['jquery','jquery-ui'],
        'spin' : ['jquery'],
        'd3.legend' : ['d3']
    },
});

require([
    'jquery', 'jquery-ui', 'bootstrap', 'jQRangeSliders', 'd3', 'd3.legend', 'underscore', 'spin', 'moment', 'CustomTooltip'
],
function($,jQuery,ignore){
$('#header ul.nav a[href="'+ window.location.pathname +'"]').parent().addClass('active');
loadCss('/ext/libs/jqrangeslider/css/iThing.css');
var BubbleChart, root;

// MAIN FUNCTION
BubbleChart = (function() {
  var B, J, xScale, yScale;

  function BubbleChart(data) {
    $('#iloader').remove();

    var i, max_amount, organizators;
    this.data = data;
    this.width = 1050;
    this.height = 650;
	this.orginizers = [];
	this.prevOrginizerRadius = [];
	this.prevOrginizerAngle = [];
	this.state = -1;
	this.started = false;
	this.totalSum = 0;
	this.agr = {y:0,n:0};

   var org = {},
       types = {};
   this.centerX = 620;
   this.centerY = 300;
   this.circleMargin = 3;
 
	i = 0;
    while (i < this.data.length) {
        org[i] = {"name":this.data[i].organizer_eng, "value":this.data[i].number_of_detentions};
        types[i] = {"name":this.data[i].event_type_eng, "value":this.data[i].number_of_detentions};
        if (this.data[i].agreement_eng == 'Authorised') {
          this.agr.y += parseInt(this.data[i].number_of_detentions);
        }
        else {
          this.agr.n += parseInt(this.data[i].number_of_detentions);
        }
        i++;
    }
      org = _.groupBy(org, function(num){ return num.name; });
      org = _.map(org, function(group) {
      	var sum = 0, name = '', output = {};
      	i = 0;
      	while (i < group.length) {
        	sum += parseInt(group[i].value);
        	name = group[i].name;
        	i++;
      	}
      	output.name = name;
      	output.total = sum;
		output.maxRad = d3.max(group, function(d) {
		  return parseInt(d.value);
		});
      	return output;
	  });
	  org = _.sortBy(org, function(obj){ return obj.total; });
	  org = org.reverse();
	  
	  types = _.groupBy(types, function(type){ return type.name; });
	  types = _.map(types, function(group) {
      	var sum = 0, name = '', output = {};
      	i = 0;
      	while (i < group.length) {
        	sum += parseInt(group[i].value);
        	name = group[i].name;
        	i++;
      	}
      	output.name = name;
      	output.total = sum;
      	return output;
	  });
	  types = _.sortBy(types, function(obj){ return obj.total; });
	  types = types.reverse();
		
	 max_amount = d3.max(this.data, function(d) {
      return parseInt(d.number_of_detentions);
     });
    window.max_amount = max_amount;
    
    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([1, 80]);
	
	
	var totalRadSum = 0;
	var sides = [];
	for (i=0;i<org.length;i++) {
		org[i].radius = this.radius_scale(org[i].total);
		if(i != 0){
			sides[i-1]=org[i].radius+org[i-1].radius+2*this.circleMargin;
		}
		totalRadSum+=org[i].radius*2;	
	}
	sides[org.length-1]=org[org.length-1].radius+org[0].radius+2*this.circleMargin;
	//////////// poisk idealnogo radiusa
	this.radiusSearch = function (maxRad,sidesArr,maxError){
	   if(sidesArr.length == 1){
		   return 0
	   }
	   else if(this.radiusFunc(maxRad,sidesArr)){
		   return maxRad
	   }
		else{//massiv otsortirovan k etomu momentu!
			var left = sidesArr[0];
			var right = maxRad;
			var mid;
			while(right-left > maxError){
				mid = (left+right)/2;
				if(this.radiusFunc(mid,sidesArr)){
					left = mid
				}
				else{
					right = mid
				}
			}
			return mid;
		}
   	}
	this.radiusFunc = function (rad,sidesArr){//ubyvaet
		   var sum = -Math.PI;
		   for(var j=0;j<sidesArr.length;j++){
			   sum+=Math.asin(sidesArr[j]/(2*rad))
		   }
		   if(sum > 0){
			   return sum > 0
		   }
	   }
	this.radius = this.radiusSearch(600,sides,0.5);
	////////////
	
	var curAngle = 0;
	for (i=0;i<org.length;i++) {
		org[i].angle = curAngle
		org[i].startAngle = org[i].angle+Math.PI/2
		curAngle+=2*Math.asin(sides[i]/(2*this.radius));//(2*angleMargin+(org[i].radius+org[i+1].radius)/totalRadSum*withoutMargins)*2*Math.PI;
	}
	
	this.getOrganizators = org;
    this.getOrganizatorsArray = _.map(this.getOrganizators, function(group) { return group.name; });
    
    this.getTypes = types;
    this.getTypesArray = _.map(this.getTypes, function(group) { return group.name; });
    
    i = 0;
    while (i<types.length) {
      this.totalSum += types[i].total;
      i++;
    }
    	
    this.tooltip = CustomTooltip("data-report", 240);

    this.center = {
      x: (this.width / 3)*2,
      y: this.height / 2
    };

    this.agr_centers = {
      "Authorised": {
        x: this.width / 3,
        y: this.height / 2
      },
      "Unauthorised": {
        x: 2 * this.width / 3,
        y: this.height / 2
      }
    };
    
    this.layout_gravity = -0.01;
    this.damper = 0.1;
    this.vis = null;
    this.nodes = [];
    this.force = null;
    this.circles = null;
    this.fill_color = d3.scale.ordinal().domain(["За честные выборы", "Стратегия-31", "другое", "Pussy Riot", "антиПутин", "политзеки", "закон о митингах", "социальная", "экология", "марш миллионов", "ЛГБТ", "оккупай"]).range(["#ecf8ff", "#fea61b", "#e4e4e4", "#fc78ea", "#323232", "#cc91f9", "#98a422", "#e33320", "#20cc1a", "#f8fdb3", "#76f7fb", "#6e72f7"]);

    this.create_nodes();
    this.create_vis();
  }

// GENERATE BUBLES USING DATASET
  BubbleChart.prototype.create_nodes = function() {
    var _this = this;
	
    this.data.forEach(function(d) {
      //console.log(d);
      var node;
      node = {
        id: d.Id,
        radius: _this.radius_scale(parseInt(d.number_of_detentions)),
        value: d.number_of_detentions,
        name: d.subject_eng,
        org: d.organizer_eng,
        group: d.event_type_eng,
        agr: d.agreement_eng,	
        date: d.date,
        comment: d.description_eng,
        subject: d.subject_eng,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
	  if (_this.orginizers[node.org] || _this.orginizers[node.org] == 0){
		  _this.orginizers[node.org]++;
	  	var obj = _this.getOrganizators[_this.getOrganizatorsArray.indexOf(node.org)];
		  node.angle = (_this.prevOrginizerRadius[node.org]+node.radius)/(4*obj.radius)*Math.PI+_this.prevOrginizerAngle[node.org];
	  }
	  else {
		  _this.orginizers[node.org] = 0;
		  node.angle = 0;
	  }
		_this.prevOrginizerRadius[node.org] = node.radius;
		_this.prevOrginizerAngle[node.org] = node.angle;
	  node.inOrgID = _this.getOrganizatorsArray.indexOf(node.org);
	  node.inTypeID = _this.getTypesArray.indexOf(node.group);
	
      return _this.nodes.push(node);
    });
    return this.nodes.sort(function(a, b) {
      return b.value - a.value;
    });
  };

// CREATE VISUALIZATION
  BubbleChart.prototype.create_vis = function() {
    var that,
      _this = this;
    this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis");
    this.visCircles = this.vis.append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis_circles");
    this.circles = this.visCircles.selectAll("circle").data(this.nodes, function(d) {
      return d.id;
    });
    that = this;
    this.circles.enter().append("circle").attr("r", 0).attr("fill", function(d) {
      return _this.fill_color(d.subject);
    }).attr("stroke-width", 2).attr("fill-opacity", 0.9).attr("stroke-opacity", 0.5).attr("stroke", function(d) {
      return d3.rgb(_this.fill_color(d.subject)).darker();
    }).attr("id", function(d) {
      return "bubble_" + d.id;
    }).on("mouseover", function(d, i) {
      if(_this.state == 3){
      	that.mouseOverGroup(d.inOrgID);
      }
      return that.show_details(d, i, this);
    }).on("mouseout", function(d, i) {
      if(_this.state == 3){
      	that.mouseOutGroup(d.inOrgID);
      }
      return that.hide_details(d, i, this);
    });
    
    return this.circles.transition().duration(2000).attr("r", function(d) {
      return d.radius;
    }).each("end",function() {
      _this.started = true;
      $('a.switcher').click(function() {
        var view_type = $(this).attr('id');
        $('#view_selection a').removeClass('active');
        $(this).toggleClass('active');
        toggle_view(view_type);
        return false;
      });
    });
  };

// CHARGE BUBLES
  BubbleChart.prototype.charge = function(d) {
    return -Math.pow(d.radius, 2.0) / 8;
  };

// START BUBLING
  BubbleChart.prototype.start = function() {
    return this.force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
  };

// MAIN SLIDE - CENTER BUBLES
  BubbleChart.prototype.display_group_all = function() {
    var that,
      _this = this;
    that = this;
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_center(e.alpha)).each(that.totalSort(e.alpha)).attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      }).attr("data-legend", function(d) {
        return d.subject;
      });
    });
    this.force.start();
    return this.display_label();
  };

  BubbleChart.prototype.move_towards_center = function(alpha) {
    var _this = this;
    return function(d) {
      d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
      return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
    };
  };
  
  BubbleChart.prototype.display_init = function() {
    var legend, 
        types = this.getTypes,
        i = 0,
        percents = '';
    legend = d3.select("svg").append("g").attr("class", "legend").attr("transform", "translate(73,230)").style("font-size", "12px").call(d3.legend);
      d3.select("svg").append("circle")
        .attr('r', this.radius_scale(500))
        .attr('class',"data-scaleKeyCircle scaleKey-1")
        .attr('cx', 120)
        .attr('cy', 560)
        .style("opacity", 0);
      d3.select("svg").append("circle")
        .attr('r', this.radius_scale(200))
        .attr('class',"data-scaleKeyCircle scaleKey-2")
        .attr('cx', 120)
        .attr('cy', 585)
        .style("opacity", 0);
      d3.select("svg").append("circle")
        .attr('r', this.radius_scale(10))
        .attr('class',"data-scaleKeyCircle scaleKey-3")
        .attr('cx', 120)
        .attr('cy', 620)
        .style("opacity", 0);
    setTimeout((function() {
      return legend.call(d3.legend);
    }), 100);
    $('#data-sizeKey').fadeIn('slow');
    for (i=0;i<types.length;i++){
        percents = (types[i].total*100/this.totalSum).toFixed(1) + '%';
        if (i<3) {
		  $('.data-type-label-' + i + ' h3').append(types[i].name);
		}
		else if (i<7) {
		  $('.data-type-label-' + i + ' h4').append(types[i].name);
		}
		else {
		  $('.data-type-label-' + i + ' h5').append(types[i].name);
		}
		$('.data-type-label-' + i + ' span.percents').append(percents);
		$('.data-type-label-' + i + ' span.total').append(types[i].total + ' arrestees');
	}
	$('.agr p').append('1079 people (' + (this.agr.y*100/this.totalSum).toFixed(1) + '%) were detained at 20 events were authorised by local government');
	$('.non-agr p').append('During 208 events that were either not authorised, or required no clearance, 4090 people (' + (this.agr.n*100/this.totalSum).toFixed(1) + '%) were detained');
    return this.vis.selectAll(".data-scaleKeyCircle")
      .style("opacity", 0)
      .transition().duration(600).style("opacity", 1);
  };
  
  BubbleChart.prototype.display_label = function() {
    $('#data-overview').fadeIn('slow');
    return this.vis.selectAll(".legend")
    .style("opacity", 0)
    .transition().duration(600).style("opacity", 1);
  };

  BubbleChart.prototype.hide_label = function() {
    var legend;
    $('#data-overview').fadeOut('slow');
    return legend = this.vis.selectAll(".legend")
	.transition().duration(600).style("opacity", 0);
  };
  
/////////////////////////////////

// DISPLAY TWO GROUPS OF EVENTS
  BubbleChart.prototype.display_by_agr = function() {
    var _this = this;
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_agr(e.alpha)).attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
    this.force.start();
    return this.display_agrs();
  };

  BubbleChart.prototype.move_towards_agr = function(alpha) {
    var _this = this;
    return function(d) {
      var target;
      target = _this.agr_centers[d.agr];
      d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
      return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
    };
  };  

  BubbleChart.prototype.display_agrs = function() {
    $('#data-agr-labels').show('slow');
  };

  BubbleChart.prototype.hide_agrs = function() {
    $('#data-agr-labels').hide('slow');
  };

/////////////////////////////////
  
// DATE DISPLAY

  BubbleChart.prototype.display_by_date = function() {
    var _this = this;
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_date(e.alpha)).attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
    this.force.start();
    $("#det-slider").bind("valuesChanged", function(e, data){ 
      _this.update();
      $( "#count" ).empty().append( "from " + Math.round(data.values.min) +  " to " + Math.round(data.values.max) + " arrests" );
    });
    $("#date-slider").bind("valuesChanged", function(e, data){ 
    _this.update(); 
    $( "#dates" ).empty().append( "arrests from " + moment(data.values.min).format("DD.MM.YYYY") + " to " + moment(data.values.max).format("DD.MM.YYYY"));
    });
    return this.display_axis();
  };

  BubbleChart.prototype.move_towards_date = function(alpha) {
    var _this = this;
    return function(d) {
      var date, x, y;
      date = d3.time.format("%d.%m.%Y");
      d.date2 = date.parse(d.date);
      x = xScale(d.date2);
      y = yScale(d.value);
      if(alpha > 0.01){
      	d.x = d.x + (x - d.x) * Math.pow((1-alpha)*100/99,50);
      	return d.y = d.y + (y - d.y) * Math.pow((1-alpha)*100/99,50);
      }
      else{
	      d.x = x;
	      return d.y = y;
      }
    };
  };
  
  BubbleChart.prototype.update = function() {
	var _this = this;
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_date(e.alpha)).transition().duration(100).ease("easing").attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
	var date = d3.time.format("%d.%m.%Y");
	xScale.domain([
		d3.min(this.nodes, function (d) { return $("#date-slider").dateRangeSlider("values").min; }),
		d3.max(this.nodes, function (d) { return $("#date-slider").dateRangeSlider("values").max; })
	]);
	yScale.domain([
		d3.min(this.nodes, function (d) { return $("#det-slider").rangeSlider("values").min; }),
		d3.max(this.nodes, function (d) { return $("#det-slider").rangeSlider("values").max; })
	]);
	var t = this.vis.transition().duration(1500).ease("exp-in-out");
    t.select(".x.axis").call(xAxis);
    t.select(".y.axis").call(yAxis);
    this.force.start();
  };
  
  var margin, xAxis, yAxis;
    margin = {
      top: 19.5,
      right: 19.5,
      bottom: 19.5,
      left: 39.5
    };
    this.width = 990;
    this.height = 650;
    xScale = d3.time.scale().range([10, this.width]);
    yScale = d3.scale.linear().range([this.height, 0]);
    xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d"));
    yAxis = d3.svg.axis().scale(yScale).orient("left");
    
  BubbleChart.prototype.display_axis = function() {
    this.vis.selectAll(".scaleKey-1").transition()
      .attr("cx",920)
      .attr("cy",80)
      .duration(500)
      .delay(100);
    this.vis.selectAll(".scaleKey-2").transition()
      .attr("cx",920)
      .attr("cy",105)
      .duration(500)
      .delay(100);
    this.vis.selectAll(".scaleKey-3").transition()
      .attr("cx",920)
      .attr("cy",140)
      .duration(500)
      .delay(100);
    $('#data-sizeKey').animate({
      left: '835',
      top: '150'
    }, 600);
    B = new Date(2011, 9, 4);
    J = new Date(2012, 12, 4);
    xScale.domain([$("#date-slider").dateRangeSlider("values").min, $("#date-slider").dateRangeSlider("values").max]);
    yScale.domain([$("#det-slider").rangeSlider("values").min, $("#det-slider").rangeSlider("values").max]);
    this.vis.attr("width", this.width + margin.left + margin.right).attr("height", this.height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.vis.append("g").attr("class", "x axis").attr("transform", "translate(40," + this.height + ")").call(xAxis);
    this.vis.append("g").attr("class", "y axis").attr("transform", "translate(50,0)").call(yAxis);
    this.vis.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", this.width + 50).attr("y", this.height + 30).text("date of monitoring");
    this.vis.append("text").attr("class", "y label").attr("text-anchor", "end").attr("y", 6).attr("dy", ".75em").attr("transform", "rotate(-90)").text("number of arrests");
    this.vis.insert('rect','.axis').attr("class","clip").attr('height','690').attr('width','50').attr('x','0').attr('y','0').style('fill','#fff');
    return d3.selectAll('circle');
  };

  BubbleChart.prototype.hide_axis = function() {
    this.vis.selectAll(".scaleKey-1").transition()
      .attr("cx",120)
      .attr("cy",560)
      .duration(500)
      .delay(100);
    this.vis.selectAll(".scaleKey-2").transition()
      .attr("cx",120)
      .attr("cy",585)
      .duration(500)
      .delay(100);
    this.vis.selectAll(".scaleKey-3").transition()
      .attr("cx",120)
      .attr("cy",620)
      .duration(500)
      .delay(100);
    $('#data-sizeKey').animate({
      left: '35',
      top: '630'
    }, 600);
    this.vis.selectAll(".axis,.label,.clip").remove();
    $("#det-slider,#date-slider,#dates,#count").remove();
    return d3.selectAll('circle');
  };
  
/////////////////////////////////

// DISPLAY BY ORGANIZATORS

  BubbleChart.prototype.display_by_group = function() {
    var _this = this;
	this.hide_orgs();
	var orgs = _this.getOrganizators;
	this.display_groups(orgs);
	for(i=0;i<orgs.length;i++){
		this.vis.insert("rect",":first-child").attr("class", "cell row_" + i).attr("y",148+15*i).attr("x", 50).attr("width",50 + orgs[i].name.length*6.5).attr("height","15").style('cursor','pointer').style('fill','#F04E23').style('opacity','0').data([i]).on('mouseover', this.mouseOverGroup).on('mouseout', this.mouseOutGroup);
		this.vis.append("text").attr("class", "orgLabel label_" + i).attr("y",160+15*i).attr("x", 100).style('cursor','pointer').text(orgs[i].name).data([i]).on('mouseover', this.mouseOverGroup).on('mouseout', this.mouseOutGroup);
		this.vis.append("text").attr("class", "orgTotal total_" + i).attr("y",160+15*i).attr("x", 60).style('cursor','pointer').text(orgs[i].total).data([i]).on('mouseover', this.mouseOverGroup).on('mouseout', this.mouseOutGroup);
	}
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_group(e.alpha)).attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
    this.force.start();
  };

  BubbleChart.prototype.move_towards_group = function(alpha) {
    var _this = this;
    //console.log(this.circles);
    var orgs = _this.getOrganizators;
    var orgsArr = _this.getOrganizatorsArray;
    return function(d) {
		//console.log(d);
	  //alert(d.radius);
	   var position, targetX, targetY, delta;
	 // delta = Math.PI/8;
      position = orgsArr.indexOf(d.org);
	  var obj = orgs[position];
	  targetX = _this.centerX+Math.cos(obj.angle)*_this.radius;
	  targetY = _this.centerY+Math.sin(obj.angle)*_this.radius;
	  if (alpha > 0.01) {
		d.y = d.y +(targetY-d.y+Math.sin(d.angle+obj.startAngle)*(obj.radius-d.radius))*Math.pow((1-alpha)*100/99,50);
		return d.x = d.x + (targetX-d.x+Math.cos(d.angle+obj.startAngle)*(obj.radius-d.radius))*Math.pow((1-alpha)*100/99,50);
	  }
	  else {
	  	d.y = targetY+(obj.radius-d.radius)*Math.sin(d.angle+obj.startAngle);
		return d.x = targetX+(obj.radius-d.radius)*Math.cos(d.angle+obj.startAngle);
	  }
    };
  };
  
  BubbleChart.prototype.display_groups = function(groups) {
    var that = this;
    var i = 0;
    $('#data-group-overview').fadeIn('slow');
    while (i < groups.length) {
      //console.log(groups[i]);
      d3.select("svg").insert("circle",":first-child")
        .attr('id', 'group_' + i)
        .attr('class', 'group_circles')
        .attr('r', groups[i].radius + this.circleMargin)
        .attr('class','group-circle')
        .attr('cx', this.centerX+Math.cos(groups[i].angle)*this.radius)
        .attr('cy', this.centerY+Math.sin(groups[i].angle)*this.radius)
        .style("opacity", 0)
        .data([i])
        .on('mouseover', this.mouseOverGroup)
        .on('mouseout', this.mouseOutGroup);
      i++;
    };
  };
  
  BubbleChart.prototype.hide_orgs = function() {
    var that = this;
    $('#data-group-overview').fadeOut('slow');
    return this.vis.selectAll(".orgTotal,.orgLabel,.group-circle,.cell").remove();
  };
  
  BubbleChart.prototype.mouseOverGroup = function(d) {
    d3.select('#group_' + d).transition()
	  .style('opacity', '0.3')
	  .duration(300);
	d3.select('.row_' + d).transition()
	  .style('opacity', '0.7')
	  .duration(300);
	d3.selectAll('.total_' + d + ',.label_' + d).transition()
	  .style('fill', '#fff')
	  .duration(300);
  };
  
  BubbleChart.prototype.mouseOutGroup = function(d) {
    d3.select('#group_' + d).transition()
	  .style('opacity', '0')
	  .duration(300);
	d3.select('.row_' + d).transition()
	  .style('opacity', '0')
	  .duration(300);
	d3.selectAll('.total_' + d + ',.label_' + d).transition()
	  .style('fill', '#333')
	  .duration(300);
  };
  
/////////////////////////////////

// DISPLAY BY TYPES

  BubbleChart.prototype.display_by_type = function() {
    var _this = this;
    this.display_type_labels();
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_type(e.alpha)).attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
    this.force.start(); 
  };
  
  BubbleChart.prototype.move_towards_type = function(alpha) {
    var _this = this;
    return function(d) {
      var x, y;
      switch (parseInt(d.inTypeID)) {
        case 0: x=300; y=200; break;
        case 1: x=550; y=220; break;
        case 2: x=800; y=200; break;
        case 3: x=200; y=330; break;
        case 4: x=400; y=330; break;
        case 5: x=600; y=345; break;
        case 6: x=800; y=360; break;
        case 7: x=400; y=470; break;
        case 8: x=510; y=480; break;
        case 9: x=620; y=490; break;
        case 10: x=730; y=500; break;
        case 11: x=840; y=510; break;
        default: x=500;y=500;
      }
      d.x = d.x + (x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
      return d.y = d.y + (y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
    };
  };  
  
  BubbleChart.prototype.display_type_labels = function() {
    $('#data-type-labels').fadeIn('slow');
  };
  
  BubbleChart.prototype.display_hide_labels = function() {
    $('#data-type-labels').fadeOut('slow');
  };

/////////////////////////////////

// STATES SWITCHER

  BubbleChart.prototype.changeState = function(newState) {
  //states:
  //-1 - start
  //0 - 
   var oldState = this.state;
   this.state = newState;
   switch(oldState){
   	case 0: this.hide_label(); break;
   	case 1: this.hide_agrs(); break;
   	case 2: this.hide_axis(); break;
   	case 3: this.hide_orgs(); break;
   	case 4: this.display_hide_labels(); break;
   	default: ;
   };
  };

  
/////////////////////////////////

// TOOLTIP

  BubbleChart.prototype.show_details = function(data, i, element) {
    var content;
    d3.select(element).attr("stroke", "black");
    content = "<div id=\"tooltipContainer\">";
    content += "<div class=\"data-type\">" + data.comment + "</div>";
    content += "<div class=\"data-rule\"></div>";
    content += "<div class=\"data-date\">" + data.date + "</div>";
    content += "<div class=\"data-desc\">Number of detentions</div>";
    content += "<div class=\"data-valuesContainer\"><span class=\"data-value\">" + data.value + "</span></div>";
    content += "<div class=\"data-tail\"></div>";
    content += "</div>";
    return this.tooltip.showTooltip(content, element);
  };

  BubbleChart.prototype.hide_details = function(data, i, element) {
    var _this = this;
    d3.select(element).attr("stroke", function(d) {
      return d3.rgb(_this.fill_color(d.group)).darker();
    });
    return this.tooltip.hideTooltip();
  };
  
/////////////////////////////////

  BubbleChart.prototype.totalSort = function(alpha) {
    var that;
    that = this;
    return function(d) {
      var targetX, targetY;
      targetY = that.centerY;
      return targetX = that.width / 2;
    };
  };

  return BubbleChart;

})();

root = typeof exports !== "undefined" && exports !== null ? exports : this;

$(function() {
  var chart, render_vis,
    _this = this;
  chart = null;
  render_vis = function(csv) {
    chart = new BubbleChart(csv);
    chart.start();
    root.display_all();
    return chart.display_init();
  };
  root.display_all = function() {
    if(chart.state != 0){
	    chart.changeState(0);
	    return chart.display_group_all();
    }
  };
  root.display_agr = function() {
    if(chart.started && chart.state != 1){
    	chart.changeState(1);
    	return chart.display_by_agr();
    }
  };
  root.display_chron = function() {
    if(chart.started && chart.state != 2){
	    $('#main').append('<p id="count"></p><div id="det-slider"></div><p id="dates"><div id="date-slider"></div>');
	    $("#det-slider").rangeSlider({
	      defaultValues:{
	    	min: 0,
	    	max: 700
	  	  },
	      bounds:{
	    	min: 0,
	    	max: 700
	    }
	    });
	    $("#count").empty().append( "from " + $("#det-slider").rangeSlider("values").min + " to " + $("#det-slider").rangeSlider("values").max + " arrests" );
	    $("#date-slider").dateRangeSlider({
	      defaultValues:{
	    	min: new Date(2011, 9, 4),
	    	max: new Date(2012, 11, 21)
	  	  },
	      bounds:{
	    	min: new Date(2011, 9, 4),
	    	max: new Date(2012, 11, 21)
	    }
	    });
	    chart.changeState(2);
	    return chart.display_by_date();
    }
  };
  root.display_orgs = function() {
    if(chart.started && chart.state != 3){
	    chart.changeState(3);
	    return chart.display_by_group();
    }
  };
  root.display_types = function() {
    if(chart.started && chart.state != 4){
	    chart.changeState(4);
	    return chart.display_by_type();
    }
  };
  root.toggle_view = function(view_type) {
    if (view_type === 'cons') {
      return root.display_agr();
    } else if (view_type === 'all') {
      return root.display_all();
    } else if (view_type === 'chron') {
      return root.display_chron();
    } else if (view_type === 'org') {
      return root.display_orgs();
    } else if (view_type === 'format') {
      return root.display_types();
    } else if (view_type === 'share') {
      return root.share();
    }

  };
  
  var main_height = $('#main').height();
  var main_width = $(window).width();
  
  $('#iloader').css('height', main_height).css('width', main_width);
  
  var opts = {
    lines: 13, // The number of lines to draw
    length: 13, // The length of each line
    width: 8, // The line thickness
    radius: 29, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 58, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
  };
  var target = document.getElementById('iloader');
  var spinner = new Spinner(opts).spin(target);
  return d3.csv("https://docs.google.com/spreadsheet/pub?key=0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc&single=true&gid=0&output=csv", render_vis);
});

});

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

vis.share = function () {
    var share = {};

    tj = {};
    var l = window.location;
    tj.webpage = l.href;
    tj.embed = l.href + 'source/?embed';
    if (l.href == "http://reports.ovdinfo.org/2012/geo/en/source/?embed") { 
    	tj.embed = "http://reports.ovdinfo.org/2012/geo/en/source/?embed"; 
    }
    else if (l.href == "http://reports.ovdinfo.org/2012/geo/source/?embed") {
		tj.embed = "http://reports.ovdinfo.org/2012/geo/source/?embed"; 
    }
    var link = document.createElement('a');
    var close = document.createElement('a');
    var embed = document.createElement('textarea');
    var share = document.createElement('div');
    var popup = document.createElement('div');

    link.innerHTML = 'Share +';
    link.href = '#';
    link.className = 'share';
    link.onclick = link.ontouchstart = function() {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
        $('body').toggleClass('sharing');
        return false;
    };

    close.innerHTML = 'Close';
    close.href = '#';
    close.className = 'close';
    close.onclick = close.ontouchstart = function() {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
        $('body').toggleClass('sharing');
        return false;
    };

    embed.className = 'embed';
    embed.rows = 4;
    embed.setAttribute('readonly', 'readonly');
    embed.value = '<iframe width="600" height="400" frameBorder="0" src="{{embed}}"></iframe>'
        .replace('{{embed}}', tj.embed);
    embed.onclick = function() {
        embed.focus();
        embed.select();
        return false;
    };

    var twitter = 'http://twitter.com/intent/tweet?status='
        + encodeURIComponent(document.title + ' (' + tj.webpage + ')');
    var facebook = 'https://www.facebook.com/sharer.php?u='
        + encodeURIComponent(tj.webpage)
        + '&t=' + encodeURIComponent(document.title);
    share.innerHTML = ('<h3>Share this map</h3>'
        + '<p><a class="facebook" target="_blank" href="{{facebook}}">Facebook</a>'
        + '<a class="twitter" target="_blank" href="{{twitter}}">Twitter</a></p>')
        .replace('{{twitter}}', twitter)
        .replace('{{facebook}}', facebook);
    share.innerHTML += '<strong>Get the embed code</strong><br />'
    share.innerHTML += '<small>Copy and paste this HTML into your website or blog.</small>';
    share.appendChild(embed);
    share.appendChild(close);

    popup.className = 'map-share';
    popup.style.display = 'none';
    popup.appendChild(share);

    share.add = function() {
        this.appendTo($('body')[0]);
        return this;
    };

    share.remove = function() {
        $(link).remove();
        $(popup).remove();
        return this;
    };
    
    share.appendTo = function(elem) {
        elem.appendChild(link);
        elem.appendChild(popup);
        return this;
    };

    return share;
};
