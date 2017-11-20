import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';

export abstract class DataManager{

    protected abstract dataID: string;
    public initializedString: string;
    //TODO: Create interface for data list to ensure that objects have the appropriate keys. 
    protected abstract dataList: Array<Object>;

    protected abstract unitList: Array<string>;
    protected unitListKey = "UNIT_LIST";

    constructor(private storage: Storage, private uuid: UUID){
        this.initializedString = "INITIALIZED";
    }

    //The initialize function takes all the data provided in the data list and persists that data to the device storage. This function returns a promise that is resolved when all items in the data list have been stored on device storage. 
    public initialize(): Promise<any>{
        let promises = [];//This promise array will contain all the promises that are returned when each item in the data list is stored. 
        return this.storage.ready().then(() => {//returns a promise that is resolved when the data store is ready. i.e. we ensure the data store is ready before proceeding. 
            for(let current of this.dataList){//Loop through every item in the data list. 
                let currentUUID = UUID.UUID();//Generates a unique id for each item in the list.
                let key = this.dataID + "_" + currentUUID;
                current['id'] = key;
                let currentString = JSON.stringify(current);
                promises.push(this.storage.set(key, currentString));
            }
            promises.push(this.initializeUnits());
            return Promise.all(promises).then(() => { //Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
                let initializedKey = this.initializedString + '_' + this.dataID;
                return this.storage.set(initializedKey, "true").then(() => {
                    console.log("Initialized");
                    return this;
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

    private initializeUnits(): Promise<boolean>{
        return this.storage.ready().then(() => {
            let unitListString = JSON.stringify(this.unitList);
            let unitListStringKey = this.unitListKey + "_" + this.dataID;
            return this.storage.set(unitListStringKey, unitListString).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        })
    }

    public getUnitsList(): Promise<Array<string>>{
        return this.storage.ready().then(() => {
            let unitListStringKey = this.unitListKey + "_" + this.dataID;
            return this.storage.get(unitListStringKey).then((resultString) => {
                let data = JSON.parse(resultString);
                return data;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public checkInitialization(): Promise<boolean>{
        return this.storage.ready().then(() => {
            let initializedKey = this.initializedString + '_' + this.dataID;
            return this.storage.get(initializedKey).then((value) => {
                if(value.localeCompare("true") === 0)
                    return true;
                else return false;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }

    public getAll(): Promise<Array<Object>>{
        return this.checkInitialization().then((result) => {
            if(result === true){

                return this.retrieveAll().then((data) => {
                    return data;
                }).catch((error) => {
                    return error;
                }); 
            }
            else{
                return this.initialize().then(() => {
                    return this.retrieveAll().then((data) => {
                        return data;
                    }).catch((error) => {
                        return error;
                    });
                }).catch((error) => {
                    return error;
                }) ; 
            }
        }).catch((error) => {
            return error;
        });
    }


    private retrieveAll(): Promise<Array<Object>>{
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

    public getNameList(): Promise<Array<string>>{
        let nameList = Array<string>();
        return this.storage.ready().then(() => {
            return this.storage.forEach((value, key, index) => {
                let id = key.substring(0, 4);
                if(id.localeCompare(this.dataID) == 0){
                    let current = JSON.parse(value);
                    if('name' in current)
                        nameList.push(current['name']);
                    else return [];
                }
            }).then(() => {
                return nameList;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }


    public addNew(data: Object): Promise<boolean>{
        return this.storage.ready().then(() => {
            let newUUID =  UUID.UUID();
            let key = this.dataID + '_' + newUUID;//Creates unique id (conatining a timestamp) for the new material to be saved. 
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