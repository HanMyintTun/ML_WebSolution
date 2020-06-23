import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-csv-modal',
  templateUrl: './csv-modal.component.html',
  styleUrls: ['./csv-modal.component.css']
})
export class CsvModalComponent {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  

}
