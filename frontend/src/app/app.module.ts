// default moduli i komponente
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// two way data binding za forme, http client, bootstrap i translate moduli
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// dodate komponente
import { AppComponent } from './components/app/app.component';

// ova funkcija mora da bude eksportovana da bi mogla biti koriscena od strane translate modula kao generator translate loader-a
export function HttpLoaderFactory( http: HttpClient )
{
  return new TranslateHttpLoader( http );
}

@NgModule({
  declarations: [
    AppComponent,
    // dodate komponente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // dodati moduli
    FormsModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient] },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
