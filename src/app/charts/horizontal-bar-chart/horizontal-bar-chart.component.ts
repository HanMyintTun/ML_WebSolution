import { Component, OnInit } from '@angular/core';
import { JsondataService } from '../../_services/jsondata.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { element } from 'protractor';
@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css']
})
export class HorizontalBarChartComponent implements OnInit {
  multi = [];
  constructor(private _jsonDataService: JsondataService) { }
  view: any[] = [310, 310];
  dataset: any[];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Count';
  colorScheme = "vivid"
   
  ngOnInit() {
    this.getData()
   
  }
  getDatasets(dataset){
    console.log(dataset)
    this._jsonDataService.getDatasets(dataset).subscribe(data =>{
      this.dataset = data;
      
      for(let i = 0; i < this.dataset.length; i++){
        let seriesObj = [];
         let seriesName = this.dataset[i].series.name;
         let seriesVale = this.dataset[i].series.value;
        console.log(seriesVale.length)
         for(let j = 0; j < seriesName.length; j++){
           let obj = {"name" : seriesName[j], "value": seriesVale[j]}
           seriesObj.push(obj)
            
         }
         console.log(seriesObj);
         let dataObj = {"name": this.dataset[i].name, "series": seriesObj}  
       
         this.multi.push(dataObj)
      
      }
     
     
    })
    
  }
  getData(){
    // this._jsonDataService.getHorizontalBarChartData().subscribe(data =>{
    //   //console.log(data);
    //   this.multi = data;
    //   this.getDatasets(this.multi)
    // })
    this.getDatasets(this._jsonDataService.uploadedDataset);
  }

  onSelect(event) {
    console.log(event);
  }
  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
