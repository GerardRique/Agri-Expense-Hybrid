import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, Content, ToastController } from 'ionic-angular';
import { Task } from '../../core/Task';
import { TaskManager } from '../../core/TaskManager';
import { CycleManager } from '../../core/CyclesModule/CycleManager';

/**
 * Generated class for the NewTaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html',
})
export class NewTaskPage {

  private newTask: FormGroup;
  private listOfRatesOfPay: Array<string>;
  private cycleIds: Array<string>;//This array will contain the uuids of all the cycles selected by the user.
  private selectedCycles: Array<Object>;//This array will contain the object representations of all cycles selected by the user.

  private labourerId: string;

  //variables are used for the quantity and salary labels as these can change depending on the rate of pay selected by the user.
  private quantityLabel: string;
  private salaryLabel: string;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private cycleManager: CycleManager, private taskManager: TaskManager, private toastCtrl: ToastController) {
    this.newTask = this.formBuilder.group({
      dateStarted: [new Date().toISOString(), Validators.required],
      rateOfPay: ['', Validators.required],
      salary: [0.0, Validators.required],
      quantity: [0.0, Validators.required],
      description: ['', Validators.required]
    });

    this.labourerId = this.navParams.get('labourerId');

    this.quantityLabel = 'Quantity';
    this.salaryLabel = 'Salary';

    this.listOfRatesOfPay = Task.getRatesOfPay();

    this.getCycles();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTaskPage');
  }

  selectRateOfPay(){
    let rate = this.newTask.get('rateOfPay').value;
    this.quantityLabel = 'Enter number of ' + rate + ' labourer will work for';
  }

  getCycles(){

    this.cycleIds = JSON.parse(this.navParams.get('cycles'));
    this.cycleManager.getList(this.cycleIds).then((list) => {
      this.selectedCycles = list;
    })

  }

  saveTasks(){

    let dateS = this.newTask.get('dateStarted').value;
    let rate = this.newTask.get('rateOfPay').value;
    let newSalary = this.newTask.get('salary').value;
    let newQuantity = this.newTask.get('quantity').value;
    let newDescription = this.newTask.get('description').value;

    let promises = [];

    for(let cycleId of this.cycleIds){
      let task = new Task(cycleId, this.labourerId, dateS, rate, newSalary, newQuantity, newDescription);
      console.log(task);

      promises.push(this.taskManager.add(task).then((result) => {
        console.log("Task " + task.getId() + " Has been added");
      }));
      
    }

    let toast = this.toastCtrl.create({
      message: 'Taks successfully saved',
      duration: 2000,
      position: 'middle'
    });

    Promise.all(promises).then(() => {
      console.log("Tasks have been saved");
      toast.present();
      this.content.resize();
      this.navCtrl.popToRoot();
    }).catch((error) => {
      console.log("Error: " + error);
    });
  }

}
