import { Component, OnInit, Input } from "@angular/core";
import { JsondataService } from "../_services/jsondata.service";
import { ColumnMode, SelectionType } from "@swimlane/ngx-datatable";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"],
})
export class DataTableComponent implements OnInit {
  csvHeader: any[];
  csvData: any;
  //ngx datatable
  keys = [];
  obj = {};
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  constructor(
    private _jsonDataService: JsondataService,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService
  ) {}

  getRowClass() {
    //this.csvHeader = ["a","b"]
    //  if(this.csvHeader !== null){
    //   this.csvHeader.forEach(element => {
    //     console.log(element)
    //     // if(value.element === 0 || value.element == null || value.element === " "){
    //     //   console.log(value.element);
    //     //   return 'null-value-cell';
    //     // }
    //     });
    //  }
  }
  getCellClass({ row, column, value }): any {
    // console.log(value);
    if (value == null || value === "") {
      // console.log(value);
      return " null-value-cell";
    }
  }

  SubmitDataset() {
    this.ngxService.start();
    new Promise(resolve => {
      this._jsonDataService.uploadedDataset = this.csvData;
      resolve();
      this.ngxService.stop();
    }).then(()=>{
      this.toastrService.success("Submitted", "Dataset submitted successfully", { timeOut: 2000 });
      //this.router.navigate(['/DataTable']);
    })
   
  }
  ngOnInit() {
    this.csvData = this._jsonDataService.csvData;
    if (this.csvData != null) {
      this.csvHeader = Object.keys(this.csvData[0]);
    }
  }
}
