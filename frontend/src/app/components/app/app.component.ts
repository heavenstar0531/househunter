import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';   // za lokalizaciju aplikacije

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: 'app';

  constructor( translate: TranslateService )
  {
    // podesavanje default jezika aplikacije
    translate.setDefaultLang( 'sr' );
  }
}
