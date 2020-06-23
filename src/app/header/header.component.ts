import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggle = true;
  loginStaffName;
  constructor() { }

  ngOnInit() {
  }
  toggleLeft(){
    let nav = new NavbarComponent();
    if(this.toggle){
      nav.toggleLeft(this.toggle);
      this.toggle = false;
    }
    else{
      nav.toggleLeft(this.toggle);
      this.toggle = true;
    }
  } 
}
