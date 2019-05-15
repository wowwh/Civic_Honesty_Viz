var data = []; // the variable that holds the data from csv file
var dict = {};
var namelist = [];
var SORT = '0';


//Give me an indicator select and the country name of the country clicked.
var select = 'country';
//var select = 'Brazil';
var country_name = '';


$(document).ready(function () {
    loadCsv();
    wireSortButtonClickEvents();
});


function loadCsv() {
    d3.csv("data/" + ((select != 'country')? "city/" + country_name : "country") + ".csv", function (d) {
        dict = {};
        d.forEach(function (item) {
            csvdata = d;
            item.money = parseInt(item.money);
            item.response = parseInt(item.response);
            if (!(item[select] in dict)) {
                dict[item[select]] = {};
            }
            dict[item[select]][item.money] = item.response;
        });
        //console.log(dict)
        drawScatterPlot(csvdata);
    });
}

function sort() {
    //console.log(dict)
    var sortedObjKeys = Object.keys(dict).sort(function(a, b) {
        if (SORT == '0') return dict[b][0] - dict[a][0];
        else if (SORT == '1') return dict[b][1] - dict[a][1];
        else if (SORT == '-1') return (dict[b][1] - dict[b][0]) - (dict[a][1] - dict[a][0]);
    });
    //console.log(sortedObjKeys)
    return sortedObjKeys;
}

function tryHigh(place) {
    //console.log(dict[place][2])
    if (dict[place][2]) { return "</br>Response Rate with High Stake Money($ 95): " + dict[place][2];}
    else return "";
}


function drawScatterPlot(ds) {
    namelist = sort();

  var margin = { top: 50, right: 50, bottom: 50, left: 150 };
  //width = 400 - margin.left - margin.right;
  height = 560 - margin.top - margin.bottom;
  width = 500 - margin.left - margin.right;
    console.log(width)
    var svg = d3.select("#country_city").append("svg")
  .attr('class', 'country-city-chart')
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

    var y = d3.scaleBand()
    .domain(namelist)
    .range([0, height]);

    var x = d3.scaleLinear()
    .domain( [((SORT == '-1') ? d3.min(ds, function(d) {return dict[d[select]][1] - dict[d[select]][0] - 5;}) : -5),
    d3.max(ds, function (d) {
        if (SORT != '-1') return d.response +5
        else return dict[d[select]][1] - dict[d[select]][0] + 5;
    })])
    .range([0, width]);



    svg.selectAll(".circle")
    .data(ds)
    .enter().append("circle")
    .attr("class", "circle");

    var ttip = d3.select("#country_city").append("div").attr("class", "toolTip");


      var dots = svg.selectAll('.circle');
      dots
      .attr('cx',function (d) {
        if (SORT == -1) {
            if (d.money == 0) return x(0);
            else return x(d.response - dict[d[select]][0])}
        else return x(d.response);
    })
      .attr('cy',function (d) {return y(d[select])})
      .attr('r', function(d) {return 4 + (d.response - 20)/50;})
      .attr('fill',function (d) {
          if (d.money == 0) return '#FF8000';
          else return '#FFD700';
      })
      .attr('opacity', function (d) {
        if (d.money == 2) return '0';
    });

      dots.on("mousemove", function (d) {
        d3.select(this).attr('r', function(d) {return 8 + (d.response - 20)/50;});
        ttip
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 120 + "px")
        .style("display", "inline-block")
        .html( select + ": "+ d[select] + "</br>Response Rate without Money($ 0): "+ dict[d[select]][0]+ "</br>Response Rate with Money($ 15): " + dict[d[select]][1] + tryHigh(d[select]))
        .attr("transform", "translate(" + (x(d.response)   + 50  ) + ",0)");
    })
    .on("mouseout", function (d) {
        d3.select(this).attr('r', function(d) {return 4 + (d.response - 20)/50;});
        ttip.style("display", "none");
    });

    namelist.forEach(function(d) {
        var lines = svg.append("line")
        .style("stroke", "gray")

        if (SORT == '-1') {
        lines.attr("x1", x(0))
        .attr("y1", y(d))
        .attr("x2", x(dict[d][1] - dict[d][0]))
        .attr("y2", y(d))
        }
        else {
        lines.attr("x1", x(dict[d][0]))
        .attr("y1", y(d))
        .attr("x2", x(dict[d][1]))
        .attr("y2", y(d))
        }
    })

    svg.append("g")
	.attr("transform", "translate(0," + height + ")")
	.call(d3.axisBottom(x));

	svg.append("g")
    .call(d3.axisLeft(y));

    svg.append("circle")
    .attr("cx", (width/2) - 50)  // space legend
    .attr("cy", height + (margin.bottom/2)+10)
    .attr("r", 8)
    .attr("transform", "translate(68,0)")
    .style("fill", '#FF8000');
    svg.append("text")
    .attr("x", (width/2) - 50 + 10)  // space legend
    .attr("y", height + (margin.bottom/2)+ 15)
    .attr("class", "legend")    // style the legend
    .style("fill", 'white')
    .attr("transform", "translate(68,0)")
    .text('$0');

    svg.append("circle")
    .attr("cx", (width/2) -50 + 50)  // space legend
    .attr("cy", height + (margin.bottom/2)+10)
    .attr("r", 8)
    .attr("transform", "translate(68,0)")
    .style("fill", '#FFD700');
    svg.append("text")
    .attr("x", (width/2) -50 + 60)  // space legend
    .attr("y", height + (margin.bottom/2)+ 15)
    .attr("class", "legend")    // style the legend
    .style("fill", 'white')
    .attr("transform", "translate(68,0)")
    .text('$15');


}

function wireSortButtonClickEvents() {

    d3.selectAll("#sort .button").on("click", function () {
        button_val = d3.select(this).attr("data-val");
        if (button_val != 'reset') {
            SORT = button_val;
            d3.select("#sort .current").classed("current", false);
            d3.select(this).classed("current", true);
        }
        else {
            select = 'country';
            SORT = 0;
            d3.select("#sort .current").classed("current", false);
            $("[data-val='0']").addClass("current")
        }
        $("#country_city").empty();
        //drawScatterPlot(data);
        loadCsv()
    });

    d3.select('#worldmap').on("click", function () {
        //var sl = document.getElementById('passVar').value
        //console.log(sl)
        if (document.getElementById('passVar').value == 'country') select = 'country'
        else if (document.getElementById('passVar').value){
            select = 'city';
            country_name = document.getElementById('passVar').value;
        }
        else select = 'country'
        $("#country_city").empty();
        loadCsv()
    })

    // $(window).resize(function() {
    //     $("#country_city").empty();
    //     loadCsv();
    //   });
}
