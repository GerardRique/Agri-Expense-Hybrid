import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';

@Injectable()
export class FertilizerManager extends DataManager{
    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    public DATA_ID: string;


    constructor(private fertilizerStorage: Storage, private fertilizerUUID: UUID){
        super(fertilizerStorage, fertilizerUUID);
        this.DATA_ID = "Fertilizer";
        this.unitList = ['Bags', 'grams(g)', 'Kilograms(Kg)', 'pounds(lb)'];
        this.dataList = [
            {
                "name": "UREA 46-0-0"
            },
            {
                "name": "Techni-Grow (7.12.27 + TE)"
            },
            {
                "name": "Plant Prod (7.12.27)"
            },
            {
                "name": "Magic Grow (7.12.40 + TE HYDROPHONIC)"
            }
        ];
    }
}