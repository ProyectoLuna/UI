import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

@Injectable()
export class NetworkInfo {

  constructor(private network: Network) {
  }

  get_type(){
      return Promise.resolve(this.network.type);
  };
}
