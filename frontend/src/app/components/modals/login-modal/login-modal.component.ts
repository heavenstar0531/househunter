import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Status } from 'src/app/common/types';
import { AccService } from 'src/app/services/acc/acc.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.sass']
})
export class LoginModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  templateRef: null|TemplateRef<any> = null;
  status: Status = new Status();
  username: string = "";
  password: string = "";
  @ViewChild( NgbModalRef )
  modal: null|NgbModalRef = null;

  constructor(
    private modalService: NgbModal,
    private accService: AccService,
  ) { }

  ngOnInit(): void {
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
    this.username = "";
    this.password = "";
  }

  async login() {
    let [ status, _ ] = await this.accService.login( this.username, this.password );
    this.status = status;
    if( this.status.getStatus() == Status.SUCCESS ) this.close();
  }
}
