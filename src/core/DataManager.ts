import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { Serializeable } from './Serializeable';
import { isObject } from 'ionic-angular/util/util';
import { isJsObject } from '@angular/core/src/change_detection/change_detection_util';

export abstract class DataManager{

    public abstract DATA_ID: string;
    //TODO: Create interface for data list to ensure that objects have the appropriate keys. 
    protected abstract dataList: Array<Object>;

    constructor(private storage: Storage, private uuid: UUID){
    }

    //The initialize function takes all the data provided in the data list and persists that data to the device storage. This function returns a promise that is resolved when all items in the data list have been stored on device storage. 
    public initialize(): Promise<any>{
        let promises = [];//This promise array will contain all the promises that are returned when each item in the data list is stored. 
        let uniqueIDs = [];
        return this.storage.ready().then(() => {//returns a promise that is resolved when the data store is ready. i.e. we ensure the data store is ready before proceeding. 
            for(let current of this.dataList){//Loop through every item in the data list. 
                let currentUUID = UUID.UUID();//Generates a unique id for each item in the list.
                uniqueIDs.push(currentUUID);
                current['id'] = currentUUID;
                let currentString = JSON.stringify(current);
                promises.push(this.storage.set(currentUUID, currentString));
            }
            let uuidListString = JSON.stringify(uniqueIDs);
            promises.push(this.storage.set(this.DATA_ID, uuidListString));
            return Promise.all(promises).then(() => { //Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
                console.log("Initialized data for " + this.DATA_ID);
                return this;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public checkInitialization(): Promise<boolean>{
        return this.storage.ready().then(() => {
            return this.storage.get(this.DATA_ID).then((value) => {
                if(value === null || value.length === 0)
                    return false;
                else return true;
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

    public getAllById(id: string): Promise<Array<Object>>{
        let list = Array<Object>();
        let promises = [];
        return  this.storage.ready().then(() => {
            return this.storage.get(id).then((uuidListString) => {
                if(!isObject(uuidListString))uuidListString = JSON.parse(uuidListString);
                for(let id of uuidListString){
                    promises.push(this.storage.get(id).then((dataString) => {
                        let data = JSON.parse(dataString);
                        list.push(data);
                    }))
                }
                return Promise.all(promises).then(() => {
                    return list;
                });
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public getDataInSpreadSheetFormat(): Promise<Array<Array<any>>>{
        let list = Array<Array<any>>();
        let promises = [];

        return this.storage.ready().then(() => {
            return this.storage.get(this.DATA_ID).then((uuidListString) => {
                if(!isObject(uuidListString))uuidListString = JSON.parse(uuidListString);

                let firstId = uuidListString[0];

                return this.storage.get(firstId).then((firstDataString) => {
                    let firstData = JSON.parse(firstDataString);
                    let keyList = [];
                    for(let key in firstData){
                        keyList.push(key);
                    }
                    list.push(keyList);

                    for(let id of uuidListString){
                        promises.push(this.storage.get(id).then((dataString) => {
                            let data = JSON.parse(dataString);
                            let dataList = [];
                            for(let key in data){
                                dataList.push(data[key]);
                            }
                            list.push(dataList);
                        }));
                    }
                    return Promise.all(promises).then(() => {
                        return list;
                    }).catch((error) => {
                        return error;
                    });

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


    public retrieveAll(): Promise<Array<Object>>{
        let list = Array<Object>();
        let promises = [];
        return this.storage.ready().then(() => {
            return this.storage.get(this.DATA_ID).then((uuidListString) => {
                if(!isObject(uuidListString))uuidListString = JSON.parse(uuidListString);
                for(let id of uuidListString){
                    promises.push(this.storage.get(id).then((dataString) => {
                        let data = JSON.parse(dataString);
                        list.push(data);
                    }))
                }
                return Promise.all(promises).then(() => {
                    return list;
                });
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public get(id: string): Promise<Object>{
        return this.storage.ready().then(() => {
            return this.storage.get(id).then((dataString) => {
                let data = JSON.parse(dataString);
                return data;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public add(data: Serializeable): Promise<boolean>{
        
        return this.storage.ready().then(() => {
            
            let id = data.getId();
            console.log("FOUND ID");
            console.log('CALLING ADD METHOD STORAGE READY');
            let dataString = JSON.stringify(data);
            let promises = [];
            return this.storage.get(this.DATA_ID).then((result) => {
                if(result === null){
                    result = [];
                }
                if(!isObject(result))result = JSON.parse(result);
                result.push(id);
                let resultString = JSON.stringify(result);
                promises.push(this.storage.set(this.DATA_ID, resultString));
                promises.push(this.storage.set(id, dataString));
                return Promise.all(promises).then(() => {
                    return true;
                }).catch((error) => {
                    console.log("Error: " + error);
                    return false;
                });
            }).catch((error) => {
                console.log("Error: " + error);
                return false;
            });
        }).catch((error) => {
            console.log('ERRORRRR: ' + error);
            return false;
        });
    }

    public addById(data: Object, id: string): Promise<boolean>{
        return this.storage.ready().then(() => {
            let dataString = JSON.stringify(data);
            let promises = [];
            return this.storage.get(this.DATA_ID).then((result) => {
                if(result === null){
                    console.log('List is empty');
                    result = [];
                }
                if(!isObject(result))result = JSON.parse(result);
                result.push(id);
                let resultString = JSON.stringify(result);
                console.log(resultString);
                promises.push(this.storage.set(this.DATA_ID, resultString));
                promises.push(this.storage.set(id, dataString));
                return Promise.all(promises).then(() => {
                    return true;
                }).catch((error) => {
                    console.log("Error: " + error);
                    return false;
                });
            }).catch((error) => {
                console.log("Error: " + error);
                return false;
            });
        }).catch((error) => {
            console.log('ERRORRRR: ' + error);
            return false;
        });
    }

    public edit(id: string, data: Object): Promise<boolean>{
        return this.storage.ready().then(() => {
            let dataString = JSON.stringify(data);
            return this.storage.set(id, dataString).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }

    public remove(key: string): Promise<boolean>{

        let promises = [];

        return this.storage.ready().then(() => {
            return this.storage.get(this.DATA_ID).then((uuidListString) => {
                if(!isObject(uuidListString))uuidListString = JSON.parse(uuidListString);

                console.log(uuidListString);

                for(let index in uuidListString){
                    if(key.localeCompare(uuidListString[index]) === 0){
                        uuidListString.splice(index, 1);
                    }
                }
                
                uuidListString = JSON.stringify(uuidListString);
                return this.storage.set(this.DATA_ID, uuidListString).then(() => {
                    return this.storage.remove(key).then(() => {
                        return true;
                    }).catch((error) => {
                        console.log(error);
                        return false;
                    });
                    
                }).catch((error) => {
                    console.log(error);
                    return false;
                });

            }).catch((error) => {
                console.log(error);
                return false;
            });
            
        }).catch((error) => {
            console.log(error);
            return false;
        });

    }

    public getList(idList: Array<string>): Promise<Array<Object>>{
        let list = Array<Object>();
        let promises = [];
        return this.storage.ready().then(() => {
            for(let id of idList){
                promises.push(this.storage.get(id).then((result) => {
                    let data = JSON.parse(result);
                    list.push(data);
                }));
            }

            return Promise.all(promises).then(() => {
                return list;
            }).catch((error) => {
                return error;
            });
            
        }).catch((error) => {
            return error;
        });
    }

}