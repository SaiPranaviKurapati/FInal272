import { Component, Input } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
  @Input() content: any;

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
}
