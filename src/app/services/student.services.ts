import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class StudentService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    // private getAuthHeaders(): HttpHeaders {
    //     const token = localStorage.getItem('Authorization');
    //     return new HttpHeaders({
    //         'Authorization': token || '',
    //         'Content-Type': 'application/json'
    //     });
    // }

    updateStudent(formData: any, student_id: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/student/update/${student_id}`;
        return this.http.patch<any>(apiUrl, formData);
    }

    getStudent(page: number, params?: HttpParams): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/student/list/${page}`;
        return this.http.get<any>(apiUrl);
    }

  

    getStudentById(student_id: number, params?: HttpParams): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/student/view/${student_id}`;
        return this.http.get<any>(apiUrl);
    }


}
