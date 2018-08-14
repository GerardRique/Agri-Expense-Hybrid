import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DataManager } from '../DataManager';
import { UUID } from 'angular2-uuid';
import { Country } from './Country';

@Injectable()

export class CountryManager extends DataManager{
    DATA_ID: string;
    protected dataList: Array<Object>;
    private province_key: string = "provinces";

    constructor(storage: Storage, countryUUID: UUID){
        super(storage, countryUUID);
        this.DATA_ID = "Country";
        this.dataList = [
            {
                "name": "Anguilla",
                "subDivisionTitle": "district",
                "subDivisions": ["Blowing Point","East End","George Hill","Island Harbour","North Hill","North Side","Sandy Ground","Sandy Hill","South Hill","Stoney Ground","The Farrington","The Quarter","The Valley","West End"]
            },
            {
                "name": "Antigua & Barbuda",
                "subDivisionTitle": "parish",
                "subDivisions": ["St George", "St John", "St Mary", "St Paul", "St Peter", "St Phillip", "Barbuda", "Redonda"]
            },
            {
                "name": "Bahamas",
                "subDivisionTitle": "island",
                "subDivisions": ["Bimini", "New Providence", "Grand Bahama", "Andros", "Spanish Wells"]
            },
            {
                "name": "Barbados",
                "subDivisionTitle": "parish",
                "subDivisions": ["Christ Church","St James","St Lucy","St Michael","St Peter","St Thomas","St Andrew","St George","St Joseph","St Phillip","St John"]
            },
            {
                "name": "Belize",
                "subDivisionTitle": "district",
                "subDivisions": ["Belize","Cayo","Orange Walk","Corozal","Stan Creek","Toledo"]
            },
            {
                "name": "British Virgin Islands",
                "subDivisionTitle": "island",
                "subDivisions": [ "Tortola", "Virgin Gorda", "Anegada", "Jost Van Dyke"]
            },
            {
                "name": "Cayman Islands",
                "subDivisionTitle": "island",
                "subDivisions": ["Grand Cayman", "Little Cayman", "Cayman Brac"]
            },
            {
                "name": "Dominica",
                "subDivisionTitle": "parish",
                "subDivisions": ["St George", "St John", "St Peter", "St Joseph", "St Paul", "St Luke", "St Mark", "St Patrick", "St David", "St Andrew"]
            },
            {
                "name": "Grenada",
                "subDivisionTitle": "parish",
                "subDivisions": ["St Andrew", "St David", "St George", "St John", "St Mark", "St Patrick", "Carriacou", "Petite Martinuque"]
            },
            {
                "name": "Guyana",
                "subDivisionTitle": "region",
                "subDivisions": ["Barima-Waini", "Pomeroon-Supenaam", "Essequibo Islands-West Demerara", "Demerara-Mahaica", "Mahaica-Berbice", "East Berbice-Corentyne", "Cuyuni-Mazaruni", "Potaro-Siparuni", "Upper Takutu-Upper Essequibo", "Upper Demerara-Berbice"]
            },
            {
                "name": "Haiti",
                "subDivisionTitle": "district",
                "subDivisions": ["Nord", "Nord Quest", "Nord Est", "Artibontie", "Centre", "Quest", "Sud Est", "Grand Anse", "Sud"]
            },
            {
                "name": "Jamaica",
                "subDivisionTitle": "parish",
                "subDivisions": ["Clarendon", "Hanover", "Kingston", "Manchester", "Portland", "St Ann", "St Andrew", "St Catherine", "St Elizabeth", "St James", "St Mary", "St Thomas", "Trelawny", "Westmoreland"]
            },
            {
                "name": "Monsterrat",
                "subDivisionTitle": "parish",
                "subDivisions": ["St Peter", "St Anthony", "St Georges"]
            },
            {
                "name": "St Kitts & Nevis",
                "subDivisionTitle": "parish",
                "subDivisions": ["Nevis", "St George", "St Thomas", "St Anne", "St Paul", "St John", "Christ Church", "St Mary", "St Peter"]
            },
            {
                "name": "St Lucia",
                "subDivisionTitle": "parish",
                "subDivisions": ["Anse la Raye", "Castries", "Choiseul", "Dauphin", "Dennery", "Gros Islet", "Laborie", "Micoud", "Praslin", "Soufriere", "Vieux Fort"]
            },
            {
                "name": "St. Vincent and the Genadines",
                "subDivisionTitle": "parish",
                "subDivisions": ["Charlotte", "Northern Grenadines", "Southern Grenadines", "St Andrew", "St David", "St George", "St Patrick"]
            },
            {
                "name": "Suriname",
                "subDivisionTitle": "district",
                "subDivisions": ["Brokopondo", "Commewijne", "Coronie", "Marowijne", "Nickerie", "Para", "Paramaribo", "Saramacca", "Sipaliwini", "Wanica"]
            },
            {
                "name": "Trinidad and Tobago",
                "subDivisionTitle": "county",
                "subDivisions": ["St George", "St David", "Caroni", "St Andrew", "Victoria", "Nariva", "St Patrick", "Mayaro"]
            },
            {
                "name": "Turks & Caicos Islands",
                "subDivisionTitle": "island",
                "subDivisions": ["Providenciales", "Grand Turk Island", "Caicos Islands"]
            }
        ]
    }

    public initialize(): Promise<any>{
        // Returns the promise when the storage is completed

        return this.storage.ready().then(() => {
          let promises = [];
          let uniqueIDs = [];

          for(let country of this.dataList){
              let myCountry = new Country(country['name'], country['subDivisionTitle']);
              uniqueIDs.push(myCountry.getId());

              let countryString = JSON.stringify(myCountry);
              promises.push(this.storage.set(myCountry.getId(), countryString));

              let subDivisions = country['subDivisions'];
              let subDivisionsId = myCountry.getId() + "_" + this.province_key;
              let subdivisionsString = JSON.stringify(subDivisions);
              promises.push(this.storage.set(subDivisionsId, subdivisionsString));
          }

          let uuidListString = JSON.stringify(uniqueIDs);
          promises.push(this.storage.set(this.DATA_ID, uuidListString));

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
        return this.storage.ready().then(() => {
            let countiesId = countryId + "_" + this.province_key;

            return this.storage.get(countiesId).then((countyString) => {
                let countyList = JSON.parse(countyString);

                let sortedList = countyList.sort();
                return sortedList;
            })
        }).catch((error) => {
            return [];
        })
    }


}

