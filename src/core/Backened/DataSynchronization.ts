import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataManager } from '../DataManager';
import { AuthenticationService } from '../AunthenticationService';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { GeneralDataManager } from '../GeneralDataManager';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Serializeable } from '../Serializeable';
import { AngularFireAuth } from 'angularfire2/auth';
import { CycleManager } from '../CyclesModule/CycleManager';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataSynchronization{
    constructor(private storage: Storage, public afDB: AngularFireDatabase, public aft: AngularFirestore, public authenticationService: AuthenticationService, private afAuth: AngularFireAuth, private generalDataManager: GeneralDataManager, private cycleManager: CycleManager){

    }



    public syncData(dataManager: DataManager, uuserId: string): Promise<boolean>{
        let ref = this.afDB.list(uuserId + '/' + dataManager.DATA_ID);
        let promises = []
        return dataManager.getAll().then((list) => {

            console.log("Syncing");
            for(let item of list){
                promises.push(ref.set(item['id'], item))
            }

            return Promise.all(promises).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        }).catch((error) => {
            return false;
        })
    }

    public syncAll(dataManagers: Array<DataManager>, uuserId: string): Observable<boolean>{
        let promises = [];

        for(let dataManager of dataManagers){
            promises.push(this.syncData(dataManager, uuserId));
        }

        return fromPromise(Promise.all(promises).then(() => {
            return true;
        }).catch((error) => {
            return false;
        }));
    }

    public pullData(): Observable<boolean>{

        return this.afAuth.authState.map((data) => data.toJSON()).flatMap((user: any) => {
            console.log(user);
            let ref = this.afDB.object(user.uid);

            return ref.snapshotChanges().map((changes) => {
                this.saveDataToDevice(changes.payload.val());
                return true;
            })
        })
    }

    public saveDataToDevice(userdata: Object): Promise<boolean>{
        let promises = [];
        for(let key in userdata){
            console.log(key);
            promises.push(this.saveManagerData(key, userdata[key]));
        }

        return Promise.all(promises).then(() => {
            return true;
        }).catch((error) => {
            console.error(error);
            return false;
        })
    }

    public saveManagerData(key: string, managerData: Object): Promise<boolean>{

        let promises = [];
        let uniqueIDs = [];

        return this.storage.ready().then(() => {
            for(let id in managerData){
                uniqueIDs.push(id);
                let dataString = JSON.stringify(managerData[id]);
                promises.push(this.storage.set(id, dataString));
            }
            let uuidListString = JSON.stringify(uniqueIDs);
            promises.push(this.storage.set(key, uuidListString));

            return Promise.all(promises).then(() => {
                console.log("Synced Data for: " + key);
                return true;
            }).catch((error) => {
                console.error("Error: " + error);
                return false;
            });
        }).catch((error) => {
            console.error("Error: " + error);
            return false;
        })

    }
}