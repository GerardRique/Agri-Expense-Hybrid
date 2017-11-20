import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';

@Injectable()
export class SoilAmendmentsManager extends DataManager{
    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    protected dataID: string;

    constructor(private soilAmendmentStorage: Storage, private soilAmendmentUUID: UUID){
        super(soilAmendmentStorage, soilAmendmentUUID);

        this.unitList = ['Bag', 'Truck'];
        this.dataID = "4000";
        this.dataList = [
            {
                "name": "Calphos"
            },
            {
                "name": "Chicken Manure"
            },
            {
                "name": "Compost"
            },
            {
                "name": "Cow Manure"
            },
            {
                "name": "Gypsum"
            },
            {
                "name": "Horse Manure"
            },
            {
                "name": "Limestone"
            },
            {
                "name": "Molasses"
            },
            {
                "name": "Sharp sand"
            },
            {
                "name": "Sulphur"
            }
        ]
    }
}