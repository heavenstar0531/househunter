import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccService } from 'src/app/services/acc/acc.service';
import { AccRegisterData } from 'src/app/common/requests/acc.data';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.sass']
})
export class RegisterModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  templateRef: TemplateRef<any>|null = null;
  data: AccRegisterData = new AccRegisterData();

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

  register(): void {
    this.accService.register( this.data );
  }

  reset(): void {
    this.data = new AccRegisterData();
  }
}
