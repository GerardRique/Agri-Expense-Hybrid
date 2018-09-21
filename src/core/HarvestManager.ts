import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from './MeasurableDataManager';
import { Harvest } from './Harvest';
import { isObject } from 'ionic-angular/util/util';

@Injectable()

export class HarvestManager extends MeasurableDataManager{
    protected unitList: Array<string>;

    protected dataList: Array<Object>;

    public DATA_ID: string;

    constructor(storage: Storage, harvestUUID: UUID){
        super(storage, harvestUUID);

        this.DATA_ID = "Harvest";

        this.unitList = ["5lb Bundle", "Kilograms(Kg)", "pounds(lb)"];

        this.dataList = [];
    }


    add(data: Harvest): Promise<boolean>{
        let promises = [];
        promises.push(super.add(data));

        return this.storage.ready().then(() => {
            let harvestId = data.getId();
            let cycleId = data.getCycleId();
            let cycleHarvestId = this.DATA_ID + "_" + cycleId;

            promises.push(this.storage.get(cycleHarvestId).then((result) => {
                if(result === null)
                    result = [];
                if(!isObject(result))result = JSON.parse(result);

                result.push(harvestId);

                let resultString = JSON.stringify(result);

                this.storage.set(cycleHarvestId, resultString);
            }));

            promises.push(this.storage.get(cycleHarvestId).then((result) => {
                if(result === null)
                    result = [];
                if(!isObject(result))result = JSON.parse(result);
                result.push(harvestId);
                let resultString = JSON.stringify(result);
                this.storage.set(cycleHarvestId, resultString);
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

    public getByCycleId(cycleId: string): Promise<Array<Harvest>>{
        let harvestList = Array<Harvest>();

        let promises = [];

        return this.storage.ready().then(() => {
            let harvestTaskId = this.DATA_ID + "_" + cycleId;
            return this.storage.get(harvestTaskId).then((harvestIdList) => {
                if(harvestIdList === null){
                    return harvestList
                }

                if(!isObject(harvestIdList))harvestIdList = JSON.parse(harvestIdList);

                for(let id of harvestIdList){
                    promises.push(this.storage.get(id).then((harvestString) => {
                        let data = JSON.parse(harvestString);

                        let harvest = <Harvest>data;

                        harvestList.push(harvest);
                    }));
                }

                return Promise.all(promises).then(() => {
                    return harvestList;
                }).catch((error) => {
                    console.error(error);
                    return error;
                });
            }).catch((error) => {
                console.error(error);
                return error;
            });
        }).catch((error) => {
            console.error(error);
            return error;
        });
    }
}