import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Status } from 'src/app/common/types';
import { PropertyBuyFormComponent } from '../../forms/property-buy-form/property-buy-form.component';

@Component({
  selector: 'app-property-buy-modal',
  templateUrl: './property-buy-modal.component.html',
  styleUrls: ['./property-buy-modal.component.sass']
})
export class PropertyBuyModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  template_ref: null|TemplateRef<NgbModal> = null;
  modal_ref: null|NgbModalRef = null;

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

  async makePurchaseOffer( form_ref : PropertyBuyFormComponent ) {
    let status = await form_ref.makePurchaseOffer();
    if( status.getStatus() == Status.SUCCESS ) this.close();
  }
}
