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
        this.unitList = [ 'Barks', 'Heads','Leaf Fibers', 'Roots', 'Seeds', 'Seedlings', 'Slips','Stems', 'Sticks', 'Tubes'].sort();
        this.dataList = [
            {
                "name": "Anise seed",
                "imagePath": "assets/img/cropImages/anise_seed.jpg"
            },
            {
                "name": "Avocado",
                "imagePath": "assets/img/cropImages/avocado.jpeg"
            },
            {
                "name": "Banana",
                "imagePath": "assets/img/cropImages/banana.jpg"
            },
            {
                "name": "Basil",
                "imagePath": "assets/img/cropImages/basil.jpg"
            },
            {
                "name": "Bay leaf",
                "imagePath": "assets/img/cropImages/bay_leaf.jpg"
            },
            {
                "name": "Beet",
                "imagePath": "assets/img/cropImages/beet.jpg"
            },
            {
                "name": "Bhagi",
                "imagePath": "assets/img/cropImages/bhagi.jpg"
            },
            {
                "name": "Bora (bodi) bean",
                "imagePath": "assets/img/cropImages/bodi_bean.jpg"
            },
            {
                "name": "Breadfruit",
                "imagePath": "assets/img/cropImages/breadfruit.jpg"
            },
            {
                "name":"Breadnut (chataigne)",
                "imagePath": "assets/img/cropImages/chataigne.jpg"
            },
            {
                "name":"Broccoli",
                "imagePath": "assets/img/cropImages/broccoli.jpg"
            },
            {
                "name":"Cabbage",
                "imagePath": "assets/img/cropImages/cabbage.jpg"
            },
            {
                "name":"Cabbage (purple)",
                "imagePath": "assets/img/cropImages/purple_cabbage.png"
            },
            {
                "name":"Caraille",
                "imagePath": "assets/img/cropImages/caraillie.jpg"
            },
            {
                "name":"Carambola",
                "imagePath": "assets/img/cropImages/carambola.jpg"
            },
            {
                "name":"Carrots",
                "imagePath": "assets/img/cropImages/carrot.jpg"
            },
            {
                "name":"Cassava",
                "imagePath": "assets/img/cropImages/cassava.jpg"
           },
           {
                "name":"Cauliflower",
                "imagePath": "assets/img/cropImages/cauliflower.jpg"
           },
           {
                "name":"Celery",
                "imagePath": "assets/img/cropImages/celery.jpg"
           },
           {
                "name":"Cherry",
                "imagePath": "assets/img/cropImages/bajan_cherry.jpg"
           },
           {
                "name":"Chive",
                "imagePath": "assets/img/cropImages/chive.jpg"
           },
           {
                "name":"Christophene",
                "imagePath": "assets/img/cropImages/christophene.jpg"
           },
           {
                "name":"Cocoa",
                "imagePath": "assets/img/cropImages/cocoa.jpg"
           },
           {
                "name":"Coconut",
                "imagePath": "assets/img/cropImages/coconut.jpg"
           },
           {
                "name":"Corn",
                "imagePath": "assets/img/cropImages/corn.jpg"
           },
           {
                "name":"Cucumber",
                "imagePath": "assets/img/cropImages/cucumber.jpg"
           },
           {
                "name":"Culantro (shado beni / bandania)",
                "imagePath": "assets/img/cropImages/shadon_beni.jpg"
           },
           {
                "name":"Dasheen",
                "imagePath": "assets/img/cropImages/dasheen.jpg"
           },
           {
                "name":"Dasheen bush",
                "imagePath": "assets/img/cropImages/dasheen_bush.jpg"
           },
           {
                "name":"Eddoes",
                "imagePath": "assets/img/cropImages/eddoe.jpg"
           },
           {
                "name":"Eggplant",
                "imagePath": "assets/img/cropImages/eggplant.jpg"
           },
           {
                "name":"Escallion",
                "imagePath": "assets/img/cropImages/escallion.jpg"
           },
           {
                "name":"Ginger",
                "imagePath": "assets/img/cropImages/ginger.jpg"
           },
           {
                "name":"Grapefruit",
                "imagePath": "assets/img/cropImages/grapefruit.jpg"
           },
           {
                "name":"Green fig",
                "imagePath": "assets/img/cropImages/banana.jpg"
           },
           {
                "name":"Hot pepper",
                "imagePath": "assets/img/cropImages/hot_pepper.jpg"
           },
           {
                "name":"Kale",
                "imagePath": "assets/img/cropImages/kale.jpg"
            },
           {
                "name":"Lettuce",
                "imagePath": "assets/img/cropImages/lettuce.jpg"
           },
           {
                "name":"Lettuce (butter)",
                "imagePath": "assets/img/cropImages/lettuce_butter.jpg"
            },
           {
                "name":"Lime",
                "imagePath": "assets/img/cropImages/lime.jpg"
           },
           {
                "name":"Maize (corn)",
                "imagePath": "assets/img/cropImages/corn.jpg"
           },
           {
                "name":"Mango",
                "imagePath": "assets/img/cropImages/mango.jpg"
           },
           {
                "name":"Melongene (baigan)",
                "imagePath": "assets/img/cropImages/melongene.jpg"
            },
           {
                "name":"Mint",
                "imagePath": "assets/img/cropImages/mint.jpg"
           },
           {
                "name":"Nutmeg",
                "imagePath": "assets/img/cropImages/nutmeg.jpg"
           },
           {
                "name":"Ochro",
                "imagePath": "assets/img/cropImages/ochro.jpg"
           },
           {
                "name":"Oranges",
                "imagePath": "assets/img/cropImages/orange.jpg"
           },
           {
                "name":"Parsley",
                "imagePath": "assets/img/cropImages/parsley.jpg"
            },
           {
                "name":"Patchoi",
                "imagePath": "assets/img/cropImages/patchoi.jpg"
            },
           {
                "name":"Paw paw",
                "imagePath": "assets/img/cropImages/paw_paw.jpg"
           },
           {
                "name":"Peanuts",
                "imagePath": "assets/img/cropImages/peanuts.jpg"
           },
           {
                "name":"Pigeon peas",
                "imagePath": "assets/img/cropImages/pigeon_pea.jpg"
           },
           {
                "name":"Pimento pepper",
                "imagePath": "assets/img/cropImages/pimento.jpg"
           },
           {
                "name":"Pineapple",
                "imagePath": "assets/img/cropImages/pineapple.jpg"
           },
           {
                "name":"Plantain",
                "imagePath": "assets/img/cropImages/plantain.jpg"
           },
           {
                "name":"Portugal",
                "imagePath": "assets/img/cropImages/portugal.jpg"
           },
           {
                "name":"Pumpkin",
                "imagePath": "assets/img/cropImages/pumpkin.jpg"
           },
           {
                "name":"Rice",
                "imagePath": "assets/img/cropImages/rice.jpg"
           },
           {
                "name":"Seim",
                "imagePath": "assets/img/cropImages/seim_bean.jpg"
           },
           {
                "name":"Silk fig",
                "imagePath": "assets/img/cropImages/silk_fig.jpg"
            },
           {
                "name":"Sorrel",
                "imagePath": "assets/img/cropImages/sorrel.jpg"
           },
           {
                "name":"Soyabean",
                "imagePath": "assets/img/cropImages/soybean.jpg"
           },
           {
                "name":"Squash",
                "imagePath": "assets/img/cropImages/squash.jpg"
           },
           {
                "name":"String beans",
                "imagePath": "assets/img/cropImages/string_beans.jpg"
            },
           {
                "name":"Sweet pepper",
                "imagePath": "assets/img/cropImages/sweet_pepper.jpg"
           },
           {
                "name":"Sweet potato",
                "imagePath": "assets/img/cropImages/sweet_potato.jpg"
           },
           {
                "name":"Thyme - fine",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"Thyme - french",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"Thyme - spanish",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"Tomato",
                "imagePath": "assets/img/cropImages/tomato.jpg"
           },
           {
                "name":"Tomato (cherry)",
                "imagePath": "assets/img/cropImages/tomato.jpg"
            },
           {
                "name":"Tumeric (saffron)",
                "imagePath": "assets/img/cropImages/turmeric.jpg"
           },
           {
                "name":"Vine spinach (poi bhagi)",
                "imagePath": "assets/img/cropImages/spinach.jpg"
           },
           {
                "name":"Watercress",
                "imagePath": "assets/img/cropImages/watercress.jpg"
           },
           {
                "name":"Watermelon",
                "imagePath": "assets/img/cropImages/watermelon.jpg"
           },
           {
                "name":"Yam",
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
