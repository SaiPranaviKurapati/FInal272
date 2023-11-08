import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetTaskService {

  private apiBaseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}/api/getTask`);
  }

  updateTaskStatus(id: string, status: string) {
    return this.http.put(`${this.apiBaseUrl}/api/updateTask/${id}/${status}`, { status });
  }

}
