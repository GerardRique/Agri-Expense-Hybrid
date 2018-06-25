import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from './MeasurableDataManager';

@Injectable()
export class OtherMaterialManager extends MeasurableDataManager{
    protected unitList: Array<string>;

    protected dataList: Array<Object>;

    public DATA_ID: string;


    constructor(private otherMaterialStorage: Storage, private otherMaterialUUID: UUID){
        super(otherMaterialStorage, otherMaterialUUID);

        this.DATA_ID = "Other_Material";
        this.unitList = ['Bags', 'grams(g)', 'Kilograms(Kg)', 'pounds(lb)', 'Litres(L)', 'millilitres(ml)', 'ounces(oz)', 'Trucks'];

        this.dataList = [];
    }
}