import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { LoginPage } from '../login/login'
import { ConfigPage} from '../config/config';


@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  login_page:any = LoginPage;
  config_page:any = ConfigPage;

  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage)
  {

  }

    do_logout() {
      this.nativeStorage.setItem('logged', {value: false})
        .then(
          () => {
            this.navCtrl.push(this.login_page);
          },
          (error) => {
            console.error('Error storing item', error);
          }
        );
    }

    ionViewCanEnter() {
      this.nativeStorage.getItem('logged')
        .then(
          (data) => {
            return data['value'];
          },
          (error) => {
            console.error(error);
            return false;
          }
        );
    }
}
