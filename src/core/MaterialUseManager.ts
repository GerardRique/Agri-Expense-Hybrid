import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { DataManager } from "./DataManager";
import { UUID } from "angular2-uuid";
import { MaterialUse } from "./MaterialUse";
import { isObject } from "ionic-angular/util/util";

@Injectable()
export class MaterialUseManager extends DataManager{

    //TODO: Test this class!!!!!

    public DATA_ID: string;
    protected dataList: Array<Object>;

    constructor( storage: Storage,  materialUseUUID: UUID){
        super(storage, materialUseUUID);
        this.DATA_ID = "MaterialUse";
        this.dataList = [];
    }


    public add(data: MaterialUse): Promise<boolean>{
        let promises = [];

        promises.push(super.add(data));

        return this.storage.ready().then(() => {
            let useId = data.getId();
            let cycleId = data.getCycleId();
            let materialId = data.getMaterialId();
            let purchaseId = data.getPurchaseId();
            let cycleUseId = this.DATA_ID + "_" + cycleId;
            let materialUseId = this.DATA_ID + "_" + materialId;

            console.log("Retrieved: %s, %s, %s, %s, %s, %s", useId, cycleId, materialId, purchaseId, cycleUseId, materialUseId);

            promises.push(this.storage.get(cycleUseId).then((result) => {
                
                if(result === null)result = [];

                if(!isObject(result))result = JSON.parse(result);

                result.push(useId);

                let resultString = JSON.stringify(result);
                this.storage.set(cycleUseId, resultString);
            }));

            promises.push(this.storage.get(materialUseId).then((result) => {
                
                if(result === null)result = [];

                if(!isObject(result))result = JSON.parse(result);

                result.push(useId);

                let resultString = JSON.stringify(result);
                
                this.storage.set(materialUseId, resultString);
            }));

            return Promise.all(promises).then(() => {
                return true;
            }).catch((error) => {
                console.log(error);
                return false;
            });

        }).catch((error) => {
            console.log(JSON.stringify(error));
            return false;
        });

    }

    public getByCycleId(cycleId: string): Promise<Array<Object>>{
        let promises = [];
        let materialUseList = Array<Object>();

        return this.storage.ready().then(() => {
            let cycleUseId = this.DATA_ID + "_" + cycleId;

            return this.storage.get(cycleUseId).then((list) => {
                if(list === null)
                    return [];
                
                if(!isObject(list)) list = JSON.parse(list);

                for(let id of list){
                    promises.push(this.storage.get(id).then((dataString) => {
                        let data = JSON.parse(dataString);
                        let materialUse = <MaterialUse> data;
                        materialUseList.push(materialUse);
                    }));
                }

                return Promise.all(promises).then(() => {
                    return materialUseList;
                }).catch((error) => {
                    return error;
                });
            }).catch((error) => {
                return error;
            });
        });
        
    }

}