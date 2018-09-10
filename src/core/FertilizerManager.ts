import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from './MeasurableDataManager';

@Injectable()
export class FertilizerManager extends MeasurableDataManager{
    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    public DATA_ID: string;


    constructor( fertilizerStorage: Storage,  fertilizerUUID: UUID){
        super(fertilizerStorage, fertilizerUUID);
        this.DATA_ID = "Fertilizer";
        this.unitList = [
            'Bags',
            'ounces(oz)',
            'pounds(lb)',
            'grams(g)',
            'Kilograms(kg)',
            'Litres(L)',
            'millilitres(ml)',
            'Gallons (GAL)'
        ];
        this.dataList = [
            {
                "name": "Cytokin 2-1-6"
            },
            {
                "name": "Cytoplex"
            },
            {
                "name": "Foliar boron (omex)"
            },
            {
                "name": "Greenstim 2-8-14"
            },
            {
                "name": "King foil zinc (omex)"
            },
            {
                "name": "Liquid litter"
            },
            {
                "name": "Nutrient express 4-41-27"
            },
            {
                "name": "Phortify"
            },
            {
                "name": "Powergizer"
            },
            {
                "name": "Sol-u-gro 12-48-8"
            },
            {
                "name": "Sugar express 4-10-40"
            },
            {
                "name": "Omex bio 20"
            },
            {
                "name": "Urea 46-0-0"
            },
            {
                "name": "Techni-grow (7.12.27 + te)"
            },
            {
                "name": "Plant prod (7.12.27)"
            },
            {
                "name": "Magic grow (7.12.40 + te hydrophonic)"
            }
        ];
    }
}