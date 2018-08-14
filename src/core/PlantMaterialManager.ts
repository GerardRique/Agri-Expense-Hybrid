import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { MeasurableDataManager } from './MeasurableDataManager';
import { UUID } from 'angular2-uuid';

@Injectable()
export class PlantMaterialManager extends MeasurableDataManager{

    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    public DATA_ID: string;

    constructor(storage: Storage, plantMaterialUUID: UUID){
        super(storage, plantMaterialUUID);
        this.DATA_ID = "Plant Material";
        this.unitList = ['Seed', 'Heads', 'Seedling', 'Slips', 'Stick', 'Tubes'];
        this.dataList = [
            {
                "name": "ANISE SEED",
                "imagePath": "assets/img/cropImages/anise_seed.jpg"
            },
            {
                "name": "AVOCADO",
                "imagePath": "assets/img/cropImages/avocado.jpeg"
            },
            {
                "name": "BANANA",
                "imagePath": "assets/img/cropImages/banana.jpg"
            },
            {
                "name": "BASIL",
                "imagePath": "assets/img/cropImages/basil.jpg"
            },
            {
                "name": "Bay Leaf",
                "imagePath": "assets/img/cropImages/bay_leaf.jpg"
            },
            {
                "name": "BEET",
                "imagePath": "assets/img/cropImages/beet.jpg"
            },
            {
                "name": "BHAGI",
                "imagePath": "assets/img/cropImages/bhagi.jpg"
            },
            {
                "name": "BORA (Bodi) BEAN",
                "imagePath": "assets/img/cropImages/bodi_bean.jpg"
            },
            {
                "name": "BREADFRUIT",
                "imagePath": "assets/img/cropImages/breadfruit.jpg"
            },
            {
                "name":"BREADNUT (CHATAIGNE)",
                "imagePath": "assets/img/cropImages/chataigne.jpg"
            },
            {
                "name":"BROCCOLI",
                "imagePath": "assets/img/cropImages/broccoli.jpg"
            },
            {
                "name":"CABBAGE",
                "imagePath": "assets/img/cropImages/cabbage.jpg"
            },
            {
                "name":"CABBAGE (PURPLE)",
                "imagePath": "assets/img/cropImages/purple_cabbage.png"
            },
            {
                "name":"CARAILLI",
                "imagePath": "assets/img/cropImages/caraillie.jpg"
            },
            {
                "name":"CARAMBOLA",
                "imagePath": "assets/img/cropImages/carambola.jpg"
            },
            {
                "name":"CARROTS",
                "imagePath": "assets/img/cropImages/carrot.jpg"
            },
            {
                "name":"CASSAVA",
                "imagePath": "assets/img/cropImages/cassava.jpg"
           },
           {
                "name":"CAULIFLOWER",
                "imagePath": "assets/img/cropImages/cauliflower.jpg"
           },
           {
                "name":"CELERY",
                "imagePath": "assets/img/cropImages/celery.jpg"
           },
           {
                "name":"CHERRY",
                "imagePath": "assets/img/cropImages/bajan_cherry.jpg"
           },
           {
                "name":"CHIVE",
                "imagePath": "assets/img/cropImages/chive.jpg"
           },
           {
                "name":"CHRISTOPHENE",
                "imagePath": "assets/img/cropImages/christophene.jpg"
           },
           {
                "name":"COCOA",
                "imagePath": "assets/img/cropImages/cocoa.jpg"
           },
           {
                "name":"COCONUT",
                "imagePath": "assets/img/cropImages/coconut.jpg"
           },
           {
                "name":"CORN",
                "imagePath": "assets/img/cropImages/corn.jpg"
           },
           {
                "name":"CUCUMBER",
                "imagePath": "assets/img/cropImages/cucumber.jpg"
           },
           {
                "name":"CULANTRO (SHADON BENI / BANDANIA)",
                "imagePath": "assets/img/cropImages/shadon_beni.jpg"
           },
           {
                "name":"DASHEEN",
                "imagePath": "assets/img/cropImages/dasheen.jpg"
           },
           {
                "name":"DASHEEN BUSH",
                "imagePath": "assets/img/cropImages/dasheen_bush.jpg"
           },
           {
                "name":"EDDOES",
                "imagePath": "assets/img/cropImages/eddoe.jpg"
           },
           {
                "name":"EGGPLANT",
                "imagePath": "assets/img/cropImages/eggplant.jpg"
           },
           {
                "name":"ESCALLION",
                "imagePath": "assets/img/cropImages/escallion.jpg"
           },
           {
                "name":"GINGER",
                "imagePath": "assets/img/cropImages/ginger.jpg"
           },
           {
                "name":"GRAPEFRUIT",
                "imagePath": "assets/img/cropImages/grapefruit.jpg"
           },
           {
                "name":"GREEN FIG",
                "imagePath": "assets/img/cropImages/banana.jpg"
           },
           {
                "name":"HOT PEPPER",
                "imagePath": "assets/img/cropImages/hot_pepper.jpg"
           },
           {
                "name":"KALE",
                "imagePath": "assets/img/cropImages/kale.jpg"
            },
           {
                "name":"LETTUCE",
                "imagePath": "assets/img/cropImages/lettuce.jpg"
           },
           {
                "name":"LETTUCE (BUTTER)",
                "imagePath": "assets/img/cropImages/lettuce_butter.jpg"
            },
           {
                "name":"LIME",
                "imagePath": "assets/img/cropImages/lime.jpg"
           },
           {
                "name":"MAIZE (CORN)",
                "imagePath": "assets/img/cropImages/corn.jpg"
           },
           {
                "name":"MANGO",
                "imagePath": "assets/img/cropImages/mango.jpg"
           },
           {
                "name":"MELONGENE (BAIGAN)",
                "imagePath": "assets/img/cropImages/melongene.jpg"
            },
           {
                "name":"MINT",
                "imagePath": "assets/img/cropImages/mint.jpg"
           },
           {
                "name":"NUTMEG",
                "imagePath": "assets/img/cropImages/nutmeg.jpg"
           },
           {
                "name":"OCHRO",
                "imagePath": "assets/img/cropImages/ochro.jpg"
           },
           {
                "name":"ORANGES",
                "imagePath": "assets/img/cropImages/orange.jpg"
           },
           {
                "name":"PARSLEY",
                "imagePath": "assets/img/cropImages/parsley.jpg"
            },
           {
                "name":"PATCHOI",
                "imagePath": "assets/img/cropImages/patchoi.jpg"
            },
           {
                "name":"PAW PAW",
                "imagePath": "assets/img/cropImages/paw_paw.jpg"
           },
           {
                "name":"PEANUTS",
                "imagePath": "assets/img/cropImages/peanuts.jpg"
           },
           {
                "name":"PIGEON PEAS",
                "imagePath": "assets/img/cropImages/pigeon_pea.jpg"
           },
           {
                "name":"PIMENTO PEPPER",
                "imagePath": "assets/img/cropImages/pimento.jpg"
           },
           {
                "name":"PINEAPPLE",
                "imagePath": "assets/img/cropImages/pineapple.jpg"
           },
           {
                "name":"PLANTAIN",
                "imagePath": "assets/img/cropImages/plantain.jpg"
           },
           {
                "name":"PORTUGAL",
                "imagePath": "assets/img/cropImages/portugal.jpg"
           },
           {
                "name":"PUMPKIN",
                "imagePath": "assets/img/cropImages/pumpkin.jpg"
           },
           {
                "name":"RICE",
                "imagePath": "assets/img/cropImages/rice.jpg"
           },
           {
                "name":"SEIM",
                "imagePath": "assets/img/cropImages/seim_bean.jpg"
           },
           {
                "name":"SILK FIG",
                "imagePath": "assets/img/cropImages/silk_fig.jpg"
            },
           {
                "name":"SORREL",
                "imagePath": "assets/img/cropImages/sorrel.jpg"
           },
           {
                "name":"SOYABEAN",
                "imagePath": "assets/img/cropImages/soybean.jpg"
           },
           {
                "name":"SQUASH",
                "imagePath": "assets/img/cropImages/squash.jpg"
           },
           {
                "name":"STRING BEANS",
                "imagePath": "assets/img/cropImages/string_beans.jpg"
            },
           {
                "name":"SWEET PEPPER",
                "imagePath": "assets/img/cropImages/sweet_pepper.jpg"
           },
           {
                "name":"SWEET POTATO",
                "imagePath": "assets/img/cropImages/sweet_potato.jpg"
           },
           {
                "name":"THYME - FINE",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"THYME - FRENCH",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"THYME - SPANISH",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"TOMATO",
                "imagePath": "assets/img/cropImages/tomato.jpg"
           },
           {
                "name":"TOMATO (CHERRY)",
                "imagePath": "assets/img/cropImages/tomato.jpg"
            },
           {
                "name":"TUMERIC (SAFFRON)",
                "imagePath": "assets/img/cropImages/turmeric.jpg"
           },
           {
                "name":"VINE SPINACH (POI BHAGI)",
                "imagePath": "assets/img/cropImages/spinach.jpg"
           },
           {
                "name":"WATERCRESS",
                "imagePath": "assets/img/cropImages/watercress.jpg"
           },
           {
                "name":"WATERMELON",
                "imagePath": "assets/img/cropImages/watermelon.jpg"
           },
           {
                "name":"YAM",
                "imagePath": "assets/img/cropImages/yam.jpg"
           }
        ];
    }

    //The getData function returns a promise that contains an object that contains data on a plant material given the id of the plant material. 
    public getData(key: string): Promise<Object>{
        return this.storage.ready().then(() => {
            return this.storage.get(key).then((materialString) => {
                let materialObject = JSON.parse(materialString);
                return materialObject;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }
}