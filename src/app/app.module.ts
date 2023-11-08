import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ColumnComponent } from './column/column.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskTrackerComponent } from './task-tracker/task-tracker.component';
import { TaskComponent } from './task/task.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CreateIssueComponent } from './create-task-modal/create-task-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ColumnComponent,
    TaskTrackerComponent,
    TaskComponent,
    DashboardComponent,
    LoginComponent,
    CreateIssueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    BrowserModule,
    CKEditorModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
