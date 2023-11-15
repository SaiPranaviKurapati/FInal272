import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphserviceService {

  
    private apiUrl = 'http://127.0.0.1:5000/api/graph';  // Update with your Flask API URL
  
    constructor(private http: HttpClient) { }
  
    getData(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }
  
  
}
