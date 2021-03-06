import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:8080/";
@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + "api/vote/", data);
  }

  findQuestion(id : any): Observable<any> {

    return this.http.get(baseUrl + `api/vote/${id}`);
  }

}
