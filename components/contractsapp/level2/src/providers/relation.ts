import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

import { environment } from '../config/environment';

let url = environment.url;

@Injectable()
export class Relation {

  url : string;
  constructor(public http: Http, public authService: Auth) {
     this.url = url;

  }

  getRelations(){

    var tryurl = this.url + '/api/relation/getRelations' 
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

  getRelation(relationid){


    var tryurl = this.url + '/api/relation/' + relationid;
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

  relationPauseActivate(pauseactivate){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post(this.url + '/api/relation/relationPausActivate',JSON.stringify(pauseactivate), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }


}
