import { DBHandler } from './DBHandler';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PurchaseHandler extends DBHandler{

    KEY_NAME = '0001';

    constructor(storage: Storage){
        super(storage)
    }

    public getTotalExpenses(): Promise<any>{
        return this.storage.ready().then(() => {
            return this.getAll().then((purchases) => {
                let totalExpenses = 0.0;
                for(let purchase of purchases){
                    console.log(purchase);
                    totalExpenses += parseFloat(purchase.cost);
                }
                return totalExpenses;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        })
    }

}