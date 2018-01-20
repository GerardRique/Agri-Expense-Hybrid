import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TaskManager } from '../../core/TaskManager';
import { Task } from '../../core/Task';
import { LabourManager } from '../../core/LabourManager';
import { Labourer } from '../../core/Labourer';

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
  taskListingData: Array<Task>;
  labourerListingMap = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public taskManager: TaskManager, public labourManager :LabourManager) {


    if('cycleId' in this.navParams.data){
      console.log('Cycle ID: ' + this.navParams.get('cycleId'));
      this.cycleId = this.navParams.get('cycleId');
      this.taskManager.getByCycleId(this.cycleId).then((data)=>{
        this.taskListingData = data;
        console.log(this.taskListingData);
        this.getLabourers();
      });

    }
    else throw new Error('Data must contain attribute cycleId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListingPage');
  }

  getLabourers(){
    for(let task of this.taskListingData){
      console.log(task);
      this.labourManager.get(task['labourerId']).then((labourer) => {
        console.log(labourer);
        let currentLabourer = Labourer.deserialize(labourer);
        task['firstName'] = currentLabourer.getFirstName();
        task['lastName'] = currentLabourer.getLastName();
      });
    }
  }

}
