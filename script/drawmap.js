var format = d3.format(",");
var select = 'country';



//world map
// Set tooltips
var tip = d3.tip()
.attr('class', 'd3-tip')
//.offset([20, 0])
.html(function(d) {
return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Response: </strong><span class='details'>" + format(d.population) +"</span>";
})

var margin = {top: 20, right: 40, bottom: 100, left: 80},
width = 960 - margin.left - margin.right,
height = 560 - margin.top - margin.bottom;

var color = d3.scaleThreshold()
.domain([10,18,26,34,42,50,58,64,72,80])
.range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"]);

var path = d3.geoPath();

var svg = d3.select("#worldmap")
.append("svg")
.attr('class', 'centering')
.attr("width", width)
.attr("height", height)
.append('g')
.attr('class', 'map');



// Legend
var g = svg.append("g")
.attr("class", "legendThreshold")
.attr("transform", "translate(0,220)");
g.append("text")
.attr("class", "caption")
.attr("x", 0)
.attr("y", -6)
.style('fill', '#bebebe')
.text("Response rate");
var labels = ['0-9', '10-17','18-25', '26-33', '34-41', '42-49', '50-57', '58-63', '64-71', '72-80'];
var legend = d3.legendColor()
.labels(function (d) { return labels[d.i]; })
.shapePadding(4)
.scale(color);
svg.select(".legendThreshold")
.call(legend);

svg.selectAll('.legendThreshold')
    .selectAll('text')
    .style('fill', '#bebebe');



var projection = d3.geoMercator()
    .scale(130)
    .translate( [width / 2, height / 1.5]);

var path = d3.geoPath().projection(projection);

svg.call(tip);

$(document).ready(function () {
    queue()
    .defer(d3.json, "https://raw.githubusercontent.com/jdamiani27/Data-Visualization-and-D3/master/lesson4/world_countries.json")
    .defer(d3.tsv, "data/world_response.tsv")
    .await(ready);
});


function ready(error, data, population) {
    var populationById = {};

    population.forEach(function(d) { populationById[d.id] = +d.population; });
    data.features.forEach(function(d) { d.population = populationById[d.id] });

    svg.append("g")
    .attr("class", "countries")
    .selectAll("path")
    .data(data.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
    if(populationById[d.id]){return color(populationById[d.id]);}
    else return "#2B2C31";

    })
    .style('stroke', 'white')
    .style('stroke-width', 1.5)
    .style("opacity",0.8)

    // tooltips
    .style("stroke","white")
    .style('stroke-width', 0.3)
    .on('mouseover',function(d){
    if(d.population){
        tip.show(d);
        d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
    }


    })
    .on('mouseout', function(d){
    tip.hide(d);

    d3.select(this)
    .style("opacity", 0.8)
    .style("stroke","white")
    .style("stroke-width",0.3);
    })
    .on('click',function(d){
    if(d.population){
        svg.selectAll('path')
        .attr("d", path)
        .style("fill", function(d) {
        if(populationById[d.id]){return color(populationById[d.id]);}
        else return "#2B2C31";});
      d3.select(this)
          .style("opacity", 1)
          .style("fill",'rgb(255,128,0)')
          .style("stroke","white")
          .style("stroke-width",3);
        select=d.properties.name;
        document.getElementById('passVar').value = select;
        //console.log(select)
        //select is changed here!!!
    }

    });

    svg.append("path")
    .datum(topojson.mesh(data.features, function(a, b) { return a.id !== b.id; }))
    // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
    .attr("class", "names")
    .attr("d", path);

    $("#sortreset").click(function(){
        svg.selectAll('path')
        .attr("d", path)
        .style("fill", function(d) {
        if(populationById[d.id]){return color(populationById[d.id]);}
        else return "#2B2C31";});
    });
}

