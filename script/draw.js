var data = [];
var category_colors = {
  '0': '#FBB03C',
  '1': '#F15A25',
  '2': '#C2262D',
  '3': '#8e0732',
  '4': '#8e0775'
};

var category_money = {
  '0': '$0',
  '1': '$15',
  '2': '$95'
};

var category_gender = {
  '0': 'Female',
  '1': 'Male'
};

var category_age = {
  '0': '<=40',
  '1': '>40',
};

var category_institutions = {
  '0': 'Bank',
  '1': 'Cultural(theater)',
  '2': 'Hotel',
  '3': 'Post',
  '4': 'Public(police)'
};

var circleRadius = 6;
var circleRadiusHover = 12;

var USER_PARA1 = "Money",
    USER_PARA2 = "Gender";


$(document).ready(function () {
    loadData();
    wireButtonClickEvents();
});

// Loads the CSV file
function loadData() {
    // load the csv file
    // assign it to the data variable, and call the visualize function by first filtering the data
    // call the visualization function by first findingDataItem
    d3.csv("data/honesty-data-grouped.csv", function(d){
        data = d.filter(function(item){ return item.response !== "" });
        data.forEach(function (item) {
            item.pr = parseInt(item.response);
        });
        console.log(data);
        visualizeLineChart(findDataItem());
    });
}

// REF: SI 649
// Finds the dataitem that corresponds to USER_PARA1 and USER_PARA2 variable values
function findDataItem() {

    if(USER_PARA1 == "Money" && USER_PARA2 == "Gender"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.money; })
                            .key(function(d){ return d.male})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Money-Gender Chart Dataitems: ");
    }

    if(USER_PARA1 == "Money" && USER_PARA2 == "Age"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.money; })
                            .key(function(d){ return d.age40})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Money-Age Chart Dataitems: ");
    }

    if(USER_PARA1 == "Money" && USER_PARA2 == "Institutions"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.money; })
                            .key(function(d){ return d.institutions})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Money-Institutions Chart Dataitems: ");
    }

    if(USER_PARA1 == "Gender" && USER_PARA2 == "Money"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.male; })
                            .key(function(d){ return d.money;})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Gender-Money Chart Dataitems: ");
    }

    if(USER_PARA1 == "Gender" && USER_PARA2 == "Age"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.male; })
                            .key(function(d){ return d.age40})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Gender-Age Chart Dataitems: ");
    }

    if(USER_PARA1 == "Gender" && USER_PARA2 == "Institutions"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.male; })
                            .key(function(d){ return d.institutions})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Gender-Institutions Chart Dataitems: ");
    }

    if(USER_PARA1 == "Age" && USER_PARA2 == "Money"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.age40; })
                            .key(function(d){ return d.money})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Age-Money Chart Dataitems: ");
    }

    if(USER_PARA1 == "Age" && USER_PARA2 == "Gender"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.age40; })
                            .key(function(d){ return d.male})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Age-Gender Chart Dataitems: ");
    }

    if(USER_PARA1 == "Age" && USER_PARA2 == "Institutions"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.age40; })
                            .key(function(d){ return d.institutions})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Age-Institutions Chart Dataitems: ");
    }

    if(USER_PARA1 == "Institutions" && USER_PARA2 == "Money"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.institutions; })
                            .key(function(d){ return d.money})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Institutions-Money Chart Dataitems: ");
    }

    if(USER_PARA1 == "Institutions" && USER_PARA2 == "Gender"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.institutions; })
                            .key(function(d){ return d.male})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Institutions-Gender Chart Dataitems: ");
    }

    if(USER_PARA1 == "Institutions" && USER_PARA2 == "Age"){
      var groupedData = d3.nest()
                            .key(function(d){ return d.institutions; })
                            .key(function(d){ return d.age40})
                            .rollup(function(v){
                              var result = d3.mean(v, function(d){ return d.response; });
                              return parseFloat(result.toFixed(2));
                            })
                            .entries(data);
      console.log("=====================================");
      console.log("Institutions-Age Chart Dataitems: ");
    }

    // remove null data
    groupedData.forEach(function(item, i){
      if(item.key == ""){
        groupedData.splice(i,1);
      }
      for(var v in item.values){
        if(item.values[v].key == ""){
          item.values.splice(v,1);
        }
      }
    });
    console.log(groupedData);
    return groupedData;
}


