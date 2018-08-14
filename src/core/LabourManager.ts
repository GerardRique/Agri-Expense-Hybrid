import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { Labourer } from '../core/Labourer'; 

@Injectable()
export class LabourManager extends DataManager{

    public DATA_ID: string;
    protected dataList : Array<Object>;

    constructor(storage: Storage, labourUUID: UUID){
        super(storage, labourUUID);
        this.DATA_ID = "Labourers";
        this.dataList = [];
    }

    public get(id: string): Promise<Labourer>{
        return super.get(id).then((data) => {
            let labourer = <Labourer> data;
            return labourer;
        }).catch((error) => {
            return error;
        })
    }
}