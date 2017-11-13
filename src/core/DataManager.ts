import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

export abstract class DataManager{

    protected dataID: string;
    protected dataList: Array<Object>;
    private storage: Storage;

    constructor(){
    }

    private initialize(): Promise<any>{
        let promises = [];
        return this.storage.ready().then(() => {
            for(let current of this.dataList){
                let currentString = JSON.stringify(current);
                let key = this.dataID + "_" + current['id'];
                promises.push(this.storage.set(key, currentString));
            }
            return Promise.all(promises).then(() => { //Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
                return this;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public getAll(): Promise<any>{
        let list = Array<Object>();
        return this.storage.ready().then(() => {
            return this.storage.forEach((value, key, index) => {
                let id = key.substring(0, 4);
                if(id.localeCompare(this.dataID) === 0){
                    let current = JSON.parse(value);
                    list.push(current);
                }
            }).then(() => {
                return list;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public addNew(data: Object): Promise<any>{
        return this.storage.ready().then(() => {
            let date = new Date();
            let key = this.dataID + '_' + date.getTime();//Creates unique id (conatining a timestamp) for the new material to be saved. 
            data['id'] = key;
            let dataString = JSON.stringify(data);
            return this.storage.set(key, dataString).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        });
    }
}