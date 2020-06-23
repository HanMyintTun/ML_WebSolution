import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  toggleLeft(toggleValue){
    let shand = document.getElementById("main-wrapper");
    
    if(toggleValue){
      if(shand.classList.contains("sidebar-mini"))
        shand.className.replace("sidebar-mini","sidebar-opened");
      else
        shand.classList.add("sidebar-mini");
    }
    else{
      if(shand.classList.contains("sidebar-mini")){ 
          shand.classList.remove("sidebar-mini");
          shand.classList.add("sidebar-opened");
        }
      else{
        shand.classList.add("sidebar-opened");
      }
    }
  }
}
