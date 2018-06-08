import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the WalletRadminPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vendor-admin',
  templateUrl: 'vendor-admin.html'
})
export class VendorAdminPage {

  usersRoot = 'UsersPage'   // 
  adminRoot = 'AdminPage'
  transactionsRoot = 'TransactionsPage'
  balancesRoot = 'BalancesPage'


  constructor(public navCtrl: NavController) {}

}
