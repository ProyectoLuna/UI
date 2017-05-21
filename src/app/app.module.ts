import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';

import { NetworkInfo} from '../providers/network/info'

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from '../pages/config/config';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ConfigPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    NativeStorage,
    Network,
    NetworkInfo,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
