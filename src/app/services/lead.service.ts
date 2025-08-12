import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LeadsService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    createLead(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/leads/create`;
        return this.http.post<any>(apiUrl, formData);
    }

    updateLead(formData: any, leads_id: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/leads/update/${leads_id}`;
        return this.http.patch<any>(apiUrl, formData);
    }

    getLead(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/leads/list/${page}`;
        return this.http.get<any>(url, { params });
    }

    getLeadById(leads_id: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/leads/view/${leads_id}`;
        return this.http.get<any>(url, { params });
    }
}
