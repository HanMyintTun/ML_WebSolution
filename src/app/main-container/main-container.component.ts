import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-main-container",
  templateUrl: "./main-container.component.html",
  styleUrls: ["./main-container.component.css"]
})
export class MainContainerComponent implements OnInit {
  public href: string = "";
  constructor(public router: Router) {}

  ngOnInit() {
    this.href = this.router.url;
  }
}
