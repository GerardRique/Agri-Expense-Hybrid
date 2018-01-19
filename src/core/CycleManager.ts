import { Injectable } from "@angular/core";
import { DataManager } from "./DataManager";
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
}