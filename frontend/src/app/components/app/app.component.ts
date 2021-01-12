import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';   // za lokalizaciju aplikacije

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  param: { name: 'Mare' };

  constructor( translate: TranslateService )
  {
    // podesavanje default jezika i trenutnog jezika aplikacije
    translate.setDefaultLang( 'sr' );
  }
}
