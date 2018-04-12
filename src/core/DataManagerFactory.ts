import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { DataManager } from '../core/DataManager';
import { LabourManager } from '../core/LabourManager';
import { CycleManager } from './CyclesModule/CycleManager';
import { PurchaseManager } from './PurchaseManager';
import { SaleManager } from './SaleManager';
import { TaskManager } from './TaskManager';
import { HarvestManager } from './HarvestManager';
import { MaterialUseManager } from './MaterialUseManager';
import { PlantMaterialManager } from './PlantMaterialManager';
import { FertilizerManager } from './FertilizerManager';
import { ChemicalsManager } from './ChemicalsManager';
import { SoilAmendmentsManager } from './SoilAmendmentsManager';
import { MaterialManager } from './MaterialManager';
import { CountryManager } from './CountryModule/CountryManager';



@Injectable()
export class DataManagerFactory{
    

    public static CYCLE: string = "Cycle";
    public static PURCHASE: string = "Purchase";
    public static SALE: string = "Sales";
    public static LABOUR = "Labourers"; 
    public static TASK: string = "Task";
    public static HARVEST: string = "Harvest";
    public static MATERIAL_USE: string = "Material_Use";
    public static MATERIAL: string = "Material";
    public static PLANT_MATERIAL: string = "Plant_Materials";
    public static FERTILIZER: string = "Fertilizer";
    public static CHEMICAL: string = "Chemical";
    public static SOIL_AMMENDMENT: string = "Soil Ammendment";
    public static COUNTRY: string = "Country";


    constructor(private dataStorage: Storage, private uuid: UUID){

    }

    public getManager(type: string): DataManager{
        if(type === null){
            return null;
        }
        else if(type.localeCompare(DataManagerFactory.CYCLE) === 0){
            return new CycleManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.PURCHASE) === 0){
            return new PurchaseManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.SALE) === 0){
            return new SaleManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.TASK) === 0){
            return new TaskManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.HARVEST) === 0){
            return new HarvestManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.MATERIAL_USE) === 0){
            return new MaterialUseManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.LABOUR) === 0){
            return new LabourManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.MATERIAL) === 0){
            return new MaterialManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.PLANT_MATERIAL) === 0){
            return new PlantMaterialManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.FERTILIZER) === 0){
            return new FertilizerManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.CHEMICAL) === 0){
            return new ChemicalsManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.SOIL_AMMENDMENT) === 0){
            return new SoilAmendmentsManager(this.dataStorage, this.uuid);
        }
        else if(type.localeCompare(DataManagerFactory.COUNTRY) === 0){
            return new CountryManager(this.dataStorage, this.uuid);
        }
        return null;
    }
}