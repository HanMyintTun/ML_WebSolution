import { Component, OnInit } from "@angular/core";
import { JsondataService } from "../../_services/jsondata.service";
import * as _ from "lodash";
import * as d3 from "d3";

@Component({
  selector: "app-correlation-chart",
  templateUrl: "./correlation-chart.component.html",
  styleUrls: ["./correlation-chart.component.css"],
})
export class CorrelationChartComponent implements OnInit {
  // labels = [];
  // correlationMatrix = [];
  labels = [
    "mpg",
    "cyl",
    "disp",
    "hp",
    "drat",
    "wt",
    "qsec",
    "vs",
    "am",
    "gear",
    "carb",
  ];
  correlationMatrix = [
    [1, 0.85, 0.84, 0.77, 0.68, 0.86, 0.41, 0.66, 0.59, 0.48, 0.55],
    [0.85, 1, 0.9, 0.83, 0.69, 0.78, 0.59, 0.81, 0.52, 0.49, 0.52],
    [0.84, 0.9, 1, 0.79, 0.71, 0.88, 0.43, 0.71, 0.59, 0.55, 0.39],
    [0.77, 0.83, 0.79, 1, 0.44, 0.65, 0.7, 0.72, 0.24, 0.12, 0.74],
    [0.68, 0.69, 0.71, 0.44, 1, 0.71, 0.09, 0.44, 0.71, 0.69, 0.09],
    [0.86, 0.78, 0.88, 0.69, 0.71, 1, 0.17, 0.55, 0.69, 0.58, 0.42],
    [0.41, 0.59, 0.43, 0.7, 0.09, 0.17, 1, 0.74, 0.22, 0.21, 0.65],
    [0.66, 0.81, 0.71, 0.72, 0.44, 0.55, 0.74, 1, 0.16, 0.2, 0.56],
    [0.59, 0.52, 0.59, 0.24, 0.71, 0.69, 0.22, 0.16, 1, 0.79, 0.05],
    [0.48, 0.49, 0.55, 0.12, 0.69, 0.58, 0.21, 0.2, 0.79, 1, 0.27],
    [0.55, 0.52, 0.39, 0.74, 0.09, 0.42, 0.65, 0.56, 0.05, 0.27, 1],
  ];

  // labels = [
  //   "Var 1",
  //   "Var 2",
  //   "Var 3",
  //   "Var 4",
  //   "Var 5",
  //   "Var 6",
  //   "Var 7",
  //   "Var 8",
  //   "Var 9",
  //   "Var 10",
  // ];
  // correlationMatrix = [
  //   [1, 0.3, 0, 0.8, 0, 0.2, 1, 0.5, 0, 0.75],
  //   [0.3, 1, 0.5, 0.2, 0.4, 0.3, 0.8, 0.1, 1, 0],
  //   [0, 0.5, 1, 0.4, 0, 0.9, 0, 0.2, 1, 0.3],
  //   [0.8, 0.2, 0.4, 1, 0.3, 0.4, 0.1, 1, 0.2, 0.9],
  //   [0, 0.4, 0, 0.3, 1, 0.1, 0.4, 0, 0.6, 0.7],
  //   [0.2, 0.3, 0.9, 0.4, 0.1, 1, 0, 0.1, 0.4, 0.1],
  //   [1, 0.8, 0, 0.1, 0.4, 0, 1, 0.5, 0, 1],
  //   [0.5, 0.1, 0.2, 1, 0.1, 0, 0.5, 1, 0, 0.4],
  //   [0, 1, 1, 0.2, 0.6, 0.4, 0, 0, 1, 0.6],
  //   [0.75, 0, 0.3, 0.9, 0.7, 0.1, 1, 0.4, 0.6, 1],
  // ];

  // labels = [
  //   "Mon",
  //   "Tue",
  //   "Wed",
  //   "Thu",
  //   "Fri",
  //   "Sat",
  //   "Sun"
  // ];
  // correlationMatrix = [
  //   [1,0.85,0.84,0.77,0.68,0.86,0.41],
  //   [0.85,1,0.901,0.73,0.84,0.3,0.2],
  //   [0.84,0.3,1,0.3,0.5,0.4,0.1],
  //   [0.77,0.5,0.11,1,0.4,0.2,0.87],
  //   [0.68,0.2,0.5,0.3,1,0.2,0.9],
  //   [0.86,0.34,0.21,0.6,0.4,1,0.2],
  //   [0.41,0.6,0.9,0.6,0.3,0.2,1],
  // ];

  options = {
    container: "#matrixChart",
    data: this.correlationMatrix,
    labels: this.labels,
    start_color: "#ffffff",
    end_color: "#3498db",
  };

  constructor(private _jsonDataService: JsondataService) {}

