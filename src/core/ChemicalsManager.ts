import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';

@Injectable()
export class ChemicalsManager extends DataManager{

    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    public DATA_ID: string;

    constructor(private chemicalStorage: Storage, private chemicalsUUID: UUID){
        super(chemicalStorage, chemicalsUUID);
        this.unitList = ['grams(g)', 'Kilograms(kg)', 'Litres(L)', 'millitires(ml)', 'ounces(oz)'];
        this.DATA_ID = "Chemical";
        this.dataList = [
            {
                "name": "Algicides"
            },
            {
                "name": "Antimicrobials"
            },
            {
                "name": "Biocides"
            },
            {
                "name": "Biopesticides"
            }
        ]
    }
}