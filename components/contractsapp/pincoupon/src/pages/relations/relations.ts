import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { Relation } from '../../providers/relation';


/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relations',
  templateUrl: 'relations.html',
})
export class RelationsPage {

  loading: any;
  relations: any;

  constructor(public navCtrl: NavController,  public relationService: Relation, 
              public loadingCtrl: LoadingController,
              public navParams: NavParams) {
  }

  ionViewDidLoad(){

    this.relationService.getRelations().then((data) => {
                  this.relations = data;
    }, (err) => {
        console.log("not allowed");
    });

  }

  refresh () {

    this.relationService.getRelations().then((data) => {
                  this.relations = data;
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



}
