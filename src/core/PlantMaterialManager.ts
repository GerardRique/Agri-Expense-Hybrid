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
                "imagePath": "assets/img/anise_seed.jpg"
            },
            {
                "name": "Banana",
                "imagePath": "assets/img/banana.jpg"
            },
            {
                "name": "Basil",
                "imagePath": "assets/img/basil.jpg"
            },
            {
                "name": "Bay Leaf",
                "imagePath": "assets/img/bay_leaf.jpg"
            },
            {
                "name": "Beet",
                "imagePath": "assets/img/beet.jpg"
            },
            {
                "name": "Bhagi",
                "imagePath": "assets/img/bhagi.jpg"
            },
            {
                "name": "Bora (Bodi) Bean",
                "imagePath": "assets/img/bodi_bean.jpg"
            },
            {
                "name": "BreadFruit",
                "imagePath": "assets/img/breadfruit.jpg"
            }
        ];
    }
    
}