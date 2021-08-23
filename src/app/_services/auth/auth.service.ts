import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { User } from '../_models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  // currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/Defualt User Image.png');
  // this for make photo public used
  // currentPhotoUrl = this.photoUrl.asObservable();

  // changeMemberPhoto(photoUrl: string) {
  //   this.photoUrl.next(photoUrl);
  // }
  constructor(private http: HttpClient) {}

  login(model: any) {
    let url_ = (this.baseUrl + 'TokenAuth/Authenticate').replace(/[?&]$/, '');
    let headers: any = {
      'Content-Type': 'application/json-patch+json',
      'abp.tenantid': '1',
      Accept: 'text/plain',
    };
    return this.http
      .post(url_, model, {
        headers: headers,
      })
      .pipe(
        map((response: any) => {
          const result = response;
          if (result) {
            localStorage.setItem('token', result.result.accessToken);
            // localStorage.setItem('userId', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(
              result.result.accessToken
            );
            console.log(this.decodedToken);
          }
        })
      );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token')?.toString();
    return !this.jwtHelper.isTokenExpired(token);
  }
}
