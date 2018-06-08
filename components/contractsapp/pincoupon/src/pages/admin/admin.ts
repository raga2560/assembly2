import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Vendor } from '../../providers/vendor';



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
  loading: any;

 constructor(public navCtrl: NavController, public vendorService: Vendor,
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
     this.vendor = this.navParams.data.vendor;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CouponIssuePage');
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }





   
  
  selectVendor() {
    this.navCtrl.push('VendorsPage' );
  }
  showRelations() {
    this.navCtrl.push('RelationPage' );
  }

  activateVendor(vendor){

    this.showLoader();

    var pauseactivate = {
        activate : true,
        pause: false,
        vendorid : 1
    };

    this.vendorService.vendorPauseActivate(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
  
  pauseVendor(vendor){

    this.showLoader();

    var pauseactivate = {
        activate : false,
        pause: true,
        vendorid : 1
    };

    this.vendorService.vendorPauseActivate(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }



}
