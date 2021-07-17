import { Component, OnInit } from '@angular/core';
import { AccountFormComponent } from '../../forms/account-form/account-form.component';

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.sass']
})
export class MyAccountPageComponent implements OnInit {
  constructor( ) { }

  ngOnInit(): void {
  }

  async reset( form_ref: AccountFormComponent ) {
    form_ref.reset();
  }

  async update( form_ref: AccountFormComponent ) {
    let status = await form_ref.update();
  }

}
