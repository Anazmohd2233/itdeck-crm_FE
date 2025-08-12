import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) {}

    createContact(formData: any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/contacts/create`;
        return this.http.post<any>(apiUrl, formData);
    }

     updateContact(formData: any,contact_id:any): Observable<any> {
        const apiUrl = `${this.apiUrl}/admin/contacts/update/${contact_id}`;
        return this.http.patch<any>(apiUrl, formData);
    }

    getContact(page: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/contacts/list/${page}`;
        return this.http.get<any>(url, { params });
    }

      getContactById(contact_id: number, params?: HttpParams): Observable<any> {
        const url = `${this.apiUrl}/admin/contacts/list/${contact_id}`;
        return this.http.get<any>(url, { params });
    }





    
}
