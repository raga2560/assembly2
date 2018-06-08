import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

import { environment } from '../config/environment';

let url = environment.url;

@Injectable()
export class Manager {

  url : string;
  constructor(public http: Http, public authService: Auth) {
     this.url = url;

  }

  getPairs(){

    var tryurl = this.url + '/api/manager/getPairs' 
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

  getPair(pairid, whichside){

    if(!whichside) whichside = "server";

    var tryurl = this.url + '/api/manager/plan/' + whichside + "/"+ pairid;
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

  createPair(vendordata){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.url + '/api/manager/createPair',JSON.stringify(vendordata), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deletePair(pairid){

    var tryurl = this.url + '/api/manager/delete/' + pairid;

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
  
  pauseActivatePair(pauseactivate){

    var tryurl = this.url + '/api/manager/pairpauseactivate/' + pairid;
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(tryurl ,JSON.stringify(pauseactivate), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }


}
