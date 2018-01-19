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

    public remove(labourer: Labourer): Promise<boolean>{
        let promises = [];
        return this.labourStorage.ready().then(() => {
            return this.labourStorage.get(this.DATA_ID).then((idListString) => {
                let idList = JSON.parse(idListString);
                let index = idList.indexOf(labourer.getId());
                if(index > -1){
                    idList.splice(index, 1);
                    let updatedIdListString = JSON.stringify(idList);
                    promises.push(this.labourStorage.remove(labourer.getId()));
                    promises.push(this.labourStorage.set(this.DATA_ID, updatedIdListString));
                    return Promise.all(promises).then(() => {
                        return true;
                    }).catch((error) => {
                        return false;
                    });
                }
                return false;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        });
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