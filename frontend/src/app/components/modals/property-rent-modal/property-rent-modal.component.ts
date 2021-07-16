import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Status } from 'src/app/common/types';
import { PropertyRentFormComponent } from '../../forms/property-rent-form/property-rent-form.component';

@Component({
  selector: 'app-property-rent-modal',
  templateUrl: './property-rent-modal.component.html',
  styleUrls: ['./property-rent-modal.component.sass']
})
export class PropertyRentModalComponent implements OnInit {
  @ViewChild( TemplateRef )
  template_ref: null|TemplateRef<NgbModal> = null;
  modal_ref: null|NgbModalRef = null;
  @ViewChild( PropertyRentFormComponent )
  form_ref: null|PropertyRentFormComponent = null;

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

  async rent() {
    if( !this.form_ref ) return;
    let [ status, cost ] = await this.form_ref.rent();
    if( status.getStatus() == Status.SUCCESS ) this.close();
  }
}
