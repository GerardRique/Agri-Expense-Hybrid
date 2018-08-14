import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';

@Injectable()
export class LandUnitManager extends DataManager{
    protected dataList: Array<Object>;

    public DATA_ID: string;

    constructor( storage: Storage,  landUnitUUID: UUID){
        super(storage, landUnitUUID);

        this.DATA_ID = "land_units";
        this.dataList = [
            {
                "name": "Acre",
                "ratioToHectares": "0.404686",
                "ratioToAcres": "1.0"
            },
            {
                "name": "Hectare",
                "ratioToHectares": "1.0"
            },
            {
                "name": "Bed",
                "ratioToHectares": "1.0"
            }
        ];

    }

    //The function below accepts the name of any land unit stored on the device and a quantity of the given land unit. This function returns the quantity of land converted into Hectares(Ha). 
    public convertUnitToHectares(landUnit: string, quantity: number): Observable<number>{
        return Observable.fromPromise(this.getAll().then((list) => {
            for(let unit of list){
                if(landUnit.localeCompare(unit['name']) === 0){
                    let quantityInAcres = quantity * unit['ratioToAcres'];
                    return quantityInAcres;
                }
            }
            throw Error('Land Unit Not Found');
        }));
    }
}