  Matrix(options) {
    console.log(options.labels);
    let margin = { top: 50, right: 50, bottom: 150, left: 150 },
      width = 600,
      height = 600,
      data = options.data,
      container = options.container,
      labelsData = options.labels,
      startColor = options.start_color,
      endColor = options.end_color;

    let widthLegend = 100;
    let maxValue = d3.max(data, function (layer: any) {
      return d3.max(layer, function (d: any) {
        return d;
      });
    });
    let minValue = d3.min(data, function (layer: any) {
      return d3.min(layer, function (d: any) {
        return d;
      });
    });

    let numrows = data.length;
    let numcols = data[0].length;

    let svg = d3
      .select(container)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .attr("class", "wrapper");
    let background = svg
      .append("rect")
      .style("stroke", "black")
      .style("stroke-width", "2px")
      .attr("width", width)
      .attr("height", height);

    // let x = d3.scaleBand().range(numcols).rangeRound([0,width]);
    // console.log(x);
    // // let y = d3.scaleBand().range(numrows).rangeRound([0,height]);
    // console.log(y);

    let x = d3.scaleLinear().domain(d3.range(numcols)).range([0, width]);
    //console.log((x(1)/10)/2)
    let y = d3.scaleLinear().domain(d3.range(numrows)).range([0, height]);

    let colorMap = d3
      .scaleLinear()
      .domain([Number(minValue), Number(maxValue)])
      .range([startColor, endColor]);

    var row = svg
      .selectAll(".row")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "row")
      .attr("transform", function (d, i: any) {
        var ch = i * (width / numcols);
        //console.log(((y(i))/10)+(width/numrows));
        return "translate(0," + ch + ")";
      });
      
    var cell = row
      .selectAll(".cell")
      .data(function (d: any) {
        return d;
      })
      .enter()
      .append("g")
      .attr("class", "cell")
      .attr("transform", function (d, i: any) {
        //let c= (x(i)/10) + (width/numcols);
        var c = i * (width / numcols);
        //console.log(c);
        //console.log(((x(i)/10)-600));
        return "translate(" + c + ", 0)";
      });

    cell
      .append("rect")
      .attr("width", width / numrows)
      .attr("height", width / numrows)
      // .attr("width",(x(1)/10))
      // .attr("height",(y(1)/10))
      .style("stroke-width", 0);

    cell
      .append("text")
      .transition()
      .delay(500)
      .attr("dy", ".32em")
      .attr("x", width / numrows / 2)
      .attr("y", width / numrows / 2)
      // .attr("x", (x(1)/10) / 2)
      // .attr("y", (x(1)/10) / 2)
      .attr("text-anchor", "middle")
      .style("fill", function (d: any, i) {
        return d >= Number(maxValue) / 2 ? "white" : "black";
      })
      .text(function (d: any, i) {
        return d;
      });

    row
      .selectAll(".cell")
      .data(function (d, i) {
        return data[i];
      })
      .style("fill", colorMap);

    let labels = svg.append("g").attr("class", "labels");

    let columnLabels = labels
      .selectAll(".column-label")
      .data(labelsData)
      .enter()
      .append("g")
      .attr("class", "column-label")
      .attr("transform", function (d, i: any) {
        console.log(i * (width / numcols));
        return "translate(" + i * (width / numcols) + "," + height + ")";
      });
    // this.xValue = x;
    // console.log(this.xValue);
    columnLabels
      .append("line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .attr("x1", x(1) / 10 / 2)
      .attr("x2", x(1) / 10 / 2)
      .attr("y1", 0)
      .attr("y2", 5);

    columnLabels
      .append("text")
      .attr("x", 0)
      .attr("y", y(1) / 10 / 2)
      .attr("dy", ".82em")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-60)")
      .text(function (d: any, i) {
        return d;
      });

    let rowLabels = labels
      .selectAll(".row-label")
      .data(labelsData)
      .enter()
      .append("g")
      .attr("class", "row-label")
      .attr("transform", function (d, i: any) {
        return "translate(" + 0 + "," + i * (width / numcols) + ")";
      });

    rowLabels
      .append("line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .attr("x1", 0)
      .attr("x2", -5)
      .attr("y1", y(1) / 10 / 2)
      .attr("y2", y(1) / 10 / 2);

    rowLabels
      .append("text")
      .attr("x", -8)
      .attr("y", y(1) / 10 / 2)

      .attr("dy", ".32em")
      .attr("text-anchor", "end")
      .text(function (d: any, i) {
        return d;
      });

    let key = d3
      .select("#legend")
      .append("svg")
      .attr("width", widthLegend)
      .attr("height", height + margin.top + margin.bottom);

    let legend = key
      .append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "100%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    legend
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", endColor)
      .attr("stop-opacity", 1);

    legend
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", startColor)
      .attr("stop-opacity", 1);

    key
      .append("rect")
      .attr("width", widthLegend / 2 - 10)
      .attr("height", height)
      .style("fill", "url(#gradient)")
      .attr("transform", "translate(0," + margin.top + ")");

    let a = d3
      .scaleLinear()
      .range([height, 0])
      .domain([Number(minValue), Number(maxValue)]);

    // var yAxis = d3.svg.axis().scale(y).orient("right");
    let yAxis = d3.axisRight(a);
    key
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(41," + margin.top + ")")
      .call(yAxis);
  }

  ngOnInit() {
    new Promise((resolve) => {
      this._jsonDataService.getCorrelationChartData().subscribe((res) => {
        //this.labels = _.map(res, "name");
        //this.options.labels = this.labels;
        let matrixs = [];
        matrixs = res.map((value) => {
          return value.series.map((s) => s.value);
        });
        for (let matrix of matrixs) {
          //this.correlationMatrix.push(matrix);
        }
        console.log(this.correlationMatrix);
        resolve();
      });
    }).then(() => {
      this.Matrix(this.options);
    });
  }
}
