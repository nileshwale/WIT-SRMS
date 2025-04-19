import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  { path: '', component: DashboardPage }
];

@NgModule({
  declarations: [DashboardPage],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)]
})
export class DashboardModule {}
