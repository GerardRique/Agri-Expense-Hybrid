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


export enum DataManagerType{
    Material,
    PlantMaterial,
    Chemical,
    Fertilizer,
    SoilAmendment
}

@Injectable()
export class DataManagerFactory{
    public static PLANT_MATERIAL = "Plant Materials"; 
    public static FERTILIZER = "Chemicals";
    public static CHEMICAL = "Fertilizer";
    public static SOIL_AMENDMENT = "Soil Ammendments";

    private materiaList = [DataManagerFactory.PLANT_MATERIAL, DataManagerFactory.FERTILIZER, DataManagerFactory.CHEMICAL, DataManagerFactory.SOIL_AMENDMENT];

    constructor(private dataStorage: Storage, private uuid: UUID){

    }

    public getDataList(): Array<string>{
        return this.materiaList;
    }

    public getManager(type: string): DataManager{
        if(type === null){
            return null;
        }
        else if(type.localeCompare(DataManagerFactory.PLANT_MATERIAL) === 0){
            return new PlantMaterialManager(this.dataStorage, this.uuid);
        }

        else if(type.localeCompare(DataManagerFactory.CHEMICAL) === 0){
            return new ChemicalsManager(this.dataStorage, this.uuid);
        }

        else if(type.localeCompare(DataManagerFactory.FERTILIZER) === 0){
            return new FertilizerManager(this.dataStorage, this.uuid);
        }

        else if(type.localeCompare(DataManagerFactory.SOIL_AMENDMENT) === 0){
            return new SoilAmendmentsManager(this.dataStorage, this.uuid);
        }
        return null;
    }
}