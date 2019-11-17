import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { TabsPageModule } from './tabs/tabs.module';

const firebaseConfig = {
  /* ici vous renseigner les paramtres d'API gOOGLE */
  
};

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TabsPageModule
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [
    AppComponent
    //LoginPage
  ]
})
export class AppModule {
  //rootPage: any = LoginPage;
}
