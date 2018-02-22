import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { Labourer } from '../core/Labourer'; 
import { Jsonp } from '@angular/http/src/http';

@Injectable()
export class LabourManager extends DataManager{

    public DATA_ID: string;
    protected dataList : Array<Object>;

    constructor(private labourStorage: Storage, private labourUUID: UUID){
        super(labourStorage, labourUUID);
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