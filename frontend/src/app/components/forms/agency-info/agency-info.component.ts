import { Component, OnInit } from '@angular/core';
import { AgncyData } from 'src/app/common/requests/agncy.data';
import { Status } from 'src/app/common/types';
import { AgncyService } from 'src/app/services/agncy/agncy.service';

@Component({
  selector: 'app-agency-info',
  templateUrl: './agency-info.component.html',
  styleUrls: ['./agency-info.component.sass']
})
export class AgencyInfoComponent implements OnInit {
  status: Status = new Status();
  agncy: AgncyData = new AgncyData();
  agncy_old: AgncyData = new AgncyData();

  constructor(
    private agncyService: AgncyService,
  ) { }

  ngOnInit(): void {
    this.agncyService.get().then( ( res ) => {
      let status = res[ 0 ];
      let agncy  = res[ 1 ];

      this.status = status;
      if( !agncy ) return;
      this.agncy_old = agncy;
      this.agncy = Object.assign( this.agncy, this.agncy_old );
    } );
  }

  async update() {
    let status = await this.agncyService.update( this.agncy );
    this.status = status;

    if( this.status.getStatus() != Status.SUCCESS ) return;
    this.agncy_old = Object.assign( this.agncy_old, this.agncy );
  }

  async reset() {
    this.status = new Status();
    this.agncy = Object.assign( new AgncyData(), this.agncy_old );
  }
}
