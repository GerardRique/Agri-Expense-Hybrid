import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { PlantMaterialManager } from '../core/PlantMaterialManager';
import { UUID } from 'angular2-uuid';
import { Jsonp } from '@angular/http/src/http';

@Injectable()
export class MaterialManager{
    protected dataList: Array<Object>;

    public DATA_ID: string;

    constructor(private materialStorage: Storage, private materialUUID: UUID){
        this.DATA_ID = "Material _List";
        // this.dataList = [
        //     "Plant Materials", 
        //     "Chemicals", 
        //     "Fertilizer", 
        //     "Soil Ammendments"
        // ];

        this.dataList = [
            {
                "name": "Plant Materials",
                "imagePath": "assets/img/plant_material.jpg"
            },
            {
                "name": "Chemicals",
                "imagePath": "assets/img/chemical.jpg"
            },
            {
                "name": "Fertilizer",
                "imagePath": "assets/img/fertilizer.jpg"
            },
            {
                "name": "Soil Ammendment",
                "imagePath": "assets/img/soil_ammendment.jpg"
            }
        ];
    }

    public setData(): Promise<any>{
        let dataListString = JSON.stringify(this.dataList);
        return this.materialStorage.ready().then(() => {
            return this.materialStorage.set(this.DATA_ID, dataListString).then(() => {
                return this;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        })
    }

    public retrieveAll(): Promise<Array<Object>>{
        let list = Array<Object>();

        return this.materialStorage.ready().then(() => {
            return this.materialStorage.get(this.DATA_ID).then((dataString) => {
                list = JSON.parse(dataString);
                return list;
            })
        })
    }

    public initialize(): Promise<any>{
        return this.checkInitialization().then((result) => {
            if(result == false){
                return this.setData().then(() => {
                    return true;
                }).catch((error) => {
                    return false;
                });
            }
            else {
                return true;
            }
        }).catch((error) => {
            return false;
        })
    }

    public checkInitialization(): Promise<boolean>{
        return this.materialStorage.ready().then(() => {
            return this.materialStorage.get(this.DATA_ID).then((result) => {
                if(result === null)
                    return false;
                else 
                    return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }
}