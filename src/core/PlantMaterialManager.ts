import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';

@Injectable()
export class PlantMaterialManager extends DataManager{

    constructor(private plantStorage: Storage){
        super(plantStorage);
        this.dataID = "1000"
        this.dataList = [
            {
                "id": "1001",
                "name": "Anise Seed",
                "imagePath": "./assets/"
            },
            {
                "id": "1002",
                "name": "Banana",
                "imagePath": "./assets"
            },
            {
                "id": "1003",
                "name": "Basil",
                "imagePath": "./assets"
            },
            {
                "id": "1004",
                "name": "Bay Leaf",
                "imagePath": "./assets"
            },
            {
                "id": "1005",
                "name": "Beet",
                "imagePath": "./assets"
            },
            {
                "id": "1006",
                "name": "Bhagi",
                "imagePath": "./assets"
            },
            {
                "id": "1007",
                "name": "Bora (Bodi) Bean",
                "imagePath": "./assets"
            },
            {
                "id": "1008",
                "name": "BreadFruit",
                "imagePath": "./assets"
            }
        ];
    }
    
}