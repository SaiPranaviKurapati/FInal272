import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnComponent } from './column/column.component';
import { LoginComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateIssueComponent } from './create-task-modal/create-task-modal.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { GraphComponent } from './graph/graph.component';
import { BacklogComponent } from './backlog/backlog.component';
import { CreateBacklogComponent } from './create-backlog/create-backlog.component';
import { EditBacklogComponent } from './edit-backlog/edit-backlog.component';
import { CreateProjectComponent } from './create-project/create-project.component';
const routes: Routes = [
  // { path: '', redirectTo: '/signin', pathMatch: 'full' },
  // { path: '', redirectTo: '/admindashboard', pathMatch: 'full' },
  //  { path: '', redirectTo: '/admindashboard', pathMatch: 'full' },
  { path:'admindashboard', component:AdmindashboardComponent},
  { path:'graph',component:GraphComponent},
  { path:'signin', component:LoginComponent},
  // { path: 'column1', component: ColumnComponent },
  // { path: 'column2', component: ColumnComponent },
  // { path: 'column3', component: ColumnComponent },
  // { path: 'dashboard', component: DashboardComponent },
  {path:'createTask', component:CreateIssueComponent},
  {path:'createBacklog', component:CreateBacklogComponent},
  {path:'createProject', component:CreateProjectComponent},

  { path: '',
    component: DashboardComponent,
    children: [
      { path: 'backlog', component: BacklogComponent },
      { path: 'home', component: ColumnComponent },
      { path: 'dashboard', component: ColumnComponent },
  ]
  },
  { path: 'editBacklog/:id', component: EditBacklogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
