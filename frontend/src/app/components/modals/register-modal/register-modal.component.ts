import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import ObjectId from 'bson-objectid';
import { AccData } from 'src/app/common/requests/acc.data';
import { Status } from 'src/app/common/types';
import { AccService } from 'src/app/services/acc/acc.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.sass']
})
export class RegisterModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  templateRef: null|TemplateRef<any> = null;
  status: Status = new Status();
  acc: AccData = new AccData();
  modal: null|NgbModalRef = null;


  constructor(
    private modalService: NgbModal,
    private accService: AccService,
  ) { }

  ngOnInit(): void {
    this.reset();
  }

  init( modal: NgbModalRef ): void {
    this.modal = modal;
  }

  open(): void {
    this.modalService.open( this.templateRef ).result.then( _ => this.reset(), _ => this.reset() );
  }

  close(): void {
    this.modal?.dismiss();
    this.reset();
  }

  reset() {
    this.status = new Status();
    this.acc = new AccData();

 // this.acc._id;
    this.acc.username = "";
    this.acc.password = "";
    this.acc.firstname = "";
    this.acc.lastname = "";
    this.acc.email = "";
    // ----------------
    this.acc.usr_photo_id = null;
    this.acc.usr_addr_country = "";
    this.acc.usr_addr_city = "";
    // ----------------
    this.acc.acc_type = "usr";
    this.acc.activated_dt = null;
    this.acc.deleted_dt = null;
    this.acc.usr_blocked_ids = new Array<ObjectId>();
  }
  
  async register() {
    let [ status, acc_id ] = await this.accService.add( this.acc );
    this.status = status;
    this.acc._id = acc_id;
  }
}
