import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskListingPage } from './task-listing';

@NgModule({
  declarations: [
    TaskListingPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskListingPage),
  ],
})
export class TaskListingPageModule {}
