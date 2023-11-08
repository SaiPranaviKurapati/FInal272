import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import { CreateIssueComponent } from '../create-task-modal/create-task-modal.component';
import { CreateTaskServiceService } from '../create-task-modal/create-task-service.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  // }

  constructor(private router: Router, private http:HttpClient) {}

  todoTasks = [];
  inProgTasks = [];
  doneTasks = [];

  ngOnInit() {
    // Make an HTTP GET request to your Flask server to fetch the JSON data
    this.http.get('http://127.0.0.1:5000')
      .subscribe((data: any) => {
        this.todoTasks = JSON.parse(data.todo);
        this.inProgTasks = JSON.parse(data.inprogress);
        this.doneTasks = JSON.parse(data.done);
      });
    }
  
  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
        console.log(event.previousContainer.data + '-'+event.container.data +"-"+
        event.previousIndex+"-"+ event.currentIndex);
    }
  }
 

  openCreateTask()
  {
    this.router.navigate(['/createTask'])
  }

}
