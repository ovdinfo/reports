// d3.legend.js 
// (C) 2012 ziggy.jonsson.nyc@gmail.com
// MIT licence

(function() {
d3.legend = function(g) {
  g.each(function() {
    var g= d3.select(this),
        items = {},
        svg = d3.select(g.property("nearestViewportElement")),
        legendPadding = g.attr("data-style-padding") || 5,
        li = g.selectAll(".legend-items").data([true])

    li.enter().append("g").classed("legend-items",true)

    svg.selectAll("[data-legend]").each(function() {
        var self = d3.select(this)
        items[self.attr("data-legend")] = {
          pos : self.attr("data-legend-pos") || this.getBBox().y,
          color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke") 
        }
      })

    items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})

    
    li.selectAll("text")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("text")})
        .call(function(d) { d.exit().remove()})
        .attr("y",function(d,i) { return (i*15+8)})
        .attr("x","3em")
        .text(function(d) { ;return d.key})
    
    li.selectAll("rect")
        .data(items,function(d) { return d.key})
        .call(function(d) { d.enter().append("rect")})
        .call(function(d) { d.exit().remove()})
        .attr("y",function(d,i) { return (i*15)})
        .attr("x",0)
        .attr("width","15")
        .attr("height","10")
        .style("stroke","black")
        .style("stroke-width","1")
        .style("stroke-opacity","0.5")
        .style("fill",function(d) { return d.value.color})  
  })
  return g
}
})()
