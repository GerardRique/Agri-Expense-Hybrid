import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from './MeasurableDataManager';

@Injectable()

export class HarvestManager extends MeasurableDataManager{
    protected unitList: Array<string>;

    protected dataList: Array<Object>;

    public DATA_ID: string;

    constructor(private harvestStorage: Storage, private harvestUUID: UUID){
        super(harvestStorage, harvestUUID);

        this.DATA_ID = "Harvest";

        this.unitList = ["100's", "5lb Bundle", "Bag", "Bundle", "Head", "Kilograms(Kg)", "pounds(lb)"];

        this.dataList = [];
    }
}