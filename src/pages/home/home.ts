import { Component } from '@angular/core';

import { IonicPage, NavController } from 'ionic-angular';
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

    gateways: any;
    subscriptors: any;


  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage,
              public http: Http)
  {
    this.check_gateway();
    this.check_subscriptors();
  }

  check_subscriptors() {

    var items = [];

    var link = "https://jauriarts.org:8080/check_subscriptors";

    let type: string = "application/json; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers })

    this.http.get(link, options)
    .map(res => res.json())
    .subscribe(data => {
  		for(let i = 0; i < data.length; i++) {
  		  items.push({
  		    id: data[i]["id"],
    			name: data[i]["name"],
          type: data[i]["type"]
  		  });
  		}
      this.subscriptors = items;
    });
  }

  check_gateway() {

    var items = [];

    var link = "https://jauriarts.org:8080/check_gateway";

    let type: string = "application/json; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers })

    this.http.get(link, options)
    .map(res => res.json())
    .subscribe(data => {
  		for(let i = 0; i < data.length; i++) {
  		  items.push({
  		    id: data[i]["id"],
    			name: data[i]["name"]
  		  });
  		}
      this.gateways = items;
      console.log(this.gateways[0].name)
    });
  }

  do_toggle(id){
    console.log(id)
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
