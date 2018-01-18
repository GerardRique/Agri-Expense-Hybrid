import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { DataManager } from "./DataManager";
import { UUID } from "angular2-uuid";
import { SUPER_EXPR } from "@angular/compiler/src/output/output_ast";
import { MaterialUse } from "./MaterialUse";
import { isObject } from "ionic-angular/util/util";

@Injectable()
export class MaterialUseManager extends DataManager{

    //TODO: Test this class!!!!!

    public DATA_ID: string;
    protected dataList: Array<Object>;

    constructor(private materialStorage: Storage, private materialUseUUID: UUID){
        super(materialStorage, materialUseUUID);
        this.DATA_ID = "MaterialUse";
        this.dataList = [];
    }


    public add(data: MaterialUse): Promise<boolean>{
        let promises = [];

        promises.push(super.add(data));

        promises.push(this.materialStorage.ready().then(() => {
            let useId = data.getId();
            let cycleId = data.getCycleId();
            let materialId = data.getMaterialId();

            let cycleUseId = cycleId + "_" + this.DATA_ID;
            let materialUseId = materialId + "_" + this.DATA_ID;

            promises.push(this.materialStorage.get(cycleUseId).then((result) => {
                if(result === null)result = [];

                if(!isObject(result))result = JSON.parse(result);

                result.push(useId);

                let resultString = JSON.stringify(result);
                promises.push(this.materialStorage.set(cycleUseId, resultString));
            }));

            promises.push(this.materialStorage.get(materialUseId).then((result) => {
                if(result === null)result = [];

                if(!isObject(result))result = JSON.parse(result);

                result.push(useId);

                let resultString = JSON.stringify(result);
                promises.push(this.materialStorage.set(materialUseId, useId));
            }));
        }));

        return Promise.all(promises).then(() => {
            return true;
        }).catch((error) => {
            return false;
        });
    }

    public getData(key: string): Promise<Object>{
        return this.materialStorage.ready().then(() => {
            return this.materialStorage.get(key).then((materialString) => {
                let materialObject = JSON.parse(materialString);
                return materialObject;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public getMaterialUsedList(cycleId: string): Promise<Array<Object>>{
        let promises = [];
        let materialUseList = [];

        let cycleUseId = cycleId + "_" + this.DATA_ID;

        promises.push(this.materialStorage.ready().then(() => {
            promises.push(this.materialStorage.get(cycleUseId).then((useIdListString) => {
                let useIdList = JSON.parse(useIdListString);
                for(let id of useIdList){
                    promises.push(this.materialStorage.get(id).then((dataString) => {
                        let data = JSON.parse(dataString);
                        materialUseList.push(data);
                    }));
                }

            }));
        }));

        return Promise.all(promises).then(() => {
            return materialUseList;
        }).catch((error) => {
            return error;
        });
    }

}