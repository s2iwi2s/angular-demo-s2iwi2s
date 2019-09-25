import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  modalType = 'Alert';
  modalMsg = 'This is the message';
  constructor() { }

  ngOnInit() {
    $('#alertModalDialog').modal('show');
  }

}