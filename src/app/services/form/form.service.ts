import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {

  constructor(private httpService: HttpClient) {}
  getData() {
    return this.httpService.get('http://localhost:3000/users');
  }

  deleteData(id: any) {
    return this.httpService.delete(`http://localhost:3000/users/${id}`);
  }

  pushData(data: any) {
    return this.httpService.post(`http://localhost:3000/users`, data);
  }

  putData(id: any, newData: any): Observable<any> {
    return this.httpService.put(`http://localhost:3000/users/${id}`, newData);
  }
  getUserById(id: string): Observable<any> {
    return this.httpService.get<any>(`http://localhost:3000/users/${id}`);
  }
}
