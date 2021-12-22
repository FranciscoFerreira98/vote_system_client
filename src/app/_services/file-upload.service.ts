import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File,pollId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    formData.append('pollId', pollId);
    const req = new HttpRequest('POST', `${this.baseUrl}/api/excel/upload`, formData,{ 
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/excel/`);
  }

  findByName(name: any,pollId:any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/excel/?name=${name}&pollId=${pollId}`);
  }

  get(id: any ): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/excel/${id}`);
  }

  update(id: any ,data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/excel/${id}`, data);
  }

  getByMd5(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/excel/md5/${id}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/excel/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/excel/`,data);
  }
}