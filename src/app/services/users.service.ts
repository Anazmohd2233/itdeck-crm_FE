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

    updateUser(id: any, formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/update_admin/${id}`;
        return this.http.post<any>(apiUrl, formData);
    }

    getUsers(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/list/${page}`;
        return this.http.get<any>(url, { params });
    }

    getUserById(id: any): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/admin/admin-view/${id}`);
    }

    getProfile(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/admin/profile`);
    }

    // ********************  need to remove  **************************///

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }

    getUserProfile(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/users/profile`);
    }

    // **********************************************///
}
