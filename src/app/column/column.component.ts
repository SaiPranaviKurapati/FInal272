import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import { CreateIssueComponent } from '../create-task-modal/create-task-modal.component';
import { CreateTaskServiceService } from '../create-task-modal/create-task-service.service'
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GetTaskService } from './get-task.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  // }

  constructor(private router: Router, private http:HttpClient, private GetTaskService: GetTaskService) {}

  todoTasks: any[] = [];
  inProgTasks: any[] = [];
  doneTasks: any[] = [];
  tasks: any[] = [];
  
  ngOnInit(): void {
    this.GetTaskService.getTasks().subscribe(data => {
       this.tasks = data;
       this.todoTasks = this.tasks.filter((task) => task.status === 'to-do');
       this.inProgTasks = this.tasks.filter((task) => task.status === 'in-progress');
       this.doneTasks = this.tasks.filter((task) => task.status === 'done');
    });
  }

  drop(event: any) {

    let task_id = event.previousContainer.data[event.previousIndex]._id.$oid;
    let new_status = event.container.id;

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

        //Update status of task

        this.GetTaskService.updateTaskStatus(task_id, new_status).subscribe(
          (response) => {
            console.log(response); // Handle the response from the server
          },
          (error) => {
            console.error(error); // Handle any errors
          }
        );
        
    }
  }
 

  openCreateTask()
  {
    this.router.navigate(['/createTask'])
  }

}
