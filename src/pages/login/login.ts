import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeStorage } from '@ionic-native/native-storage';
import { Network } from '@ionic-native/network';

import { HomePage } from '../home/home'


@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  private login_form : FormGroup;
  public home_page: any = HomePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public http: Http,
              private barcodeScanner: BarcodeScanner,
              private nativeStorage: NativeStorage,
              private network: Network)
  {
    this.login_form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  capture_bidi(event) {
    this.barcodeScanner.scan().then((barcodeData) => {
     // Success! Barcode data is here
     console.log(barcodeData.text)
    }, (err) => {
        // An error occurred
    });
  }

  do_login() {

    /*
    let link: string = "http://127.0.0.1:8100/do-login",
        data: any = JSON.stringify(this.login_form.value),
        type: string = "application/json; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers })


    this.http.post(link, data, options)
    .subscribe(data =>
    {
      if(data.status === 200) {
        console.log("200");
      }
      else {
        console.log("NO OK");
      }
    });
    */

    this.nativeStorage.setItem('logged', {value: true})
      .then(
        () => this.navCtrl.push(this.home_page),
        error => console.error('Error storing item', error)
      );
  }

  ionViewWillEnter() {
    this.nativeStorage.getItem('logged')
      .then(
        (data) => {
          if (data['value'] === true){
            this.navCtrl.push(this.home_page);
          };
        },
        (error) => {
          console.error(error);
        }
      );
  }

ionViewCanLeave() {
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
