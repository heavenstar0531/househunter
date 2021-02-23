import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccRegisterData } from 'src/app/objects/acc';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  data: AccRegisterData = new AccRegisterData();

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  openModal( content: any ): void {
    this.modalService.open( content );
  }

  register(): void {
    
  }
}
