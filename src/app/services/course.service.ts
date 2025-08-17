import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    createCourse(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/service/create`;
        return this.http.post<any>(apiUrl, formData);
    }

    

    updateCourse(formData: any, id: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/service/update/${id}`;
        return this.http.patch<any>(apiUrl, formData);
    }

    getCourse(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/service/list/${page}`;
        return this.http.get<any>(url, { params });
    }

    getCoursedById(id: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/service/view/${id}`;
        return this.http.get<any>(url, { params });
    }
}
