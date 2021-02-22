import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  openModal( content: any ) {
    this.modalService.open( content );
  }

  register() {
    
  }
}