function visualizeLineChart(dataitems){

  //  Reset width
  width = 1080 - margin.left - margin.right;
  //  SCALE AXIS
  var y = d3.scaleBand()
            .domain(dataitems.map(function (d) { return d.key; }))
            .range([0, height]);

  var x = d3.scaleLinear()
      .domain([20,
        d3.max(dataitems, function (d) { return d3.max(d.values, function(v){ return v.value; }); })
      ])
      .range([0, width]);


  var tooltip = d3.select("body").append("div").attr("class", "toolTip"); //ADD TOOLTIP

  // Ref: https://codepen.io/zakariachowdhury/pen/JEmjwq
  //  APPEND SVG
  var svg = d3.select("#chart1").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

  //  Add lines into SVG
  //  Loop
  dataitems.forEach(function(v, i) {

    // add line
      var lineGenerator = d3.line()
                            .x(function(d){ return x(d.value); })
                            .y(function(d){ return y(v.key); });

      var line = lineGenerator(v.values);
      console.log("v.values: ");
      console.log(v.values);
      console.log("line: "+line);
      var g = svg.append("g");
                  // .attr('transform',"translate(0,63.333333333333336)"); // why y-axis not match automatically???
      var path = g.append("path")
                  .data(v.values)// 10. Binds data to the line
                  .attr("class", "line") // Assign a class for styling
                  .attr("stroke", '#333333')
                  .attr("stroke-width", '3')
                  .attr("d", line);

      // var totalLength = path.node().getTotalLength();
      //
      // path.attr("stroke-dasharray", totalLength + " " + totalLength)
      //     .attr("stroke-dashoffset", totalLength)
      //     .transition()
      //       .duration(2000)
      //       .ease("linear")
      //       .attr("stroke-dashoffset", 0);

      // add circles
      console.log('Add dots');
      var circles = g.selectAll('.circle-group')
                        .data(v.values)
                        .enter().append("g")
          circles.append("circle")
                  .attr("class", "circle")
                  .style("fill", function(d) { return category_colors[d.key]; })
                  .attr("cx", function(d) { return x(d.value); })
                  .attr("cy", function(d) { return y(v.key); })
                  .attr("r", circleRadius);
                  // .on("mousemove", function (d) {
                  //   d3.select(this).attr("r", circleRadiusHover);
                  //   tooltip.style("left", d3.event.pageX - 50 + "px")
                  //          .style("top", d3.event.pageY - 100 + "px")
                  //          .style("display", "inline-block")
                  //          .html("<b>" + USER_PARA1 + ": </b>" + (category_money[v.key]) + "<br>" +
                  //                "<b>" + USER_PARA2 + ": </b>" + (category_gender[d.key]) + "<br>" +
                  //                "<b>Response Rate: </b> " + (d.value));
                  // })
                  // .on("mouseout", function (d) {
                  //   d3.select(this).attr("r", circleRadius);
                  //   tooltip.style("display", "none");
                  // });
          // add tooltip for circles
          // convert to function
          addCircleToolTip(circles, tooltip,v);
          console.log(circles);

      // add label for line
      // convert to function
      addLineLabel(svg,y,v);

  }); //  End loop

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axis")
        .call(d3.axisBottom(x));

    // add the y Axis
    var yAxis = svg.append("g")
                    .attr("class", "axis")
                    .call(d3.axisLeft(y));
        yAxis.selectAll('.tick').remove();

    // text label for the x axis
    svg.append("text")
        .attr("transform",
              "translate(" + (width/2) + " ," +
                             (height + 40) + ")")
        .attr('class', 'axis-label')
        .style('fill', '#bebebe')
        .style("text-anchor", "middle")
        .text("Response Rate");

    // text label for the y axis
    svg.append("text")
        .attr('class', 'axis-label')
        .attr("transform", "rotate(-90)")
        .style('fill', '#bebebe')
        .attr("y", 0 - (margin.left/2) - 5)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(USER_PARA1);

    // add legend
    // convert to function
    addChartLegend(svg);

}

function addLineLabel(svg,y,v){

    if(USER_PARA1 == 'Money'){
      svg.append("text")
          .attr("transform", "translate(10," + y(v.key) + ")")
          .attr("dy", ".35em")
          .attr("text-anchor", "start")
          .style("fill", "#bebebe")
          .text(category_money[v.key]);
    }

    if(USER_PARA1 == 'Gender'){
      svg.append("text")
          .attr("transform", "translate(10," + y(v.key) + ")")
          .attr("dy", ".35em")
          .attr("text-anchor", "start")
          .style("fill", "#bebebe")
          .text(category_gender[v.key]);
    }

    if(USER_PARA1 == 'Age'){
      svg.append("text")
          .attr("transform", "translate(10," + y(v.key) + ")")
          .attr("dy", ".35em")
          .attr("text-anchor", "start")
          .style("fill", "#bebebe")
          .text(category_age[v.key]);
    }

    if(USER_PARA1 == 'Institutions'){
      svg.append("text")
          .attr("transform", "translate(10," + y(v.key) + ")")
          .attr("dy", ".35em")
          .attr("text-anchor", "start")
          .style("fill", "#bebebe")
          .text(category_institutions[v.key]);
    }
}

