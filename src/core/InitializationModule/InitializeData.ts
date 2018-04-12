import { Injectable } from '@angular/core';
import { DataManagerFactory } from "../DataManagerFactory";
import { DataManager } from "../DataManager";
import { AuthenticationService } from "../AunthenticationService";
import { Storage } from '@ionic/storage';

/*

All functionality to intialize application should be placed in this class. 

*/

@Injectable()

export class InitializeData{
    private initialized: string = "app_initialized";
    constructor(public dataManagerFactory: DataManagerFactory, private authenticationService: AuthenticationService, private storage: Storage){

    }

    public checkAppInitialization(): Promise<boolean>{
        return this.storage.get(this.initialized).then((response) => {
            if(response === null || response.length === 0){
                return false;
            }
            else return true;
        }).catch((error) => {
            return false;
        });
    }

    public setAppInitializetion(): Promise<boolean>{
        return this.storage.set(this.initialized, "true").then(() => {
            return true;
        }).catch((error) => {
            return false;
        })
    }

    public initializeApp(): Promise<boolean>{
        return this.checkAppInitialization().then((result) => {
            if(result === true){
                console.log("Application already initialized");
                return true;
            }
            let promises = [];
            let list =  Array<DataManager>();

            list.push(this.dataManagerFactory.getManager(DataManagerFactory.MATERIAL));
            list.push(this.dataManagerFactory.getManager(DataManagerFactory.PLANT_MATERIAL));
            list.push(this.dataManagerFactory.getManager(DataManagerFactory.FERTILIZER));
            list.push(this.dataManagerFactory.getManager(DataManagerFactory.CHEMICAL));
            list.push(this.dataManagerFactory.getManager(DataManagerFactory.SOIL_AMMENDMENT));
            list.push(this.dataManagerFactory.getManager(DataManagerFactory.HARVEST));
            list.push(this.dataManagerFactory.getManager(DataManagerFactory.COUNTRY));


            for(let dataManager of list){
                dataManager.checkInitialization().then((response) => {
                    if(response === true){
                        console.log(dataManager.DATA_ID + " dataManager already initialized");
                    }
                    else promises.push(dataManager.initialize());
                })
            }

            promises.push(this.setAppInitializetion());

            return Promise.all(promises).then(() => {
                return true;
            }).catch((error) => {
                return false;
            })
        }).catch((error) => {
            console.log(error);
            return false;
        })
    }
}