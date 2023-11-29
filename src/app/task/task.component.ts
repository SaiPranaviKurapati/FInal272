import { Component, Input, ChangeDetectorRef, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { UpdateTaskService } from "../services/update-task.service";

const editorConfig = {
  // ui: 'pt',
  // language: 'pt',
  toolbar: {
    items: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "|",
      "strike",
      "code",
      "|", // Não tem ainda
      "bulletedList",
      "numberedList",
    ],
  },
};

@Component({
  selector: "app-task",
  templateUrl: "./task.component.html",
  styleUrls: ["./task.component.css"],
})
export class TaskComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;  
  @Input() content: any;
  //reqd for update task
  currentTaskId: string = '';
  taskToEdit: any = {
    project: '',
    issuetype: '',
    status: '',
    summary: '',
    description: '',
    assignee: '',
    reporter: '',
  };

  ckeditor = ClassicEditor;
  editorConfig = editorConfig;

  simpleItems: string[] = [
    "Task 1 name changed",
    "Task 2 completed require additional fucntions",
    "Project name changed",
  ];
 
  uploadedFileName: string | null = null;

  handleFileInput(event: any): void {
    const file: File = event.target.files[0];
    
    if (file) {
      // Do something with the file, e.g., upload it to a server
      this.uploadedFileName = file.name;
      console.log('Uploaded file:', file.name);
    }
  }

  getPriorityIconClass(): { [key: string]: boolean } {
    if (this.content && this.content.issuetype) {
      return {
        "fas fa-icon type fa-none":this.content.issuetype.trim() == 'none',
        "fas fa-icon type fa-tasks": this.content.issuetype.trim() == 'task',
        "fas fa-icon type fa-bug": this.content.issuetype.trim() == 'bug',
        // Add more classes if needed
      };
    }
    // Handle the case when this.content or this.content.issuetype is undefined
    return {};
  }

  constructor(private taskService : UpdateTaskService, private cdr: ChangeDetectorRef, private modalService: NgbModal) {}

  openModal(content: TemplateRef<any>) {
    if (this.content._id && this.content._id.$oid) {
      this.currentTaskId = this.content._id.$oid;
      this.fetchTaskDetails(this.currentTaskId, content);
    } else {
      console.error('Task ID is not in the expected format:', this.content._id);
    }
  }

fetchTaskDetails(taskId: string, content: TemplateRef<any>) {
  this.taskService.getTask(taskId).subscribe(
    (taskData) => {
      this.taskToEdit = taskData;
      this.cdr.detectChanges();
      this.modalService.open(content); // Open the modal here
    },
    (error) => {
      console.error('Error fetching task details', error);
    }
  );
}

saveChanges() {
  if (this.currentTaskId && this.validateTask(this.taskToEdit)) {
    this.taskService.updateTask(this.currentTaskId, this.taskToEdit).subscribe(
      response => {
        // Handle response here, show success message using SweetAlert2
        Swal.fire({
          title: 'Success!',
          text: 'Task updated successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            this.modalService.dismissAll(); // Close the modal if update is successful
          }
        });
      },
      error => {
        // Handle error here, show error message using SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: 'There was a problem updating the task',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    );
  } else {
    // Handle validation error
    Swal.fire({
      title: 'Invalid Data',
      text: 'Please check the task details and try again.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
  }
}

validateTask(task: any): boolean {
  // Check if the required fields are not empty or null
  // Add more validation as needed based on your requirements
  const isValidProject = task.project && task.project.trim() !== '';
  const isValidIssueType = task.issuetype && task.issuetype.trim() !== '';
  const isValidStatus = task.status && task.status.trim() !== '';
  const isValidSummary = task.summary && task.summary.trim() !== '';
  const isValidDescription = task.description && task.description.trim() !== '';
  const isValidAssignee = task.assignee && task.assignee.trim() !== '';
  const isValidReporter = task.reporter && task.reporter.trim() !== '';

  // Return true only if all validations pass
  return isValidProject && isValidIssueType && isValidStatus &&
         isValidSummary && isValidDescription && isValidAssignee &&
         isValidReporter;
}

closeModal() {
  this.modalService.dismissAll();
}

}
