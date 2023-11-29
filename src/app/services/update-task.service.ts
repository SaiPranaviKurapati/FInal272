import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UpdateTaskService {
  private apiUrl = 'http://127.0.0.1:5000/api/updateTask/';


  constructor(private http: HttpClient) { }

  updateTask(taskId: string, taskData: any) {
    return this.http.put(`${this.apiUrl}${taskId}`, taskData);
  }

}
