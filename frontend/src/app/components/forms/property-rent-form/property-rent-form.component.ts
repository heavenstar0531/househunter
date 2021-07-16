import { Component, Input, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import ObjectId from 'bson-objectid';
import { Status } from 'src/app/common/types';
import { PropService } from 'src/app/services/prop/prop.service';

@Component({
  selector: 'app-property-rent-form',
  templateUrl: './property-rent-form.component.html',
  styleUrls: ['./property-rent-form.component.sass']
})
export class PropertyRentFormComponent implements OnInit {
  @Input( "prop_id" )
  prop_id: ObjectId = new ObjectId();
  status: Status = new Status();
  from_dt: NgbDateStruct = this.ngbCalendar.getToday();
  to_dt: NgbDateStruct = this.ngbCalendar.getToday();

  constructor(
    private propService: PropService,
    private ngbCalendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.reset();
  }

  async rent(): Promise<[ Status, number?/*cost*/ ]> {
    let from_dt = new Date( this.from_dt.year, this.from_dt.month, this.from_dt.day );
    let to_dt   = new Date( this.to_dt.year,   this.to_dt.month,   this.to_dt.day );
    
    let [ status, cost ] = await this.propService.rent( this.prop_id, from_dt, to_dt );
    this.status = status;

    return [ status, cost ];
  }

  reset(): void {
    this.status = new Status();
    this.from_dt = this.ngbCalendar.getToday();
    this.to_dt = this.ngbCalendar.getNext( this.ngbCalendar.getToday() );
  }
}
