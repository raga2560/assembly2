import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Vendor } from '../../providers/vendor';


/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendors',
  templateUrl: 'vendors.html',
})
export class VendorsPage {

  loading: any;
  vendors: any;

  constructor(public navCtrl: NavController,  public vendorService: Vendor, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
  }

  ionViewDidLoad(){

    this.vendorService.getVendors().then((data) => {
                  this.vendors = data;
    }, (err) => {
        console.log("not allowed");
    });

  }
  
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }

  selectVendor(vendor) {
    this.navCtrl.push('AdminPage', { vendor: vendor });
  }

  adminVendor(vendor) {
    this.navCtrl.push('AdminPage', { vendor: vendor });
  }


}
