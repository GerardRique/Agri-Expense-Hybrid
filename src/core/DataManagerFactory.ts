import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { DataManager } from '../core/DataManager';
import { LabourManager } from '../core/LabourManager';



@Injectable()
export class DataManagerFactory{
    public static LABOUR = "Labourers"; 


    constructor(private dataStorage: Storage, private uuid: UUID){

    }

    public getManager(type: string): DataManager{
        if(type === null){
            return null;
        }
        else if(type.localeCompare(DataManagerFactory.LABOUR) === 0){
            return new LabourManager(this.dataStorage, this.uuid);
        }
        return null;
    }
}