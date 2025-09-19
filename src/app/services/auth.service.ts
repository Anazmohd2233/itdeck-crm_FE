import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginSuccessSource = new Subject<void>();
  loginSuccess$ = this.loginSuccessSource.asObservable();
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(form: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/admin/login`,form)
  }
    notifyLoginSuccess() {
    this.loginSuccessSource.next();
  }
}
