import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://192.168.1.73:8080/";
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  send(data: any): Observable<any> {
    return this.http.post(baseUrl + "api/email/", data);
  }

}
