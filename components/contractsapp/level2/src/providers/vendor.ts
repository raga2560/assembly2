import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

import { environment } from '../config/environment';

let url = environment.url;

@Injectable()
export class Vendor {

  url : string;
  constructor(public http: Http, public authService: Auth) {
     this.url = url;

  }

  getVendors(){

    var tryurl = this.url + '/api/vendor/getVendors' 
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(tryurl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  getVendor(vendorid){


    var tryurl = this.url + '/api/vendor/'+ vendorid;
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get(tryurl, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createVendor(vendordata){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.url + '/api/vendor/createVendor',JSON.stringify(vendordata), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  vendorPauseActivate(pauseactivate){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.url + '/api/vendor/pauseactivate',JSON.stringify(pauseactivate), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }
  deleteVendor(vendorid){

    var tryurl = this.url + '/api/vendor/delete/' + vendorid;

  	return new Promise((resolve, reject) => {

	    let headers = new Headers();
	    headers.append('Authorization', this.authService.token);

	    this.http.delete(tryurl, {headers: headers}).subscribe((res) => {
	    	resolve(res);
	    }, (err) => {
	    	reject(err);
	    });    

  	});

  }

}
