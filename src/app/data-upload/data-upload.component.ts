import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CsvModalComponent } from "../modals/csv-modal/csv-modal.component";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader"; // Import NgxUiLoaderService
import { Observable, observable} from 'rxjs';
import { JsondataService } from '../_services/jsondata.service';
import { ColumnMode, SelectionType }  from '@swimlane/ngx-datatable';
import { Papa } from "ngx-papaparse";
import {ViewChild, ElementRef} from '@angular/core';
import {Router} from "@angular/router";
declare var $: any;
@Component({
  selector: "app-data-upload",
  templateUrl: "./data-upload.component.html",
  styleUrls: ["./data-upload.component.css"]
})
export class DataUploadComponent implements OnInit {

  rows = [];
  columns = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  listOfLoads = [];
  csvHeader: any;
  csvData: any;
   
  constructor(
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private ngxService: NgxUiLoaderService,
    private _jsonDataService: JsondataService,
    private papa: Papa,
    private router: Router
  ) {}

  openCSVModal() {
    const modalRef = this.modalService.open(CsvModalComponent);
  }
  
  handleCsvUpload($event){
    this.ngxService.start();
    new Promise(resolve => {
      this.papa.parse($event.target.files[0], {
        header: true,
        complete: result => {
          console.log(result.data)
          result.data.splice(-1,1);
          //this.csvHeader = result.data.splice(0,1)[0];
          console.log(this.csvHeader)
          this.csvData = result.data;
          console.log(this.csvData)
          this._jsonDataService.csvHeader = this.csvHeader;
          this._jsonDataService.csvData = this.csvData;
          resolve();
        }
      })
        this.ngxService.stop();
    }).then(()=>{
      $("#csvModal").modal("hide");
      this.toastrService.success("Success", "CSV uploaded successfully", { timeOut: 2000 });
      this.router.navigate(['/DataTable']);
    });
    
  }

  parseCsvFile(file) {
    Observable.create(
      observable=>{
        this.papa.parse(file, {
        download: true,
        complete: function (results) {
          observable.next(results);
         
        	observable.complete();
        }
      });
    }).subscribe(resultValue=>{
     
      this.listOfLoads=resultValue.data;
      console.log('result'+this.listOfLoads[0]);
      //this.triggerFunc();
    });
    // this.papa.parse(file, {
    //   header: true,
    //   dynamicTyping: true,
    //   skipEmptyLines: 'greedy',
    //   worker: true,
    //   chunk: this.papaParseChunk,
    //   complete: function (results){
    //     console.log(JSON.stringify(results))
    //   }
    // });
  }


  CsvUpload(fileInput:Element) {
    this.ngxService.start();
    var csvData = fileInput;
    console.log(csvData);
    this.parseCsvFile(csvData);
    new Promise(resolve => {
      setTimeout(() => {
        this.ngxService.stop();
        resolve();
      }, 2000);
   
    }).then(()=>{
      this.toastrService.success("Success", "CSV uploaded successfully", { timeOut: 2000 });
    });
  }

  getUploadedDataset(){
    this._jsonDataService.getUploadedDataSet().subscribe(data =>{
      console.log(data);
      this.rows = data;
      this.populateColumns(data);
    })
  }

  populateColumns(data){
    var element = Object.keys(data[0]);
    this.columns = element;
    // element.forEach((res)=>{
    //   this.columns.push(res.toUpperCase());
     
    // })
    console.log(this.columns)
  }
  // handleUpload($event: any) {
  //   $event.srcElement
  //   const fileList = $event.srcElement.files;
  //   this.parseCsvFile(fileList[0]);
  // }
  ngOnInit() {
    this.getUploadedDataset();
  }
}
