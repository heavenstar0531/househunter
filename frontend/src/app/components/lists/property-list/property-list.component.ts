import { Component, OnInit } from '@angular/core';
import { Criteria, Status } from 'src/app/common/types';
import { PropService } from 'src/app/services/prop/prop.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.sass']
})
export class PropertyListComponent implements OnInit {
  status:       Status   = new Status();
  criteria:     Criteria = new Criteria();
  city:         string  = "";
  price_min:    string  = "";
  price_max:    string  = "";
  promoted:     boolean = true;
  unverified:   boolean = false;
  owned:        boolean = false;
  agency_owned: boolean = false;
  sold:         boolean = false;

  
  constructor(
    private propService: PropService,
  ) { }

  ngOnInit(): void {
    
  }

  async search() {

  }

  async reset() {
    
  }

  async add() {

  }

  async addMany() {
    
  }

}
