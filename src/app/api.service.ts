import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  userdata: any;
  token = localStorage.getItem('token');
  apiUrl = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {
  }



  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', data);
  }


  signup(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'signup', data);
  }


  createTask(data: any): Observable<any> {
    data.token = this.token;
    return this.http.post<any>(this.apiUrl + 'createTask', data);
  }

  editTask(data: any, id:string): Observable<any> {
    data.token = this.token;
    return this.http.put<any>(this.apiUrl + 'editTask/' + id, data);
  }


  getAllTasks(){
    return this.http.get<any>(this.apiUrl + 'tasks');
  }

  getTask(id: string){
    return this.http.get<any>(this.apiUrl + 'task/' + id);
  }


  deleteTask(id: string){
    return this.http.delete<any>(this.apiUrl + 'task/' + id);
  }



}
