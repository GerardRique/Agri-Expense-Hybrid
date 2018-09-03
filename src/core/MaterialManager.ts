import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DataManager } from './DataManager';
import { PlantMaterialManager } from '../core/PlantMaterialManager';
import { UUID } from 'angular2-uuid';
import { FertilizerManager } from './FertilizerManager';
import { ChemicalsManager } from './ChemicalsManager';
import { SoilAmendmentsManager } from './SoilAmendmentsManager';
import { GeneralDataManager } from './GeneralDataManager';
import { MeasurableDataManager } from './MeasurableDataManager';
import { OtherMaterialManager } from './OtherMaterialManager';

@Injectable()
export class MaterialManager extends DataManager{
    protected dataList: Array<Object>;

    public DATA_ID: string;

    public static PLANT_MATERIAL = "Plant Material";

    public static CHEMICALS = "Chemical";

    public static FERTILIZER = "Fertilizer";

    public static SOIL_AMMENDMENTS = "Soil Amendment";

    public static OTHER_MATERIAL = "Other Expenses"

    constructor(private materialStorage: Storage, private materialUUID: UUID){
        super(materialStorage, materialUUID);
        this.DATA_ID = "Material_List";

        this.dataList = [
            {
                "name": MaterialManager.PLANT_MATERIAL,
                "imagePath": "assets/img/plant_material.jpg",
                "color": "#459506"
            },
            {
                "name": MaterialManager.CHEMICALS,
                "imagePath": "assets/img/chemical.jpg",
                "color": "#9345EC"
            },
            {
                "name": MaterialManager.FERTILIZER,
                "imagePath": "assets/img/fertilizer.jpg",
                "color": "#2958EA"
            },
            {
                "name": MaterialManager.SOIL_AMMENDMENTS,
                "imagePath": "assets/img/soil_ammendment.jpg",
                "color": "#DC7633"
            },
            {
                "name": MaterialManager.OTHER_MATERIAL,
                "imagePath": "assets/img/open_box.png",
                "color": "#2ECC71"
            }
        ];
    }

    public getManager(type: string): MeasurableDataManager{
        if(type === null)
            return null;
        let typeModified = type.toUpperCase();
        if(typeModified.localeCompare(MaterialManager.PLANT_MATERIAL.toUpperCase()) === 0){
            return new PlantMaterialManager(this.materialStorage, this.materialUUID);
        }

        if(typeModified.localeCompare(MaterialManager.CHEMICALS.toUpperCase()) === 0){
            return new ChemicalsManager(this.materialStorage, this.materialUUID);
        }

        if(typeModified.localeCompare(MaterialManager.FERTILIZER.toUpperCase()) === 0){
            return new FertilizerManager(this.materialStorage, this.materialUUID);
        }

        if(typeModified.localeCompare(MaterialManager.SOIL_AMMENDMENTS.toUpperCase()) === 0){
            return new SoilAmendmentsManager(this.materialStorage, this.materialUUID);
        }
        if(typeModified.localeCompare(MaterialManager.OTHER_MATERIAL.toUpperCase()) === 0){
            return new OtherMaterialManager(this.materialStorage, this.materialUUID);
        }

        else {
            let generalManager = new GeneralDataManager(this.materialStorage, this.materialUUID);
            generalManager.setDataId(type);
            return generalManager;
        }

    }
}