var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = innerWidth - margin.right - margin.left,
	height = innerHeight - margin.top - margin.bottom;
	
var i = 0,
	duration = 750,
	root;

var tooltip = d3.select("#chart").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0)
    .style("color","#776D3A");

var color = d3.scale.category20();

var zoom = d3.behavior.zoom()
  .scaleExtent([.2,2])
  .on('zoom', function(){
    svg.attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
  })
  .translate([150, 200]);

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var colors = d3.scale.category20();

var svg = d3.select("#chart").append("svg") 
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
	.call(zoom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("treeData.json", function(error, treeData) {
  root = treeData[0];
  root.x0 = height / 2;
  root.y0 = 0;
  update(root);
});

d3.select(self.frameElement).style("height", "500px");

function update(source) {

  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  nodes.forEach(function(d) { d.y = d.depth * 220; });
 
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click);

nodeEnter.append("circle")
	  .attr("r", 10)
	  .style("fill", function(d) {
           if(d.postotak == 100 ) { return "#B2E7B2"; } 
            else if (d.postotak <= 99 && d.postotak >= 50 ) { return "#e8e8a2"; } 
        else { return "#f0a8a8"; } 
        })
    .on("mouseover", function(d) {      
        tooltip.transition()        
            .duration(900)      
            .style("opacity", .8)    
            .style("left", (d3.event.pageX + -220) + "px")     
            .style("top", (d3.event.pageY - 40) + "px")
            tooltip.html("<p class='tooltip_h'>" + "<span class='glyphicon glyphicon-eye-open'>" + "</span>" + "  " + d.name + "</p>" + "<hr/>" +
            "<p class='tooltip_p'>" + "id_pojma: " + " ( " +  d.id + " ) " + "</p>" + "<br/>" + "<p class='tooltip_p'>" + "postotak : " + d.postotak + "%" + "</p>" + "<hr/>" + 
            "<p class='tooltip_p'>" + "<i class='fa fa-square square_01' aria-hidden='true'>" + "</i>" + "100%" + "</p>" + 
            "<p class='tooltip_p'>" + "<i class='fa fa-square square_02' aria-hidden='true'>" + "</i>" + "50%-99%" + "</p>" + 
            "<p class='tooltip_p'>" + "<i class='fa fa-square square_03' aria-hidden='true'>" + "</i>" + "0-49%" + "</p>"); 
      })                  
      .on("mouseout", function(d) {       
        tooltip.transition()        
            .duration(600)      
            .style("opacity", 0);   
      });

  nodeEnter.append("a")
    .attr("xlink:href", function(d){return d.url;})
    .append("text")
	  .attr("x", function(d) { return d.children || d._children ? -30 : 20; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);
    
nodeEnter.append("path")
    .style("fill", function(d) {
           if(d.postotak == 100 ) { return "#B2E7B2"; } 
            else if (d.postotak <= 99 && d.postotak >= 50 ) { return "#e8e8a2"; } 
        else { return "#f0a8a8"; } 
        })
    .style("stroke","black")
    .attr("d", d3.svg.symbol()
    .size(40)
    .type(function(d) { if
            (d.children = d.children ) { return "cross"; } 
            else { return "circle";}
        }))
    .on("mouseover", function(d) {      
        tooltip.transition()        
            .duration(900)      
            .style("opacity", .8)
            .style("left", (d3.event.pageX + -220) + "px")     
            .style("top", (d3.event.pageY - 40) + "px")
            /*tooltip.html("<p class='tooltip_h'>" + "<span class='glyphicon glyphicon-user'>" + "</span>" + " " + d.name + "</p>" + "<br/>" + "<p class='tooltip_p'>" + d.postotak + "</p>" + "<br/>" + "<p class='tooltip_p'>" + "uspjeh : " + d.value + "</p>" + "<br/>" + "<p class='tooltip_h'>" + "<span class='glyphicon glyphicon-user'>" + "</span>" + " " + "broj studenata :" + "</p>" + "<br/>" + "<p class='tooltip_p'>" + d.name + "</p>" ); */
            //.text(d.studenti + " - " + "uspjeh studenta : " + d.uspjeh);  
            tooltip.html("<p class='tooltip_h'>" + "<span class='glyphicon glyphicon-eye-open'>" + "</span>" + "  " + d.name + "</p>" + "<hr/>" +
            "<p class='tooltip_p'>" + "id_pojma: " + " ( " +  d.id + " ) " + "</p>" + "<br/>" + "<p class='tooltip_p'>" + "postotak : " + d.postotak + "%" + "</p>" + "<hr/>" + 
            "<p class='tooltip_p'>" + "<i class='fa fa-square square_01' aria-hidden='true'>" + "</i>" + "100%" + "</p>" + 
            "<p class='tooltip_p'>" + "<i class='fa fa-square square_02' aria-hidden='true'>" + "</i>" + "50%-99%" + "</p>" + 
            "<p class='tooltip_p'>" + "<i class='fa fa-square square_03' aria-hidden='true'>" + "</i>" + "0-49%" + "</p>"); 
      })                  
      .on("mouseout", function(d) {       
        tooltip.transition()        
            .duration(600)      
            .style("opacity", 0);   
      });
    
  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 8)
	  .style("fill", function(d) {
           if(d.postotak == 100 ) { return "#B2E7B2"; } 
            else if (d.postotak <= 99 && d.postotak >= 50 ) { return "#e8e8a2"; } 
            else { return "#f0a8a8"; } });
    

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);


svg.append("svg:defs").selectAll("marker")
    .data(["end"])     
    .enter().append("svg:marker")   
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 23)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");



  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });


  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  })
    .attr("marker-end", "url(#end)");


  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}


function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}




  