function addCircleToolTip(circles,tooltip,v){

  if(USER_PARA1 == "Money" && USER_PARA2 == "Gender"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_money[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_gender[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Money" && USER_PARA2 == "Age"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_money[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_age[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Money" && USER_PARA2 == "Institutions"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_money[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_institutions[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Gender" && USER_PARA2 == "Money"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_gender[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_money[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Gender" && USER_PARA2 == "Age"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_gender[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_age[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Gender" && USER_PARA2 == "Institutions"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_gender[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_institutions[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Age" && USER_PARA2 == "Money"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_age[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_money[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Age" && USER_PARA2 == "Gender"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_age[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_gender[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Age" && USER_PARA2 == "Institutions"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_age[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_institutions[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Institutions" && USER_PARA2 == "Money"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_institutions[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_money[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Institutions" && USER_PARA2 == "Gender"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_institutions[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_gender[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }

  if(USER_PARA1 == "Institutions" && USER_PARA2 == "Age"){
    circles.selectAll('.circle')
           .on("mousemove", function (d) {
                d3.select(this).attr("r", circleRadiusHover);
                tooltip.style("left", d3.event.pageX - 50 + "px")
                       .style("top", d3.event.pageY - 120 + "px")
                       .style("display", "inline-block")
                       .html("<b>" + USER_PARA1 + ": </b>" + (category_institutions[v.key]) + "<br>" +
                             "<b>" + USER_PARA2 + ": </b>" + (category_age[d.key]) + "<br>" +
                             "<b>Response Rate: </b> " + (d.value));
          })
          .on("mouseout", function (d) {
                d3.select(this).attr("r", circleRadius);
                tooltip.style("display", "none");
          });
  }
}

function addChartLegend(svg){
    if(USER_PARA2 == 'Gender'){
      var i = 1;
      for(var key in category_gender){
        svg.append("circle")
            .attr("cx", (width/2) - margin.left*i)  // space legend
            .attr("cy", height + (margin.bottom/2)+10)
            .attr("r", circleRadius)
            .attr("transform", "translate(68,0)")
            .style("fill", category_colors[key]);
        svg.append("text")
            .attr("x", (width/2) - margin.left*i +10)  // space legend
            .attr("y", height + (margin.bottom/2)+ 15)
            .attr("class", "legend")    // style the legend
            .style("fill", category_colors[key])
            .attr("transform", "translate(68,0)")
            .text(category_gender[key]);
        i = i+1;
      }
    }

    if(USER_PARA2 == 'Money'){
      var i = 1;
      for(var key in category_money){
        svg.append("circle")
            .attr("cx", (width/2) - margin.left*i)  // space legend
            .attr("cy", height + (margin.bottom/2)+10)
            .attr("r", circleRadius)
            .attr("transform", "translate(100,0)")
            .style("fill", category_colors[key]);
        svg.append("text")
            .attr("x", (width/2) - margin.left*i +10)  // space legend
            .attr("y", height + (margin.bottom/2)+ 15)
            .attr("class", "legend")    // style the legend
            .style("fill", category_colors[key])
            .attr("transform", "translate(100,0)")
            .text(category_money[key]);
        i = i+1;
      }
    }

    if(USER_PARA2 == 'Age'){
      var i = 1;
      for(var key in category_age){
        svg.append("circle")
            .attr("cx", (width/2) - margin.left*i)  // space legend
            .attr("cy", height + (margin.bottom/2)+10)
            .attr("r", circleRadius)
            .attr("transform", "translate(72,0)")
            .style("fill", category_colors[key]);
        svg.append("text")
            .attr("x", (width/2) - margin.left*i +10)  // space legend
            .attr("y", height + (margin.bottom/2)+ 15)
            .attr("class", "legend")    // style the legend
            .style("fill", category_colors[key])
            .attr("transform", "translate(72,0)")
            .text(category_age[key]);
        i = i+1;
      }
    }

    if(USER_PARA2 == 'Institutions'){
      var i = 1;
      for(var key in category_institutions){
        svg.append("circle")
            .attr("cx", width - margin.left*i*3 -10)  // space legend
            .attr("cy", height + (margin.bottom/2)+10)
            .attr("r", circleRadius)
            // .attr("transform", "translate(72,0)")
            .style("fill", category_colors[key]);
        svg.append("text")
            .attr("x", width - margin.left*i*3)  // space legend
            .attr("y", height + (margin.bottom/2)+ 15)
            .attr("class", "legend")    // style the legend
            .style("fill", category_colors[key])
            .style('text-align', 'left')
            // .attr("transform", "translate(72,0)")
            .text(category_institutions[key]);
        i = i+1;
      }
    }
}

function wireButtonClickEvents() {
    // We have two groups of dropdown, each sets one variable value.
    d3.select('#submit').on('click', function(){
      if(d3.select('#select1').property("value") == "" || d3.select('#select2').property("value") == ""){
        $("#test").text("Please select two parameters first.");
      } else {
          if(d3.select('#select1').property("value") !== d3.select('#select2').property("value")){
            USER_PARA1 = d3.select('#select1').property("value");
            USER_PARA2 = d3.select('#select2').property("value");
            // console.log(USER_PARA1);
            // console.log(USER_PARA2);
            $("#test").empty();
            $("#chart1").empty();
            // TODO: find the data item and invoke the visualization function

            visualizeLineChart(findDataItem());
          } else {
              $("#test").text("Two parameters can not be the same.");
          }
      }
    });
  }
