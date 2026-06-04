import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<any> {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQUXx-v2scMa_wEAfW7EmGvmDmlco-bFI';
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post(url, body);
  }

  signup(email: string, password: string): Observable<any> {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQUXx-v2scMa_wEAfW7EmGvmDmlco-bFI';
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post(url, body);
  }
}
