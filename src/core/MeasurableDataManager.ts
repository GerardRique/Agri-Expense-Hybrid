import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';
import { DataManager } from './DataManager';

export abstract class MeasurableDataManager extends DataManager {

    protected unitListKey = "UNIT_LIST";
    protected abstract unitList: Array<string>;

    constructor(storage: Storage, dataUUID: UUID){
        super(storage, dataUUID);
    }

    public initialize(): Promise<any>{
        let promises = [];
        promises.push(super.initialize());
        promises.push(this.initializeUnits());
        return Promise.all(promises).then(() => {
            console.log("Units Initialized");
            return this;
        }).catch((error) => {
            return error;
        })
    }

    public initializeUnits(): Promise<boolean>{
        console.log("Initializing units...");
        return this.storage.ready().then(() => {
            let unitListString = JSON.stringify(this.unitList);
            let unitListStringKey = this.unitListKey + "_" + this.DATA_ID;
            return this.storage.set(unitListStringKey, unitListString).then(() => {
                return true;
            }).catch((error) => {
                console.error(error)
                return false;
            });
        })
    }

    public checkInitialization(): Promise<boolean>{
        let unitListStringKey = this.unitListKey + "_" + this.DATA_ID;
        return this.storage.ready().then(() => {
            return super.checkInitialization().then((result) => {
                if(result == true){
                    return this.storage.get(unitListStringKey).then((value) => {
                        if(value === null || value.length === 0)
                            return false;
                        else return true;
                    }).catch((error) => {
                        console.error(error);
                        return false;
                    });
                } else {
                    return false;
                }
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        });
    }

    public getUnitsList(): Promise<Array<string>>{
        return this.storage.ready().then(() => {
            let unitListStringKey = this.unitListKey + "_" + this.DATA_ID;
            return this.storage.get(unitListStringKey).then((resultString) => {
                let data = JSON.parse(resultString);
                if(data === null)
                    return [];
                return data;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }
}