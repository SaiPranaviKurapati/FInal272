import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateIssueComponent } from './create-task-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskServiceService {
  
  private baseUrl: string = 'http://127.0.0.1:5000'; // Set your base URL here

  constructor(private http: HttpClient) {}

  createTask(project: string, issuetype:string,status: string,summary:string,description:string,assignee:string,reporter:string) {
    const task = { project, issuetype,status,summary,description,assignee,reporter};

    const createTaskUrl = `${this.baseUrl}/api/createTask`; // Create the full URL
    return this.http.post(createTaskUrl, task);
  }
}
