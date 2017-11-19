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
    protected dataID: string;

    constructor(private chemicalStorage: Storage, private chemicalsUUID: UUID){
        super(chemicalStorage, chemicalsUUID);
        this.dataID = "2000";
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