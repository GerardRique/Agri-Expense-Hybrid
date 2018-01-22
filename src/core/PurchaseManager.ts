import { Injectable } from "@angular/core";
import { DataManager } from "./DataManager";
import { Storage } from '@ionic/storage';
import { UUID } from "angular2-uuid";

@Injectable()
export class PurchaseManager extends DataManager{
    public DATA_ID: string;
    protected dataList: Array<Object>;

    constructor(public purchaseStorage: Storage, public purchaseUUID: UUID){
        super(purchaseStorage, purchaseUUID);
        this.DATA_ID = "Purchases";
        this.dataList = [];
    }

    public getOfMaterialType(materialId: any): Promise<Array<Object>>{
        let promises = [];
        let list = Array<Object>();
        return this.purchaseStorage.ready().then(() => {
            return super.getAll().then((purchaseList) => {
                for(let purcahse of purchaseList){
                    if(purcahse['materialId'].localeCompare(materialId) === 0)
                        list.push(purcahse);
                }
                return list;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }
}