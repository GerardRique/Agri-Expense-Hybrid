import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from './MeasurableDataManager';

@Injectable()
export class OtherMaterialManager extends MeasurableDataManager{
    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    public DATA_ID: string;


    constructor( storage: Storage, otherMaterialUUID: UUID){
        super(storage, otherMaterialUUID);

        this.DATA_ID = "Other_Material";
        this.unitList = ['Bags', 'grams(g)', 'Kilograms(Kg)', 'pounds(lb)', 'Litres(L)', 'millilitres(ml)', 'ounces(oz)', 'Trucks'];

        this.dataList = [];
    }
}