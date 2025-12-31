import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

    logout(): void {
        // remove user from session storage to log user out
        localStorage.removeItem('token');
        sessionStorage.clear(); 
    }
}
