import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  //get all customer
  get(apiUrl: string): Observable<any[]> {
    return this.http.get<any[]>(`${apiUrl}`);
  }
  //get customer by id
  getById(apiUrl: string, id: string): Observable<any> {
    return this.http.get<any>(`${apiUrl}/Customer/${id}`);
  }
  //add new customer
  add(apiUrl: string, post: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}`, post);
  }
  //edit existing customer
  update(apiUrl: string, id: string, post: any): Observable<any> {
    return this.http.post<any>(`${apiUrl}/Customer/${id}`, post);
  }
  //delete existing customer
  delete(apiUrl: string, id: string): Observable<any> {
    return this.http.delete<any>(`${apiUrl}/Customer/${id}`);
  }
}
