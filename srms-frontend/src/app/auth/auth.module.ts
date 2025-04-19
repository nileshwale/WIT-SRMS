import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage }
];

@NgModule({
  declarations: [LoginPage, RegisterPage],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)]
})
export class AuthModule {}
