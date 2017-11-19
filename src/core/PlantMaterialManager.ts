import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';

@Injectable()
export class PlantMaterialManager extends DataManager{

    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    protected dataID: string;

    constructor(private plantStorage: Storage, private plantMaterialUUID: UUID){
        super(plantStorage, plantMaterialUUID);
        this.dataID = "1000";
        this.unitList = ['Seed', 'Heads', 'Seedling', 'Slips', 'Stick', 'Tubes'];
        this.dataList = [
            {
                "name": "Anise Seed",
                "imagePath": "./assets/"
            },
            {
                "name": "Banana",
                "imagePath": "./assets"
            },
            {
                "name": "Basil",
                "imagePath": "./assets"
            },
            {
                "name": "Bay Leaf",
                "imagePath": "./assets"
            },
            {
                "name": "Beet",
                "imagePath": "./assets"
            },
            {
                "name": "Bhagi",
                "imagePath": "./assets"
            },
            {
                "name": "Bora (Bodi) Bean",
                "imagePath": "./assets"
            },
            {
                "name": "BreadFruit",
                "imagePath": "./assets"
            }
        ];
    }
    
}