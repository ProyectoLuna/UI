import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})

export class ConfigPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private nativeStorage: NativeStorage)
  {

  }

  ionViewCanEnter() {
    this.nativeStorage.getItem('logged_in')
      .then(
        (data) => {
          if (data['value'] == true) {
            return true;
          } else {
            return false;
          }
        },
        (error) => {
          console.error(error);
          return false;
        }
      );
  }

}
