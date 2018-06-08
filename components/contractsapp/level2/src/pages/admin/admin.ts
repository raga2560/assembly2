import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  vendor: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
     this.vendor = this.navParams.data.vendor;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }
  
  selectVendor() {
    this.navCtrl.push('VendorsPage' );
  }

}
