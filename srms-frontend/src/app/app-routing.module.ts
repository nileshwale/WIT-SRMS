import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./auth/students/students.module').then(m => m.StudentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'students/student-form',
    loadChildren: () => import('./auth/students/student-form/student-form.page').then(m => m.StudentFormPage)
  },

  // Add a route for student list
  {
    path: 'students/student-list',
    loadChildren: () => import('./auth/students/student-list/student-list.page').then(m => m.StudentListPage)
  },
  {
    path: 'students',
    loadChildren: () => import('./auth/students/students.module').then(m => m.StudentsModule),
    canActivate: [AuthGuard]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}