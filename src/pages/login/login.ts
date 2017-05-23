import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';

import {Md5} from 'ts-md5/dist/md5';

import { NetworkInfo} from '../../providers/network/info'

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomePage } from '../home/home'


@IonicPage()

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  private salt = "salamiYork";

  private login_form : FormGroup;
  public home_page: any = HomePage;

  link_type: any = "Conectando...";
  link_timer: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public http: Http,
              private barcodeScanner: BarcodeScanner,
              private nativeStorage: NativeStorage,
              public network_info: NetworkInfo)
  {
    this.login_form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

    var self = this;

    this.link_timer = setInterval(function() {
      self.network_info.get_type().then(result => {
        self.link_type = result;
      });
    },1000);

  }

  do_login() {

    var link = "https://jauriarts.org:8080/auth";

    var user = this.login_form.value.user;
    var pass = this.login_form.value.password;

    var cipher_pass  = Md5.hashStr(pass + this.salt);
    var credentials = {'user': user, 'pass': cipher_pass};

    var data = JSON.stringify(credentials);

    let type: string = "application/json; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers })

    this.http.post(link, data, options)
      .map(res => res.json())
      .subscribe(
        (data) => {
          if (data.auth === true) {
            this.nativeStorage.setItem('logged', {value: true})
              .then(
                () => this.navCtrl.push(this.home_page),
                error => console.error('Error storing item', error)
              );
          }
        },
        (error) => {
          console.log("TROLL");
          console.log(error);
        }
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

  ionViewDidLeave(){
    clearInterval(this.link_timer);
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
