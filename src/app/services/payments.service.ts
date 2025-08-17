import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    createPayment(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/payments/create`;
        return this.http.post<any>(apiUrl, formData);
    }

    

    // updateLead(formData: any, leads_id: any): Observable<any> {
    //     const apiUrl = `${this.apiUrl}/admin/leads/update/${leads_id}`;
    //     return this.http.patch<any>(apiUrl, formData);
    // }

    getPayment(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/payments/list/${page}`;
        return this.http.get<any>(url, { params });
    }

    // getLeadById(leads_id: number, params?: HttpParams): Observable<any> {
    //     const url = `${this.apiUrl}/admin/leads/view/${leads_id}`;
    //     return this.http.get<any>(url, { params });
    // }
}
