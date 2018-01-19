import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskManager } from '../../core/TaskManager';
import { Task } from '../../core/Task';
import { LabourManager } from '../../core/LabourManager';

/**
 * Generated class for the TaskListingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-listing',
  templateUrl: 'task-listing.html',
})
export class TaskListingPage {

  cycleId: string;
  taskListing: Array<Task>;
  labourerListingMap = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskManager: TaskManager, public labourManager :LabourManager) {


    if('cycleId' in this.navParams.data){
      console.log('Cycle ID: ' + this.navParams.get('cycleId'));
      this.cycleId = this.navParams.get('cycleId');
      this.taskManager.getByCycleId(this.cycleId).then((data)=>{
        this.taskListing = data;
        console.log(this.taskListing);
        this.getLabourers();
      });

    }
    else throw new Error('Data must contain attribute cycleId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListingPage');
  }

  getLabourers(){
    for(let task of this.taskListing){
      console.log(task);
      this.labourManager.get(task['labourerId']).then((labourer) => {
        console.log(labourer);
        task['firstName'] = labourer['firstName'];
        task['lastName'] = labourer['lastName'];
      });
    }
  }

}
