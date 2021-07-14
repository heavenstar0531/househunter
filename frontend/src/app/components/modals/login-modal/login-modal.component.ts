import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccService } from 'src/app/services/acc/acc.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.sass']
})
export class LoginModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  templateRef: TemplateRef<any>|null = null;
//data: AccLoginData = new AccLoginData();

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

  login(): void {
  //this.accService.login( this.data );
  }

  reset(): void {
  //this.data = new AccLoginData();
  }
}
