import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Status } from 'src/app/common/types';
import { AccountFormComponent } from '../../forms/account-form/account-form.component';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.sass']
})
export class RegisterModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  template_ref: null|TemplateRef<NgbModal> = null;
  modal_ref: null|NgbModalRef = null;
  @ViewChild( AccountFormComponent )
  form_ref: null|AccountFormComponent = null;

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

  async register() {
    if( !this.form_ref ) return;
    let [ status, _ ] = await this.form_ref.register();
    if( status.getStatus() == Status.SUCCESS ) this.close();
  }
}
