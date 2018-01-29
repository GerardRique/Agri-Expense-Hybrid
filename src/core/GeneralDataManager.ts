import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { MeasurableDataManager } from './MeasurableDataManager';

@Injectable()
export class GeneralDataManager extends MeasurableDataManager{
    public DATA_ID;

    protected dataList;

    public unitList;

    constructor(private generalStorage: Storage, private generalUUID: UUID){
        super(generalStorage, generalUUID);

        this.unitList = [];

        this.DATA_ID = '';
    }

    public setDataId(dataId: string){
        this.DATA_ID = dataId;
    }
}