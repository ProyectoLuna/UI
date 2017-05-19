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
