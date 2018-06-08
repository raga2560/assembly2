import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Coupon } from '../../providers/coupon';

/**
 * Generated class for the CouponRedeemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coupon-redeem',
  templateUrl: 'coupon-redeem.html',
})
export class CouponRedeemPage {


  coupons: any;
  coupon: any;
  balance: any;
  loading: any;
  coupondata: any;

  constructor(public navCtrl: NavController, public couponService: Coupon, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {

       this.coupondata = {
            couponid: '',
            coupontype: '',
	    couponvalue: '',
            couponpin: ''
       };
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
  
  validateCoupon() {
    this.showLoader();

   var coupondata = {
        name: 'test'
   };
   this.couponService.validateCoupon(coupondata).then((result) => {
                this.loading.dismiss();
                this.coupon = result;
                                        console.log("coupon created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
  }

  
  redeemCoupon(coupon){

    this.showLoader();


    this.couponService.redeemCoupon(coupon).then((result) => {

      this.loading.dismiss();
      this.redeemstatus = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

  
  getCouponBalance(coupon){

    this.showLoader();

    var coupondata = {
        activate : false,
        pause: true,
        couponid : 1
    };

    this.couponService.getcouponBalance(coupondata).then((result) => {

      this.loading.dismiss();
      this.balance = result;


    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }



  
}
