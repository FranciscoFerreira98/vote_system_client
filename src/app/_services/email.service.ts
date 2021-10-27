import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "https://backendipcavote.azurewebsites.net/";
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  send(data: any): Observable<any> {
    return this.http.post(baseUrl + "api/email/", data);
  }

}
