import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from './MeasurableDataManager';
import { Harvest } from './Harvest';
import { isObject } from 'ionic-angular/util/util';

@Injectable()

export class HarvestManager extends MeasurableDataManager{
    protected unitList: Array<string>;

    protected dataList: Array<Object>;

    public DATA_ID: string;

    constructor(private harvestStorage: Storage, private harvestUUID: UUID){
        super(harvestStorage, harvestUUID);

        this.DATA_ID = "Harvest";

        this.unitList = ["100's", "5lb Bundle", "Bags", "Bundles", "Heads", "Kilograms(Kg)", "pounds(lb)"];

        this.dataList = [];
    }


    add(data: Harvest): Promise<boolean>{
        let promises = [];
        promises.push(super.add(data));

        return this.harvestStorage.ready().then(() => {
            let harvestId = data.getId();
            let cycleId = data.getCycleId();
            let cycleHarvestId = this.DATA_ID + "_" + cycleId;

            promises.push(this.harvestStorage.get(cycleHarvestId).then((result) => {
                if(result === null)
                    result = [];
                if(!isObject(result))result = JSON.parse(result);

                result.push(harvestId);

                let resultString = JSON.stringify(result);

                this.harvestStorage.set(cycleHarvestId, resultString);
            }));

            return Promise.all(promises).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }
}