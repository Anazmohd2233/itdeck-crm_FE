import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SchoolService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    createLocation(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/location/create`;
        return this.http.post<any>(apiUrl, formData);
    }

    updateLocation(formData: any, id: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/location/update/${id}`;
        return this.http.patch<any>(apiUrl, formData);
    }

    getLocation(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/location/list/${page}`;
        return this.http.get<any>(url, { params });
    }

    getLocationById(id: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/location/view/${id}`;
        return this.http.get<any>(url, { params });
    }

    createSchool(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/school/create`;
        return this.http.post<any>(apiUrl, formData);
    }

    updateSchool(formData: any, id: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/school/update/${id}`;
        return this.http.patch<any>(apiUrl, formData);
    }

    getSchool(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/school/list/${page}`;
        return this.http.get<any>(url, { params });
    }

    getSchoolById(id: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/school/view/${id}`;
        return this.http.get<any>(url, { params });
    }
}
