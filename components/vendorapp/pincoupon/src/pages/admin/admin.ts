import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Manager } from '../../providers/manager';


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

  loading: any;
  plan: any;
  plans: any;
 
  plandata : any;

  constructor(public navCtrl: NavController, 
              public planService: Manager,
              public loadingCtrl: LoadingController,
	      public navParams: NavParams) {

       this.plandata = {
	  vendorincomeaddress: 'xx1',
	  vendorspendingaddress: 'xx2',
	  vendorspendingamount : 100

       };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Working...'
    });

    this.loading.present();

  }

  planCreate() {
    this.showLoader();

   this.planService.createPair(this.plandata).then((result) => {
                this.loading.dismiss();
                this.plan = result;
                                        console.log("plan created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                                });
  }

  getPlan() {
    this.showLoader();

   var plandata = {
        name: 'test'
   };

   var whichside = 1;

   this.planService.getPair(plandata, whichside).then((result) => {
                this.loading.dismiss();
                this.plan = result;
                                        console.log("plan created");
                                }, (err) => {
                this.loading.dismiss();
                                        console.log("not allowed"+ err);
                               });
  }

 activatePlan(plan){

    this.showLoader();

    var pauseactivate = {
        activate : true,
        pause: false,
        planid : 1
    };

    this.planService.pauseActivatePair(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.plans.indexOf(plan);

                if(index > -1){
                        this.plans.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }

 pausePlan(plan){

    this.showLoader();

    var pauseactivate = {
        activate : false,
        pause: true,
        planid : 1
    };

    this.planService.pauseActivatePair(pauseactivate).then((result) => {

      this.loading.dismiss();

      //Remove locally
                let index = this.plans.indexOf(plan);

                if(index > -1){
                        this.plans.splice(index, 1);
                }

    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
  }
}
