import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: "root"
})
export class JsondataService {
  baseAPI: string = environment.baseAPI;
  csvHeader: any;
  csvData: any;
  uploadedDataset: any;
  constructor(private http: HttpClient) {}

  getUploadedDataSet(): Observable<any> {
    return this.http.get("../../assets/data/uploaded-dataset.json");
  }

  getHorizontalBarChartData(): Observable<any> {
    return this.http.get("../../assets/data/horizontalbarchartdata.json");
  }
  getVerticalBarChartsData(): Observable<any> {
    return this.http.get("../../assets/data/verticalbarchartdata.json");
  }
  getCorrelationChartData(): Observable<any>{
    return this.http.get("../../assets/data/correlationchat-data.json")
  }
  getDatasets(dataset): Observable<any> {
    return this.http.post(this.baseAPI + 'GetCategoricalDataset',dataset);    
  }

  getNumericalData(dataset): Observable<any> {
    return this.http.post(this.baseAPI + 'GetNumericalDataset',dataset);    
  }

}
