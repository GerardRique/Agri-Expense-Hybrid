import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { DataManager } from '../core/DataManager';
import { PlantMaterialManager } from '../core/PlantMaterialManager';
import { ChemicalsManager } from '../core/ChemicalsManager';
import { FertilizerManager } from '../core/FertilizerManager';
import { SoilAmendmentsManager } from '../core/SoilAmendmentsManager';
import { MeasurableDataManager } from './MeasurableDataManager';

export enum ManagerType{
    PlantMaterial,
    Chemical,
    Fertilizer,
    SoilAmendment
}

@Injectable()
export class MeasurableDataManagerFactory{

    public static PLANT_MATERIAL = "Plant Materials"; 
    public static FERTILIZER = "Fertilizers";
    public static CHEMICAL = "Chemicals";
    public static SOIL_AMENDMENT = "Soil Ammendments";

    constructor(private storage: Storage, private uuid: UUID){

    }

    public getManager(type: string): MeasurableDataManager{
        if(type === null)
            return null;
        else if(type.localeCompare(MeasurableDataManagerFactory.PLANT_MATERIAL) === 0){
            return new PlantMaterialManager(this.storage, this.uuid);
        }
        else if(type.localeCompare(MeasurableDataManagerFactory.CHEMICAL)){
            return new ChemicalsManager(this.storage, this.uuid);
        }
        else if(type.localeCompare(MeasurableDataManagerFactory.FERTILIZER)){
            return new FertilizerManager(this.storage, this.uuid);
        }
        else if(type.localeCompare(MeasurableDataManagerFactory.SOIL_AMENDMENT)){
            return new SoilAmendmentsManager(this.storage, this.uuid);
        }
        return null;
    }
}