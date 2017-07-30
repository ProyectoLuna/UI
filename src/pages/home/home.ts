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
  zones: any;

  constructor(public navCtrl: NavController,
              private nativeStorage: NativeStorage,
              public http: Http)
  {

    this.check_gateways();
    this.check_zones();
  }

  check_zones() {

    var items = [];

    var link = "https://192.168.10.13:8080/check_zones";

    let type: string = "application/json; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers })

    this.http.get(link, options)
      .map(res => res.json())
      .subscribe(data => {
    		for(let i = 0; i < data.length; i++) {
          console.log(data)
    		  items.push({
            name: data[i]["zone_name"],
      			subscriptor_name: data[i]["name"],
            subscriptor_type: data[i]["type"],
            gateway: data[i]["parent"]
    		  });
    		}
      this.zones = items;
    });
  }

  check_gateways() {

    var items = [];

    var link = "https://192.168.10.13:8080/check_gateway";

    let type: string = "application/json; charset=UTF-8",
        headers: any = new Headers({ 'Content-Type': type}),
        options: any = new RequestOptions({ headers: headers })

    this.http.get(link, options)
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
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
