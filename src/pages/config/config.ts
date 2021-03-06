import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@IonicPage()

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})

export class ConfigPage {

  gateways: any;
  subscriptors: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
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
