import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUsers(page:number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users?page=${page}&limit=${limit}`)
  }

  createUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users`, data)
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  getUserProfile(): Observable <any> {
    return this.http.get<any>(`${this.apiUrl}/users/profile`)
  }
  getUserById(id: number): Observable <any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`)
  }

}
