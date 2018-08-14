import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { Task } from '../core/Task';
import { isObject } from 'ionic-angular/util/util';

@Injectable()
export class TaskManager extends DataManager{
    public DATA_ID: string;
    protected dataList: Array<Object>;

    constructor( storage: Storage, taskUUID: UUID){
        super(storage,taskUUID);
        this.DATA_ID = "tasks";
        this.dataList = [];
    }

    public add(data: Task): Promise<boolean>{
        let promises = [];
        promises.push(super.add(data));
        return this.storage.ready().then(() => {
            let taskId = data.getId();
            let cycleId = data.getCycleId();
            let labourerId = data.getLabourerId();
            let labourerTasksId = this.DATA_ID + "_" + labourerId;
            let cycleTasksId = this.DATA_ID + "_" + cycleId;
            promises.push(this.storage.get(labourerTasksId).then((result) => {
                if(result === null)
                    result = [];
                if(!isObject(result))result = JSON.parse(result);
                result.push(taskId);
                console.log(result);
                let resultString = JSON.stringify(result);
                this.storage.set(labourerTasksId, resultString);
            }));

            promises.push(this.storage.get(cycleTasksId).then((result) => {
                if(result === null)
                    result = [];
                if(!isObject(result))result = JSON.parse(result);
                result.push(taskId);
                console.log(result);
                let resultString = JSON.stringify(result);
                this.storage.set(cycleTasksId, resultString);
            }));

            return Promise.all(promises).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }

    public getByCycleId(cycleId: string): Promise<Array<Task>>{
        let taskList = Array<Task>();
        let promises = [];
        return this.storage.ready().then(() => {
            let cycleTaskId =  this.DATA_ID + "_" + cycleId;
            return this.storage.get(cycleTaskId).then((taskIdList) => {
                if(taskIdList === null){
                    return taskList;
                }
                if(!isObject(taskIdList))taskIdList = JSON.parse(taskIdList);

                for(let id of taskIdList){
                    promises.push(this.storage.get(id).then((dataString) => {
                        let data = JSON.parse(dataString);
                        let task = <Task> data;
                        taskList.push(task);
                    }));
                }
                return Promise.all(promises).then(() => {
                    return taskList;
                }).catch((error) => {
                    return error;
                });
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public get(id: string): Promise<Task>{
        return super.get(id).then((data) => {
            let task = <Task> data;
            return task;
        }).catch((error) => {
            return error;
        })
    }
}