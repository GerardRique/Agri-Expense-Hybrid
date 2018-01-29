import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { PlantMaterialManager } from '../core/PlantMaterialManager';
import { UUID } from 'angular2-uuid';
import { Jsonp } from '@angular/http/src/http';
import { FertilizerManager } from './FertilizerManager';
import { ChemicalsManager } from './ChemicalsManager';
import { SoilAmendmentsManager } from './SoilAmendmentsManager';
import { GeneralDataManager } from './GeneralDataManager';
import { MeasurableDataManager } from './MeasurableDataManager';

@Injectable()
export class MaterialManager extends DataManager{
    protected dataList: Array<Object>;

    public DATA_ID: string;

    public static PLANT_MATERIAL = "Plant Material";

    public static CHEMICALS = "Chemicals";

    public static FERTILIZER = "Fertilizer";

    public static SOIL_AMMENDMENTS = "Soil Ammendment";

    constructor(private materialStorage: Storage, private materialUUID: UUID){
        super(materialStorage, materialUUID);
        this.DATA_ID = "Material_List";

        this.dataList = [
            {
                "name": MaterialManager.PLANT_MATERIAL,
                "imagePath": "assets/img/plant_material.jpg"
            },
            {
                "name": MaterialManager.CHEMICALS,
                "imagePath": "assets/img/chemical.jpg"
            },
            {
                "name": MaterialManager.FERTILIZER,
                "imagePath": "assets/img/fertilizer.jpg"
            },
            {
                "name": MaterialManager.SOIL_AMMENDMENTS,
                "imagePath": "assets/img/soil_ammendment.jpg"
            }
        ];
    }

    public getManager(type: string): MeasurableDataManager{
        if(type === null)
            return null;
        if(type.localeCompare(MaterialManager.PLANT_MATERIAL) === 0){
            return new PlantMaterialManager(this.materialStorage, this.materialUUID);
        }

        if(type.localeCompare(MaterialManager.CHEMICALS) === 0){
            return new ChemicalsManager(this.materialStorage, this.materialUUID);
        }

        if(type.localeCompare(MaterialManager.FERTILIZER) === 0){
            return new FertilizerManager(this.materialStorage, this.materialUUID);
        }

        if(type.localeCompare(MaterialManager.SOIL_AMMENDMENTS) === 0){
            return new SoilAmendmentsManager(this.materialStorage, this.materialUUID);
        }

        else {
            let generalManager = new GeneralDataManager(this.materialStorage, this.materialUUID);
            generalManager.setDataId(type);
            return generalManager;
        }

    }
}