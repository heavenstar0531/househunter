import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccRegisterData } from 'src/app/objects/acc';
import { AccService } from 'src/app/services/acc/acc.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
  data: AccRegisterData = new AccRegisterData();

  constructor(
    private modalService: NgbModal,
    private accService: AccService,
  ) { }

  ngOnInit(): void {
  }

  openModal( modal: any ): void {
    this.modalService.open( modal ).result.then( _ => this.resetData(), _ => this.resetData() );
  }

  closeModal( modal: any ): void {
    modal.dismiss();
    this.data = new AccRegisterData();
  }

  resetData(): void {}

  register(): void {
    this.accService.register( this.data );
  }
}
