import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';   // za lokalizaciju aplikacije

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(
    public translate: TranslateService,
  ) { }


  ngOnInit(): void {
    this.translate.setDefaultLang( 'sr' );
  }
}
