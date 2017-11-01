import { DBHandler } from './DBHandler';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PurchaseHandler extends DBHandler{

    private KEY_NAME = '0001';

    constructor(private storage: Storage){
        super()
    }

    public getAll(): Promise<any>{
        let purchaseList = Array<Object>();
        return this.storage.ready().then(() => {
            return this.storage.forEach((value, key, index) => {
                let id = key.substring(0, 4);
                if(id.localeCompare(this.KEY_NAME) === 0){
                    let currentPurchase = JSON.parse(value);
                    purchaseList.push(currentPurchase);
                }
            }).then(() => {
                return purchaseList;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public remove(key): Promise<any>{
        return this.storage.ready().then(() => {
            return this.storage.remove(key).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }

    //Returns a promise that resolves when the given purchases is added to device storage. 
    public add(purchase: Object): Promise<any>{
        return this.storage.ready().then(() => {
            let date = new Date();
            let key = this.KEY_NAME + '_' + date.getTime();
            purchase['id'] = key;
            let purchaseString = JSON.stringify(purchase);
            return this.storage.set(key, purchaseString).then(() => {
                return this;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    //Returns a promise that resolves when all purchases have been cleared. 
    public clearPurchases(): Promise<boolean | void>{
        return this.storage.ready().then(() => {
            return this.storage.forEach((value, key, index) => {
                let id = key.substring(0, 4);
                if(id.localeCompare(this.KEY_NAME) === 0){
                    this.storage.remove(key);
                }
            }).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    //Returns a promise that resolves when the purchase at the given index has been set i.e. edited to the given purhase.
    public edit(purchase: Object, index: number): Promise<any>{
        return this.storage.ready().then(() => {
            let purchaseString = JSON.stringify(purchase);
            let key = purchase['id'];
            return this.storage.set(key, purchaseString).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }

    //Returns a promise that contains the total expenses of all purchases stored on the device. 
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