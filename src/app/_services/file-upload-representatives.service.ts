import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadRepresentativeService {
  private baseUrl = 'https://backendipcavote.azurewebsites.net';

  constructor(private http: HttpClient) { }

  upload(file: File,pollId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('pollId', pollId);
    const req = new HttpRequest('POST', `${this.baseUrl}/api/representatives/upload`, formData,{ 
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/representatives/voters`);
  }
  
  findByName(name: any,pollId:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/representatives/name/?name=${name}&pollId=${pollId}`);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/representatives/${id}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/representatives/${id}`);
  }
}