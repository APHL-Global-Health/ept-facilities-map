  function fillColor(d){
  	var color = "#ffffbf";
  	if(d.geometry.type == "Point") return "#ff0000";
  	switch(Math.round(Math.random()*9)){
		case 1: color = "#96bd93"; break;
		case 2: color = "#a6d96a"; break;
		case 3: color = "lightblue"; break;
		case 4: color = "#ffffbf"; break;
		case 5: color = "#fee08b"; break;
		case 6: color = "#fdae61"; break;
		case 7: color = "#f4fdf3"; break;
		case 8: color = "#e0d7c7"; break;
		default: color = "#ffffbf"; break;
  	}
  	return color;
  }

function showCountyNames(geo_data, path, svg){
	
   svg.selectAll("text")
    .data(geo_data.features)
    .enter()
    .append("svg:text")
    .text(function(d){
        return d.properties.COUNTY;
    })
    .attr("x", function(d){
        return path.centroid(d)[0];
    })
    .attr("y", function(d){
        return  path.centroid(d)[1];
    })
    .attr("font-family","Arial")
    .attr("text-anchor","middle")
    .attr('font-size','5pt');
}

function draw(geo_data) {
  	"use strict";
  	var width = 750,
      height = 600,
      scale = 3170,
      translateX = -1740,
      translateY = 310;

  	var projection = d3.geo.mercator()
      .scale(scale)
      .center([0,0])
      .translate( [translateX, translateY]);

  	var path = d3.geo.path().projection(projection);

  	var svg = d3.select("#chart")
      .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "map");

  	var map = svg.selectAll("path")
      .data(geo_data.features)
      .enter()
      .append("path")
        .attr("d", path)
        .style("fill", 	fillColor)
        .style("stroke", "black")
        .style("stroke-width", 0.3);

   	// showCountyNames(geo_data, path, svg);
};

d3.json("county.geojson", draw);
