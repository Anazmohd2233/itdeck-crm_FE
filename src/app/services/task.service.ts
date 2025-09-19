import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    createTask(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/task/create`;
        return this.http.post<any>(apiUrl, formData);
    }

    updateTask(formData: any, task_id: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/task/update/${task_id}`;
        return this.http.patch<any>(apiUrl, formData);
    }

    getTaskById(task_id: any, params?: HttpParams): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/task/view/${task_id}`;
        return this.http.get<any>(apiUrl, { params });
    }

    getTasks(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/task/list/${page}`;
        return this.http.get<any>(url, { params });
    }

    createExpence(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/expence/create`;
        return this.http.post<any>(apiUrl, formData);
    }

    getExpences(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/expence/list/${page}`;
        return this.http.get<any>(url, { params });
    }

    createBulkContact(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/contacts/create_bulk`;
        return this.http.post<any>(apiUrl, formData);
    }
   

     getLiveLocation(params?: HttpParams): Observable<any> {
        const url =  `${this.apiUrl}/admin/expence/fetchLocation`;
       
       
       
        return this.http.get<any>(url, { params });
    }



        createAttendence(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/expence/createAttendence`;
        return this.http.post<any>(apiUrl, formData);
    }

        updateAttendence(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/expence/updateAttendence`;
        return this.http.patch<any>(apiUrl, formData);
    }
   
   

}
