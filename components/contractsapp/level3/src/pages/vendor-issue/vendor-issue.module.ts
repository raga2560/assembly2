import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendorIssuePage } from './vendor-issue';

@NgModule({
  declarations: [
    VendorIssuePage,
  ],
  imports: [
    IonicPageModule.forChild(VendorIssuePage),
  ],
})
export class VendorIssuePageModule {}
