import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccData } from 'src/app/common/requests/acc.data';
import { Status } from 'src/app/common/types';
import { AccService } from 'src/app/services/acc/acc.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.sass']
})
export class LoginModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  templateRef: TemplateRef<any>|null = null;
  status: Status = new Status();
  username: string = "";
  password: string = "";

  constructor(
    private modalService: NgbModal,
    private accService: AccService,
  ) { }

  ngOnInit(): void {
  }

  open(): void {
    this.modalService.open( this.templateRef ).result.then( _ => this.reset(), _ => this.reset() );
  }

  close( modal: any ): void {
    modal.dismiss();
    this.reset();
  }

  async login() {
    this.accService.login( this.username, this.password );
  }

  async reset() {
    this.status = new Status();
    this.username = "";
    this.password = "";
  }
}
