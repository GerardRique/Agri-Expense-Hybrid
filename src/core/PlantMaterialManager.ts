import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';

@Injectable()
export class PlantMaterialManager extends DataManager{

    constructor(){
        super();
        this.dataID = "1000"
        this.dataList = [];
    }
    
}