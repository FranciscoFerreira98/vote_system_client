import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountVotesService {
  private baseUrl = 'https://backendipcavote.azurewebsites.net';

  constructor(private http: HttpClient) { }
  
  getAll(id): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/count/${id}`);
  }

  getNumberOfVotes(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/count/all/${id}`);
  }
  
}
