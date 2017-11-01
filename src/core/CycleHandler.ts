import { DBHandler } from './DBHandler';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CycleHandler extends DBHandler{

    KEY_NAME = '0002';

    constructor(private storage: Storage){
        super()
    }

    //The get all function returns a promise with a JSON array containing all cycles stored on the device. 
    public getAll(): Promise<any>{
        let list = Array<Object>();
        return this.storage.ready().then(() => {
            return this.storage.forEach((value, key, index) => {
                let id = key.substring(0, 4);
                if(id.localeCompare(this.KEY_NAME) === 0){
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
    public add(newCycle: Object): Promise<any>{
        return this.storage.ready().then(() => {
            let date = new Date();
            let key = this.KEY_NAME + '_' + date.getTime();
            newCycle['id'] = key;
            let newCycleString = JSON.stringify(newCycle);
            return this.storage.set(key, newCycleString).then(() => {
                return this;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }
    public edit(newCycle: Object, index: number): Promise<any>{
        return this.storage.ready().then(() => {
            let newCycleString = JSON.stringify(newCycle);
            let key = newCycle['id'];
            return this.storage.set(key, newCycleString).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    public clear(): Promise<boolean>{
        return this.storage.ready().then(() => {
            return this.storage.forEach((value, key, index) => {
                let id = key.substring(0, 4);
                if(id.localeCompare(this.KEY_NAME) === 0){
                    this.storage.remove(key);
                }
            }).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        });
    }

    public remove(key): Promise<any>{
        return this.storage.ready().then(() => {
            return this.storage.remove(key).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }

}