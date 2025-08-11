import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    createUser(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/create_admin`;
        return this.http.post<any>(apiUrl, formData);
    }

    updateUser(id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/users/${id}`, data);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }

    getUserProfile(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/users/profile`);
    }
    getUserById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/users/${id}`);
    }

    getUsers(page: number, limit: number): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/users?page=${page}&limit=${limit}`
        );
    }

    // **********************************************///

    getBookingView(id: any): Observable<any> {
        const url = `${this.apiUrl}/user/booking/view/${id}`;
        return this.http.get<any>(url);
    }

    getBookingById(params: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/user/booking/view`;
        return this.http.get<any>(url, { params });
    }
}
