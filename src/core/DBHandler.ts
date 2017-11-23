import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export abstract class DBHandler{
    size: number;
    abstract KEY_NAME: string;
    constructor(private storage: Storage){
        this.size = 0;
    }
    getSize(){
        return this.size;
    }
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

    //Returns a promise that is resolved when the given data has been added to device storage. 
    public add(newData: Object): Promise<any>{
        return this.storage.ready().then(() => {
            let date = new Date();
            let key = this.KEY_NAME + '_' + date.getTime();
            newData['id'] = key;
            let newDataString = JSON.stringify(newData);
            return this.storage.set(key, newDataString).then(() => {
                return this;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    //Returns a promise that is resolved when the edited data has overwritten the previous. 
    public edit(key: string, editedData: Object): Promise<any>{
        return this.storage.ready().then(() => {
            let editedDataString = JSON.stringify(editedData);
            return this.storage.set(key, editedDataString).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    //Returns a promise that is resolved when the given hey has been removed. 
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
}