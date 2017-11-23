import { DBHandler } from './DBHandler';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CycleHandler extends DBHandler{

    KEY_NAME = '0002';
    constructor(private cycleStorage: Storage){
        super(cycleStorage)
    }    

}