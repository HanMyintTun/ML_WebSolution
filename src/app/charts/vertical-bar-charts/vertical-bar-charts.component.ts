import { Component, OnInit } from "@angular/core";
import { JsondataService } from "../../_services/jsondata.service";
@Component({
  selector: "app-vertical-bar-charts",
  templateUrl: "./vertical-bar-charts.component.html",
  styleUrls: ["./vertical-bar-charts.component.css"]
})
export class VerticalBarChartsComponent implements OnInit {
  multi: any[];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = false;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Normalized Population';
  barPadding = 50;
  colorScheme = "vivid"
  view: any[] = [310, 310];
  constructor(private _jsonDataService: JsondataService) {}

  ngOnInit() {
    let dataset = this._jsonDataService.uploadedDataset
    this.getData(dataset);
  }
  getData(dataset) {

    this._jsonDataService.getNumericalData(dataset).subscribe(data=>{
      console.log(data);
      this.multi = data;
    })


    // this._jsonDataService.getVerticalBarChartsData().subscribe(data => {
    //   console.log(data);
    //   this.multi = data;
    // });
  }
}
