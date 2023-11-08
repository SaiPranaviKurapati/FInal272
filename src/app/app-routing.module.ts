import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColumnComponent } from './column/column.component';
import { LoginComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateIssueComponent } from './create-task-modal/create-task-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path:'signin', component:LoginComponent},
  // { path: 'column1', component: ColumnComponent },
  // { path: 'column2', component: ColumnComponent },
  // { path: 'column3', component: ColumnComponent },
  { path: 'dashboard', component: DashboardComponent },
  {path:'createTask', component:CreateIssueComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
