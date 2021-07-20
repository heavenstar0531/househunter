import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AccData } from 'src/app/common/requests/acc.data';
import { Status } from 'src/app/common/types';
import { AccountFormComponent } from '../../forms/account-form/account-form.component';

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.sass']
})
export class AccountModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  template_ref: null|TemplateRef<NgbModal> = null;
  modal_ref: null|NgbModalRef = null;
  @Input( "acc_old" )
  acc_old: AccData = new AccData();   // read only

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  open(): void {
    this.modal_ref = this.modalService.open( this.template_ref );
  }

  close(): void {
    this.modal_ref?.close();
  }

  async register( form_ref: AccountFormComponent ) {
    let [ status, acc ] = await form_ref.register();
    if( status.getStatus() == Status.SUCCESS ) this.close();
  }

  async update( form_ref: AccountFormComponent ) {
    let status = await form_ref.update();
    if( status.getStatus() == Status.SUCCESS ) this.close();
  }
}
