import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DataUploadComponent } from './data-upload/data-upload.component'
import { HorizontalBarChartComponent } from './charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { VerticalBarChartsComponent } from './charts/vertical-bar-charts/vertical-bar-charts.component';
import { DataTableComponent } from './data-table/data-table.component';
import { BoxPlotComponent } from './charts/box-plot/box-plot.component';
import { CorrelationChartComponent } from './charts/correlation-chart/correlation-chart.component';
const routes: Routes = [

    {path: '', component: DataUploadComponent},
    {path: 'DataUpload', component: DataUploadComponent }, 
    {path: 'HorizontalBarChart', component: HorizontalBarChartComponent }, 
    {path: 'VerticalBarChart', component: VerticalBarChartsComponent }, 
    {path: 'DataTable', component:DataTableComponent},
    {path: 'BoxPlot',component:BoxPlotComponent},
    {path: 'CorrelationChart',component:CorrelationChartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [DataUploadComponent]