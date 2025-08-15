import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('Authorization');
        return new HttpHeaders({
            'Authorization': token || '',
            'Content-Type': 'application/json'
        });
    }

    private getAuthHeadersForFormData(): HttpHeaders {
        const token = localStorage.getItem('Authorization');
        return new HttpHeaders({
            'Authorization': token || ''
            // Don't set Content-Type for FormData, let browser set it with boundary
        });
    }

    createTask(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/tasks/create`;
        const headers = this.getAuthHeaders();
        return this.http.post<any>(apiUrl, formData, { headers });
    }

    updateTask(formData: any, task_id: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/tasks/update/${task_id}`;
        const headers = this.getAuthHeaders();
        return this.http.patch<any>(apiUrl, formData, { headers });
    }

    getTasks(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/tasks/list/${page}`;
        const headers = this.getAuthHeaders();
        return this.http.get<any>(url, { headers, params });
    }

    getTaskById(task_id: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/tasks/view/${task_id}`;
        const headers = this.getAuthHeaders();
        return this.http.get<any>(url, { headers, params });
    }

    deleteTask(task_id: number): Observable<any> {
        const url = `${this.apiUrl}/admin/tasks/delete/${task_id}`;
        const headers = this.getAuthHeaders();
        return this.http.delete<any>(url, { headers });
    }

    // Token validation method
    isTokenValid(): boolean {
        const token = localStorage.getItem('Authorization');
        return !!token && token.length > 0;
    }
}
