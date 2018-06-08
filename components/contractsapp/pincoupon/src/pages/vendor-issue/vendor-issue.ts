import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Vendor } from '../../providers/vendor';

/**
 * Generated class for the CouponIssuePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor-issue',
  templateUrl: 'vendor-issue.html',
})
export class VendorIssuePage {

  vendors: any;
  vendor: any;
  loading: any;

  constructor(public navCtrl: NavController, public vendorService: Vendor, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
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
  
  vendorCreate() {
    this.showLoader();

   var vendordata = {
	name: 'test'
   };
   this.vendorService.createVendor(vendordata).then((result) => {
                this.loading.dismiss();
                this.vendor = result;
                                        console.log("vendor created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
  }

  getVendor() {
    this.showLoader();

   var vendordata = {
        name: 'test'
   };
   this.vendorService.getVendor(vendordata).then((result) => {
                this.loading.dismiss();
                this.vendor = result;
                                        console.log("vendor created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
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
                let index = this.vendors.indexOf(vendor);

                if(index > -1){
                        this.vendors.splice(index, 1);
                }

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
                let index = this.vendors.indexOf(vendor);

                if(index > -1){
                        this.vendors.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }


  
}
