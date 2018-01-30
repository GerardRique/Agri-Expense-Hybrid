import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Nav, Platform, NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { DataManager } from './DataManager';
import { File, FileSaver } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import * as XLSX from 'xlsx';
import { Xliff } from '@angular/compiler/src/i18n/serializers/xliff';
import { CycleManager } from './CycleManager';

@Injectable()
export class ReportCreator{

    ws: XLSX.WorkSheet;


    wb: XLSX.WorkBook;

    wbout: string;



    constructor(private platform: Platform, private file: File, private fileOpener: FileOpener, private toastCtrl: ToastController, private cycleManager: CycleManager){

    }

    public createCycleReport(){
        this.getCycleSpreadsheetData(this.cycleManager);
    }

    public getCycleSpreadsheetData(cycleManager: DataManager): Promise<Array<Array<string>>>{
        let list = Array<Array<string>>();
        return cycleManager.getAll().then((cycleData) => {
            let titleList = ['ID Number', 'Cycle Name', 'Crop Planted', 'Land Quantity', 'Units of land', 'Date Planted', 'Open'];
            list.push(titleList);
            for(let cycle of cycleData){
                let currentCycle = Array<string>();
                let date: Date = new Date(cycle['datePlanted']);
                currentCycle.push(cycle['id']);
                currentCycle.push(cycle['name']);
                currentCycle.push(cycle['crop']);
                currentCycle.push(cycle['landQuantity']);
                currentCycle.push(cycle['landUnit']);
                currentCycle.push(date.toString())
                currentCycle.push(cycle['active']);
                list.push(currentCycle);
            }

            return list;
        })
    }

    public createExcelSheet(data: Array<Array<string>>): XLSX.WorkSheet{
        return XLSX.utils.aoa_to_sheet(data);
    }

    createCycleSheet(): Promise<XLSX.WorkSheet>{
        return this.getCycleSpreadsheetData(this.cycleManager).then((data) => {
            let ws: XLSX.WorkSheet = this.createExcelSheet(data);
            return ws;
        })
    }

    public createExcelSpreadSheet(data: Array<Array<any>>): string{
        this.ws = XLSX.utils.aoa_to_sheet(data);

        this.wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(this.wb, this.ws, 'Sheet1');

        this.wbout = XLSX.write(this.wb, { bookType: 'xlsx', type: 'array' });

        console.log('Creating excel...');

        let blob: Blob = new Blob([this.wbout]);

        let filename = 'TestSheet.xlsx';

        if(this.platform.is('core') || this.platform.is('mobileweb')){
            console.log('Saving file in browser...');
            this.saveInBrowser(blob, filename);
        } 
        else{
            console.log('Saving file on device...');
            this.saveOnDevice(blob, filename);
        }

        return filename;
    }

    public saveOnDevice(blob: Blob, filename: string){
        let toast = this.toastCtrl.create({
            message: 'File created',
            duration: 3000,
            position: 'top'
        });

        let errorToast = this.toastCtrl.create({
            message: 'Error creating file',
            duration: 3000,
            position: 'top'
        });
        this.file.writeFile(this.file.externalRootDirectory + 'NewAgriExpense', filename, blob, {replace: true}).then(() => {
            toast.present();
        }).catch((error) => {
            this.file.writeExistingFile(this.file.externalRootDirectory + 'NewAgrExpense', filename, blob).then(() => {
                toast.setMessage('File created with replacement');
                toast.present();
            }).catch((error) => {
                errorToast.present();
            });
        }).catch((error) => {
            errorToast.present();
        })
    }

    public createDirectory(directoryName: string){
        return this.file.checkDir(this.file.externalRootDirectory, directoryName).then((result) => {
            if(result === true){
                return true;
            } else{
                this.file.createDir(this.file.externalRootDirectory, directoryName, true).then((entry) => {
                    return true;
                }).catch((error) => {
                    return false;
                });
            }
        }).catch((error) => {
            return false;
        })
    }

    private saveInBrowser(blob: Blob, filename: string){
        let a = document.createElement("a");
        document.body.appendChild(a);

        let url= window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    private convertToCsv(manager: DataManager): Promise<string>{
        return manager.getAll().then((data) => {
            let csvString = '';
            let heading = '';
            for(let index in data[0]){
                heading += index + ',';
            }
            heading = heading.slice(0, -1);
            csvString += heading + '\r\n';
            for(let item of data){
                let line = '';
                for(let index in item){
                    if(line != '')line += ',';
                    line += item[index];
                }

                csvString += line + '\r\n';
            }
            return csvString;
        })
    }
}