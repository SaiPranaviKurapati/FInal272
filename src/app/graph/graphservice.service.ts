import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphserviceService {

  
    private apiUrl = 'http://127.0.0.1:5000/api/graph';  // Update with your Flask API URL
  
    constructor(private http: HttpClient) { }
  
    getData(projectName: string): Observable<any> {
      const url = `${this.apiUrl}/${projectName}`;
      return this.http.get(url);
      // return this.http.get<any>('this.apiUrl/${projectName}');
    }
  
  
}
