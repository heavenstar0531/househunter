import { Component, Input, OnInit } from '@angular/core';
import ObjectId from 'bson-objectid';
import { Status } from 'src/app/common/types';
import { PropService } from 'src/app/services/prop/prop.service';

@Component({
  selector: 'app-property-buy-form',
  templateUrl: './property-buy-form.component.html',
  styleUrls: ['./property-buy-form.component.sass']
})
export class PropertyBuyFormComponent implements OnInit {
  @Input( "prop_id" )
  prop_id: ObjectId = new ObjectId();
  status: Status = new Status();
  offered_amount: string = "";
  on_credit: boolean = false;
  credit_participation: number = 0;


  constructor(
    private propService: PropService,
  ) { }

  ngOnInit(): void {
    this.reset();
  }

  async makePurchaseOffer(): Promise<Status> {
    let offered_amount = Number.parseInt( this.offered_amount ) ?? -1;
    let status = await this.propService.makePurchaseOffer( this.prop_id, offered_amount );
    
    this.status = status;
    return status;
  }

  reset(): void {
    this.status = new Status();
    this.offered_amount = "";
    this.on_credit = false;
    this.credit_participation = 0;
  }
}
