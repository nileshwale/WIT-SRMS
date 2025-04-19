import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { StudentFormPage } from './student-form/student-form.page';
import { StudentListPage } from './student-list/student-list.page';

const routes: Routes = [
  { path: 'student-form', component: StudentFormPage },
  { path: 'student-list', component: StudentListPage }
];

@NgModule({
  declarations: [
    StudentFormPage,
    StudentListPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentsModule {}
