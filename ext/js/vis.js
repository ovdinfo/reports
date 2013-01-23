var BubbleChart, root,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

// MAIN FUNCTION
BubbleChart = (function() {
  var B, J, xScale, yScale;

  function BubbleChart(data) {
    this.hide_details = __bind(this.hide_details, this);
    this.show_details = __bind(this.show_details, this);
    this.hide_years = __bind(this.hide_years, this);
    this.display_years = __bind(this.display_years, this);
    this.hide_axis = __bind(this.hide_axis, this);
    this.display_axis = __bind(this.display_axis, this);
    this.hide_label = __bind(this.hide_label, this);
    this.display_label = __bind(this.display_label, this);
    this.move_towards_type = __bind(this.move_towards_type, this);
    this.display_by_type = __bind(this.display_by_type, this);
    this.move_towards_date = __bind(this.move_towards_date, this);
    this.display_by_date = __bind(this.display_by_date, this);
    this.move_towards_year = __bind(this.move_towards_year, this);
    this.display_by_year = __bind(this.display_by_year, this);
    this.move_towards_center = __bind(this.move_towards_center, this);
    this.display_group_all = __bind(this.display_group_all, this);
	this.update = __bind(this.update, this);    
    //d3.select("footer").on("click", this.display_by_date, false);
    this.start = __bind(this.start, this);
    this.create_vis = __bind(this.create_vis, this);
    this.create_nodes = __bind(this.create_nodes, this);

    var i, max_amount, organizators;
    this.data = data;
    this.width = 940;
    this.height = 600;
	this.orginizers = [];
	this.prevOrginizerRadius = [];
	this.prevOrginizerAngle = [];

   /*var org = {};
	  i = 0;
      while (i < this.data.length) {
        org[i]={"name":this.data[i].organizer, "value":this.data[i].number_of_detentions};
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
		//alert(output.maxRad);
      	return output;
		});
	  org = _.sortBy(org, function(obj){ return obj.total; });
	  org = org.reverse();
		*/
	 max_amount = d3.max(this.data, function(d) {
      return parseInt(d.number_of_detentions);
    });
    window.max_amount = max_amount;
    
    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([1, 80]);
	
	/*
	var totalRadSum = 0;
		for(i=0;i<org.length;i++){
			org[i].radius = this.radius_scale(org[i].total);
			totalRadSum+=org[i].radius*2;
			//org[i].startAngle = totalRadSum/2
			//console.log(totalRadSum*180/Math.PI)	
			
		}
		var curAngle = 0;
		var angleMargin = 1/360;
		var withoutMargins = 1-2*org.length*angleMargin;
		for(i=0;i<org.length-1;i++){
			//org[i].rel = org[i].total/totalSum;
			org[i].angle = curAngle
			org[i].startAngle = org[i].angle+Math.PI/2
			//alert(org[i].angle)
			console.log(260*Math.sin(org[i].angle))
			curAngle+=(2*angleMargin+(org[i].radius+org[i+1].radius)/totalRadSum*withoutMargins)*2*Math.PI;
		}
		org[i].angle = curAngle;
		org[i].startAngle = org[i].angle+Math.PI/2
		//alert(curAngle);
	
	
	this.getOrganizators = org;
	
    this.getOrganizatorsArray = _.map(this.getOrganizators, function(group) { return group.name; });*/
	
    
    this.tooltip = CustomTooltip("data-report", 240);

    this.center = {
      x: this.width / 2,
      y: this.height / 2
    };

    this.year_centers = {
      "согласовано": {
        x: this.width / 3,
        y: this.height / 2
      },
      "не согласовано": {
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
      var node;
      node = {
        id: d.id,
        radius: _this.radius_scale(parseInt(d.number_of_detentions)),
        value: d.number_of_detentions,
        name: d.subject,
        org: d.organizer,
        group: d.event_type,
        year: d.agreement,	
        date: d.date,
        comment: d.description,
        subject: d.subject,
        x: Math.random() * 900,
        y: Math.random() * 800
      };
	  /*if (_this.orginizers[node.org] || _this.orginizers[node.org] == 0){
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
	 node.inOrgID = _this.orginizers[node.org];*/
	
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
    this.vis = d3.select("#vis").append("svg").attr("width", this.width + 200).attr("height", this.height).attr("id", "svg_vis");
    
    this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
      return d.id;
    });
    that = this;
    this.circles.enter().append("circle").attr("r", 0).attr("fill", function(d) {
      return _this.fill_color(d.subject);
    }).attr("stroke-width", 2).attr("fill-opacity", 0.9).attr("stroke-opacity", 0.5).attr("id", function(d) {
      return "bubble_" + d.id;
    });
    return this.circles.attr("r", function(d) {
      return d.radius;
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
    this.display_label();
    this.hide_years();
    this.hide_orgs();
    return this.hide_axis();
  };

  BubbleChart.prototype.move_towards_center = function(alpha) {
    var _this = this;
    return function(d) {
      d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
      return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
    };
  };
  
  BubbleChart.prototype.display_label = function() {
    var legend;
    legend = d3.select("svg").append("g").attr("class", "legend").attr("transform", "translate(50,30)").style("font-size", "12px").call(d3.legend);
    return setTimeout((function() {
      return legend.call(d3.legend);
    }), 100);
  };

  BubbleChart.prototype.hide_label = function() {
    var legend;
    return legend = this.vis.selectAll(".legend").remove();
  };
  BubbleChart.prototype.hide_orgs = function() {
 	 this.vis.selectAll(".orgTotal").remove();
    return this.vis.selectAll(".orgLabel").remove();
  };
  
/////////////////////////////////

// DISPLAY TWO GROUPS OF EVENTS
  BubbleChart.prototype.display_by_year = function() {
    var _this = this;
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_year(e.alpha)).attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
    this.force.start();
    this.hide_label();
    this.hide_axis();
    this.hide_orgs();
    return this.display_years();
  };

  BubbleChart.prototype.move_towards_year = function(alpha) {
    var _this = this;
    return function(d) {
      var target;
      target = _this.year_centers[d.year];
      d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
      return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
    };
  };  

  BubbleChart.prototype.display_years = function() {
    var years, years_data, years_x,
      _this = this;
    years_x = {
      "согласовано": 160,
      "не согласовано": this.width - 160
    };
    years_data = d3.keys(years_x);
    years = this.vis.selectAll(".years").data(years_data);
    return years.enter().append("text").attr("class", "years").attr("x", function(d) {
      return years_x[d];
    }).attr("y", 40).attr("text-anchor", "middle").text(function(d) {
      return d;
    });
  };

  BubbleChart.prototype.hide_years = function() {
    var years;
    return years = this.vis.selectAll(".years").remove();
  };

/////////////////////////////////
  
// DATE DISPLAY

  BubbleChart.prototype.display_by_date = function() {
    var _this = this;
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_date(e.alpha)).transition().duration(100).ease("easing").attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
    this.force.start();
    this.hide_label();
    this.hide_years();
    this.hide_orgs();
    $("#det-slider").bind("valuesChanged", function(e, data){ 
      _this.update();
      $( "#count" ).empty().append( "задержания от " + Math.round(data.values.min) +  " до " + Math.round(data.values.max) + " человек" );
    });
    $("#date-slider").bind("valuesChanged", function(e, data){ 
    _this.update(); 
    $( "#dates" ).empty().append( "задержания с " + moment(data.values.min).format("DD.MM.YYYY") + " по " + moment(data.values.max).format("DD.MM.YYYY"));
    });
    return this.display_axis();
  };

  BubbleChart.prototype.move_towards_date = function(alpha) {
    var _this = this;
    return function(d) {
      var date, x, y;
      date = d3.time.format("%d.%m.%Y");
      d.date2 = date.parse(d.date);
      //console.log(xScale);
      x = xScale(d.date2);
      y = yScale(d.value);
      d.x = d.x + (x - d.x) * (_this.damper + 0.001);
      return d.y = d.y + (y - d.y) * (_this.damper + 1);
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
  }
  
  var margin, xAxis, yAxis;
    margin = {
      top: 19.5,
      right: 19.5,
      bottom: 19.5,
      left: 39.5
    };
    this.width = 990;
    this.height = 600;
    /*xScale = d3.time.scale().range([10, this.width]);
    yScale = d3.scale.linear().range([this.height, 0]);
    xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(12, d3.format(",d"));
    yAxis = d3.svg.axis().scale(yScale).orient("left");*/
    
  BubbleChart.prototype.display_axis = function() {
    B = new Date(2011, 9, 4);
    J = new Date(2012, 12, 4);
    xScale.domain([$("#date-slider").dateRangeSlider("values").min, $("#date-slider").dateRangeSlider("values").max]);
    yScale.domain([$("#det-slider").rangeSlider("values").min, $("#det-slider").rangeSlider("values").max]);
    this.vis.attr("width", this.width + margin.left + margin.right).attr("height", this.height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    this.vis.append("g").attr("class", "x axis").attr("transform", "translate(40," + this.height + ")").call(xAxis);
    this.vis.append("g").attr("class", "y axis").attr("transform", "translate(50,0)").call(yAxis);
    this.vis.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", this.width + 50).attr("y", this.height + 30).text("дата мониторинга");
    return this.vis.append("text").attr("class", "y label").attr("text-anchor", "end").attr("y", 6).attr("dy", ".75em").attr("transform", "rotate(-90)").text("количество задержаний");
  };

  BubbleChart.prototype.hide_axis = function() {
    var axis, label;
    axis = this.vis.selectAll(".axis").remove();
    $("#det-slider,#date-slider,#dates,#count").remove();
    return label = this.vis.selectAll(".label").remove();
  };
  
/////////////////////////////////

// DISPLAY BY ORGANIZATORS

  BubbleChart.prototype.display_by_type = function() {
    var _this = this;
	this.hide_orgs();
	var orgs = _this.getOrganizators
	for(i=0;i<orgs.length;i++){
		this.vis.append("text").attr("class", "orgLabel").attr("y",50+25*i).attr("x", 800).text(orgs[i].name);
		this.vis.append("text").attr("class", "orgTotal").attr("y",50+25*i).attr("x", 760).text(orgs[i].total);
		//alert(orgs[i].name);
	}
    this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", function(e) {
      return _this.circles.each(_this.move_towards_type(e.alpha)).attr("cx", function(d) {
        return d.x;
      }).attr("cy", function(d) {
        return d.y;
      });
    });
    this.force.start();
    this.hide_label();
    this.hide_years();
    return this.hide_axis();
  };

 /* BubbleChart.prototype.move_towards_type = function(alpha) {
    var _this = this;
    console.log(this.circles);
    var orgs = _this.getOrganizators;
    var orgsArr = _this.getOrganizatorsArray;
    return function(d) {
		//console.log(d);
	  //alert(d.radius);
	   var position, targetX, targetY, radius, delta, centerX, centerY;
	  centerX = 400;
	  centerY = 300;
	  radius = 260
	 // delta = Math.PI/8;
      position = orgsArr.indexOf(d.org);
	  var obj = orgs[position];
	  targetX = centerX+Math.cos(obj.angle)*radius;
	  targetY = centerY+Math.sin(obj.angle)*radius;
      /*if (position < 4) {
      	targetY = 200;
      }
      else {
      	targetY = 200 * Math.floor(position / 4) + 200*(orgs[position-(position % 4)].total/500);
      }
      targetX = 200 + 200 * (position % 4);*/
      //d.y = d.y + (targetY - d.y) * Math.sin(Math.PI * (1 - alpha * 10)) * 0.009;
	  //alert(targetY+(obj.radius-d.radius)*(1-alpha)*Math.sin((d.radius*d.id)*Math.PI));
	/*  if(alpha > 0.05){
		  d.y = d.y +(targetY-d.y)*(1-alpha*10)*2+(obj.radius-d.radius)*(1-alpha)*Math.sin(d.angle+obj.startAngle);
		  return d.x = d.x + (targetX-d.x)*(1-alpha*10)*2+(obj.radius-d.radius)*(1-alpha)*Math.cos(d.angle+obj.startAngle);
	  }
	  else{
		  d.y = targetY+(obj.radius-d.radius)*(1-alpha)*Math.sin(d.angle+obj.startAngle);
		  if(d.id==61){
			  //console.log(alpha);
		  }
		  //return d.x = d.x + (targetX - d.x) * Math.sin(Math.PI * (1 - alpha * 10)) * 0.009;
		  return d.x = targetX+(obj.radius-d.radius)*(1-alpha)*Math.cos(d.angle+obj.startAngle);
	  }
	  
    };
  };
  */
/////////////////////////////////

// TOOLTIP

  BubbleChart.prototype.show_details = function(data, i, element) {
    var content;
    d3.select(element).attr("stroke", "black");
    content = "<div id=\"tooltipContainer\">";
    content += "<div class=\"data-type\">" + data.comment + "</div>";
    content += "<div class=\"data-rule\"></div>";
    content += "<div class=\"data-date\">" + data.date + "</div>";
    content += "<div class=\"data-desc\">Количество задержанных</div>";
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
    return root.display_all();
  };
  root.display_all = function() {
    return chart.display_group_all();
  };
  root.display_year = function() {
    return chart.display_by_year();
  };
  root.display_chron = function() {
    $('#main').append('<p id="count"></p><div id="det-slider"></div><p id="dates"><div id="date-slider"></div>');
    $("#det-slider").rangeSlider({
      defaultValues:{
    	min: 0,
    	max: 700
  	  },
      bounds:{
    	min: 0,
    	max: 700
    }});
    $( "#count" ).empty().append( "задержания от " + $("#det-slider").rangeSlider("values").min + " до " + $("#det-slider").rangeSlider("values").max + " человек" );
    $("#date-slider").dateRangeSlider({
      defaultValues:{
    	min: new Date(2011, 9, 4),
    	max: new Date(2012, 11, 21)
  	  },
      bounds:{
    	min: new Date(2011, 9, 4),
    	max: new Date(2012, 11, 21)
    }});
    return chart.display_by_date();
  };
  root.display_type = function() {
    return chart.display_by_type();
  };
  root.toggle_view = function(view_type) {
    if (view_type === 'cons') {
      return root.display_year();
    } else if (view_type === 'all') {
      return root.display_all();
    } else if (view_type === 'chron') {
      return root.display_chron();
    } else if (view_type === 'type') {
      return root.display_type();
    }
  };
  return d3.csv("https://docs.google.com/spreadsheet/pub?key=0AqL_R49TiUuAdGpDMUphai0wemI4NXBkQ3BBUTJpYWc&single=true&gid=0&output=csv", render_vis);
});