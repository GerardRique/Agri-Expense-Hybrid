import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from './MeasurableDataManager';

@Injectable()
export class SoilAmendmentsManager extends MeasurableDataManager{
    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    public DATA_ID: string;

    constructor(private soilAmendmentStorage: Storage, private soilAmendmentUUID: UUID){
        super(soilAmendmentStorage, soilAmendmentUUID);

        this.unitList = ['Bag', 'Truck'];
        this.DATA_ID = "Soil Ammendment";
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