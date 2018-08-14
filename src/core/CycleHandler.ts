import { DBHandler } from './DBHandler';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CycleHandler extends DBHandler{

    KEY_NAME = '0002';
    constructor(cycleStorage: Storage){
        super(cycleStorage);
        console.log('Cycle Handler instantiated');
    }    

}