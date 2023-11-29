import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UpdateTaskService {
  private apiUrl = 'http://127.0.0.1:5000/api/updateTask/';
  private getTaskByIdUrl = 'http://127.0.0.1:5000/api/tasks/';


  constructor(private http: HttpClient) { }

  getTask(taskId: string): Observable<any> {
    return this.http.get(`${this.getTaskByIdUrl}/tasks/${taskId}`);

  }

  updateTask(taskId: string, taskData: any) {
    return this.http.put(`${this.apiUrl}${taskId}`, taskData);
  }

}
