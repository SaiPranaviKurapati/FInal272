import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphserviceService {

  
    private apiUrl = 'http://127.0.0.1:5000/api/graph'; // Update with your Flask API URL
    private usersListurl = 'http://127.0.0.1:5000/api/project_users';
    private newusersListurl = 'http://127.0.0.1:5000/api/new_users';
  
    constructor(private http: HttpClient) { }
  
    getData(projectName: string): Observable<any> {
      const graphurl = `${this.apiUrl}/${projectName}`;
      return this.http.get(graphurl);
      // return this.http.get<any>('this.apiUrl/${projectName}');
    }

    getUsers(projectName: string): Observable<any> {
      const url = `${this.usersListurl}/${projectName}`;
      return this.http.get(url);
      // return this.http.get<any>('this.apiUrl/${projectName}');
    }

    getNewUsers(projectName: string): Observable<any> {
      const newurl = `${this.newusersListurl}/${projectName}`;
      return this.http.get(newurl);
      // return this.http.get<any>('this.apiUrl/${projectName}');
    }
    
    
  
  
}
