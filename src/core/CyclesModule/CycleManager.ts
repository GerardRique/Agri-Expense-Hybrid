import { Injectable } from "@angular/core";
import { DataManager } from "../DataManager";
import { UUID } from "angular2-uuid";
import { Storage } from '@ionic/storage';

@Injectable()
export class CycleManager extends DataManager{
    public DATA_ID: string;
    protected dataList: Array<Object>;

    constructor(public cycleStorage: Storage, public cycleUUID: UUID){
        super(cycleStorage, cycleUUID);
        this.DATA_ID = "Cycles";
        this.dataList = [];
    }

    public closeCycle(cycleId: string): Promise<boolean>{
        return this.cycleStorage.ready().then(() => {
            return this.cycleStorage.get(cycleId).then((cycleString) => {
                let cycleData = JSON.parse(cycleString);
                cycleData['active'] = false;
                let updatedCycleString = JSON.stringify(cycleData);

                return this.cycleStorage.set(cycleId, updatedCycleString).then(() => {
                    return true;
                }).catch((error) => {
                    return false;
                });
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }
}