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
                "name": "CYTOKIN 2-1-6"
            },
            {
                "name": "CYTOPLEX"
            },
            {
                "name": "FOLIAR BORON (OMEX)"
            },
            {
                "name": "GREENSTIM 2-8-14"
            },
            {
                "name": "KING FOIL ZINC (OMEX)"
            },
            {
                "name": "LIQUID LITTER"
            },
            {
                "name": "NUTRIENT EXPRESS 4-41-27"
            },
            {
                "name": "PHORTIFY"
            },
            {
                "name": "POWERGIZER"
            },
            {
                "name": "SOL-U-GRO 12-48-8"
            },
            {
                "name": "SUGAR EXPRESS 4-10-40"
            },
            {
                "name": "OMEX BIO 20"
            },
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