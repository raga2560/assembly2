import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorAdminPage } from './vendor-admin';

@NgModule({
  declarations: [
    VendorAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(VendorAdminPage),
  ]
})
export class VendorAdminPageModule {}
