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
export class MaterialManager extends DataManager{
    protected dataList: Array<Object>;

    public DATA_ID: string;

    constructor(private materialStorage: Storage, private materialUUID: UUID){
        super(materialStorage, materialUUID);
        this.DATA_ID = "Material _List";

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
}