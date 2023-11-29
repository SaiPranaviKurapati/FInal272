import { Component, Input, ChangeDetectorRef, TemplateRef, ViewChild } from "@angular/core";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  // fileToUpload: File | null = null;

  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  // }
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

  // openModal() {
  //   console.log("Content Object:", this.content);  // Log the content object
  //   if (this.content._id && this.content._id.$oid) {
  //     this.currentTaskId = this.content._id.$oid;
  //   } else {
  //     console.error('Task ID is not in the expected format:', this.content._id);
  //     return; // Exit the function if the ID format is not as expected
  //   }  
  //   console.log("Current Task ID:", this.currentTaskId);  // Log the extracted task ID
  //   this.fetchTaskDetails(this.currentTaskId);
  // }

  openModal(content: TemplateRef<any>) {
    if (this.content._id && this.content._id.$oid) {
      this.currentTaskId = this.content._id.$oid;
      this.fetchTaskDetails(this.currentTaskId, content);
    } else {
      console.error('Task ID is not in the expected format:', this.content._id);
    }
  }


// fetchTaskDetails(taskId: string) {
//     this.taskService.getTask(taskId).subscribe(
//       (taskData) => {
//         console.log('Fetched Task Data:',taskData);
//         this.taskToEdit = taskData;
//         // Now taskToEdit is bound to your form fields
//         this.cdr.detectChanges(); // Trigger change detection manually
//         this.showModal(); // Open the modal after data is fetched
//       },
//       (error) => {
//         console.error('Error fetching task details', error);
//         // Handle error fetching task details
//       }
//     );
//   }

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

}
