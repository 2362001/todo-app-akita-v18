import { CommonModule, DecimalPipe } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslatePoHttpLoader } from '@fjnr/ngx-translate-po-http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { environments } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanActivateService } from './auth/can-activate.service';
import { CanActivateLoginService } from './auth/can-active-login.service';
import { HttpInterceptorService } from './auth/httpInterceptor.service';
import { UpdateUserInfoService } from './auth/update-user-info';
import { localStorageKey } from './share/defines';
import { ShareModule } from './share/share.module';
import Utils from './share/utils';

export function createTranslateLoader(http: HttpClient) {
  return new TranslatePoHttpLoader(http, 'assets/i18n', '.po');
}

export function initializeApp( http: HttpClient): () => Promise<any> {
  return () => new Promise(async (resolve, reject) => {
    const configData:any = await http.get("./assets/config.json").toPromise();
    environments.domain = configData?.domain;
    environments.ddos_domain = configData?.ddos_domain;
    environments.domainPage = configData?.domainPage;
    environments.googleLink = configData?.googleLink;
    environments.production = configData?.production;
    environments.domainToolkit = configData?.domainToolkit;
    const browserActive = Utils.getCookie('browserActive');
    if (!browserActive) {
      localStorage.removeItem(localStorageKey.TOKEN);
      localStorage.removeItem(localStorageKey.USER_INFO);
      localStorage.removeItem('currentURl');
    }
    document.cookie = `${'browserActive'}=${'active'};expires=0;path=/`;
    console.log('initApp');
    resolve(true);
  })
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShareModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot(),
  ],
  providers: [    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    CanActivateService,
    CanActivateLoginService,
    DecimalPipe,
    UpdateUserInfoService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [HttpClient],
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { 

}
