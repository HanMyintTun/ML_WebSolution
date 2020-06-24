import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { AppComponent } from "./app.component";
import { MainContainerComponent } from "./main-container/main-container.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule, routingComponents } from "./app-routing.module";
import { HeaderComponent } from "./header/header.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { DataUploadComponent } from "./data-upload/data-upload.component";
import { CsvModalComponent } from "./modals/csv-modal/csv-modal.component";
import { from } from "rxjs";
import { JsondataService } from "./_services/jsondata.service";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HorizontalBarChartComponent } from './charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { VerticalBarChartsComponent } from './charts/vertical-bar-charts/vertical-bar-charts.component';
import { DataTableComponent } from './data-table/data-table.component';
import { BoxPlotComponent } from './charts/box-plot/box-plot.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { CorrelationChartComponent } from './charts/correlation-chart/correlation-chart.component';
import { DynamicDashboardComponent } from './dynamic-dashboard/dynamic-dashboard.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { AppRoutingModule, routingComponents } from './app-routing.module';
@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    MainContainerComponent,
    HeaderComponent,
    NavbarComponent,
    DataUploadComponent,
    CsvModalComponent,
    HorizontalBarChartComponent,
    VerticalBarChartsComponent,
    DataTableComponent,
    BoxPlotComponent,
    CorrelationChartComponent,
    DynamicDashboardComponent,
  ],
  entryComponents: [CsvModalComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgxDatatableModule,
    NgxChartsModule,
    NgxEchartsModule,
    DragDropModule
  ],
  providers: [JsondataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
