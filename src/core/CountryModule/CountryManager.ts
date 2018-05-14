import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from '../DataManager';
import { UUID } from 'angular2-uuid';
import { Country } from './Country';

@Injectable()

export class CountryManager extends DataManager{
    public DATA_ID: string;

    protected dataList: Array<Object>;

    private province_key: string = "provinces";

    constructor(private countryStorage: Storage, private countryUUID: UUID){
        super(countryStorage, countryUUID);

        this.DATA_ID = "Country";

        this.dataList = [
            {
                "name": "Anguilla",
                "counties": ["Blowing Point","East End","George Hill","Island Harbour","North Hill","North Side","Sandy Ground","Sandy Hill","South Hill","Stoney Ground","The Farrington","The Quarter","The Valley","West End"]
            },
            {
                "name": "Antigua & Barbuda",
                "counties": ["St George", "St John", "St Mary", "St Paul", "St Peter", "St Phillip", "Barbuda", "Redonda"]
            },
            {
                "name": "Bahamas",
                "counties": ["Bimini", "New Providence", "Grand Bahama", "Andros", "Spanish Wells"]
            },
            {
                "name": "Barbados",
                "counties": ["Christ Church","St James","St Lucy","St Michael","St Peter","St Thomas","St Andrew","St George","St Joseph","St Phillip","St John"]
            },
            {
                "name": "Belize",
                "counties": ["Belize","Cayo","Orange Walk","Corozal","Stan Creek","Toledo"]
            },
            {
                "name": "British Virgin Islands",
                "counties": [ "Tortola", "Virgin Gorda", "Anegada", "Jost Van Dyke"]
            },
            {
                "name": "Cayman Islands",
                "counties": ["Grand Cayman", "Little Cayman", "Cayman Brac"]
            },
            {
                "name": "Dominica",
                "counties": ["St George", "St John", "St Peter", "St Joseph", "St Paul", "St Luke", "St Mark", "St Patrick", "St David", "St Andrew"]
            },
            {
                "name": "Grenada",
                "counties": ["St Andrew", "St David", "St George", "St John", "St Mark", "St Patrick", "Carriacou", "Petite Martinuque"]
            },
            {
                "name": "Guyana",
                "counties": ["Barima-Waini", "Pomeroon-Supenaam", "Essequibo Islands-West Demerara", "Demerara-Mahaica", "Mahaica-Berbice", "East Berbice-Corentyne", "Cuyuni-Mazaruni", "Potaro-Siparuni", "Upper Takutu-Upper Essequibo", "Upper Demerara-Berbice"]
            },
            {
                "name": "Haiti",
                "counties": ["Nord", "Nord Quest", "Nord Est", "Artibontie", "Centre", "Quest", "Sud Est", "Grand Anse", "Sud"]
            },
            {
                "name": "Jamaica",
                "counties": ["Clarendon", "Hanover", "Kingston", "Manchester", "Portland", "St Ann", "St Andrew", "St Catherine", "St Elizabeth", "St James", "St Mary", "St Thomas", "Trelawny", "Westmoreland"]
            },
            {
                "name": "Monsterrat",
                "counties": ["St Peter", "St Anthony", "St Georges"]
            },
            {
                "name": "St Kitts & Nevis",
                "counties": ["Nevis", "St George", "St Thomas", "St Anne", "St Paul", "St John", "Christ Church", "St Mary", "St Peter"]
            },
            {
                "name": "St Lucia",
                "counties": ["Anse la Raye", "Castries", "Choiseul", "Dauphin", "Dennery", "Gros Islet", "Laborie", "Micoud", "Praslin", "Soufriere", "Vieux Fort"]
            },
            {
                "name": "St. Vincent and the Genadines",
                "counties": ["Charlotte", "Northern Grenadines", "Southern Grenadines", "St Andrew", "St David", "St George", "St Patrick"]
            },
            {
                "name": "Suriname",
                "counties": ["Brokopondo", "Commewijne", "Coronie", "Marowijne", "Nickerie", "Para", "Paramaribo", "Saramacca", "Sipaliwini", "Wanica"]
            },
            {
                "name": "Trinidad and Tobago",
                "counties": ["St George", "St David", "Caroni", "St Andrew", "Victoria", "Nariva", "St Patrick", "Mayaro"]
            },
            {
                "name": "Turks & Caicos Islands",
                "counties": ["Providenciales", "Grand Turk Island", "Caicos Islands"]
            }
        ]
    }

    public initialize(): Promise<any>{
        let promises = [];
        let uniqueIDs = [];

        return this.countryStorage.ready().then(() => {
            for(let country of this.dataList){
                let myCountry = new Country(country['name']);
                uniqueIDs.push(myCountry.getId());

                let countryString = JSON.stringify(myCountry);
                promises.push(this.countryStorage.set(myCountry.getId(), countryString));

                let counties = country['counties'];
                let countiesId = myCountry.getId() + "_" + this.province_key;
                let countyString = JSON.stringify(counties);
                promises.push(this.countryStorage.set(countiesId, countyString));  
            }

            let uuidListString = JSON.stringify(uniqueIDs);
            promises.push(this.countryStorage.set(this.DATA_ID, uuidListString));

            return Promise.all(promises).then(() => {
                console.log("Initialized data for " + this.DATA_ID);
                return this;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }

    public getCounties(countryId: string): Promise<Array<string>>{
        return this.countryStorage.ready().then(() => {
            let countiesId = countryId + "_" + this.province_key;

            return this.countryStorage.get(countiesId).then((countyString) => {
                let countyList = JSON.parse(countyString);

                let sortedList = countyList.sort();
                return sortedList;
            })
        }).catch((error) => {
            return [];
        })
    }
}

