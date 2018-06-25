import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { DataManager } from './DataManager';
import { UUID } from 'angular2-uuid';
import { Sale } from './Sale';
import { isObject } from 'ionic-angular/util/util';

@Injectable()
export class SaleManager extends DataManager{
    public DATA_ID: string;
    protected dataList: Array<Object>;

    constructor(private saleStorage: Storage, private saleUUID: UUID){
        super(saleStorage, saleUUID);

        this.DATA_ID = "Sales";
        this.dataList = [];
    }

    public getByCycleId(cycleId: string): Promise<Array<Sale>>{
        return this.saleStorage.ready().then(() => {
            let cycleSaleId = this.DATA_ID + "_" + cycleId;

            let promises = [];

            let saleListing = new Array<Object>();

            return this.saleStorage.get(cycleSaleId).then((saleIdList) => {
                if(saleIdList === null)
                    return [];
                if(!isObject(saleIdList))
                    saleIdList = JSON.parse(saleIdList);
                
                
                for(let id of saleIdList){
                    promises.push(this.saleStorage.get(id).then((sale) => {
                        let data = JSON.parse(sale);

                        let saleData = <Sale>data;

                        saleListing.push(saleData);
                    }));
                }

                return Promise.all(promises).then(() => {
                    return saleListing;
                }).catch((error) => {
                    return error;
                });
            }).catch((error) => {
                return error;
            })
        }).catch((error) => {
            return error;
        })
    }

    public add(data: Sale): Promise<boolean>{
        let promises = [];

        promises.push(super.add(data));

        return this.saleStorage.ready().then(() => {
            let saleId = data.getId();

            let cycleId = data.getCycleId();
            let harvestId = data.getHarvestId();

            let cycleSaleId = this.DATA_ID + "_" + cycleId;
            let harvestSaleId = this.DATA_ID + "_" + harvestId;

            promises.push(this.saleStorage.get(cycleSaleId).then((result) => {
                if(result === null)
                    result = [];
                if(!isObject(result))
                    result = JSON.parse(result);
                result.push(saleId);

                let resultString = JSON.stringify(result);
                this.saleStorage.set(cycleSaleId, resultString);
            }));

            promises.push(this.saleStorage.get(harvestSaleId).then((result) => {
                if(result === null)
                    result = [];
                if(!isObject(result))
                    result = JSON.parse(result);

                result.push(saleId);

                let resultString = JSON.stringify(result);

                this.saleStorage.set(harvestSaleId, resultString);
            }));

            return Promise.all(promises).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }
}