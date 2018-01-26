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

@Injectable()
export class ReportCreator{

    ws: XLSX.WorkSheet;


    wb: XLSX.WorkBook;

    wbout: string;



    constructor(private platform: Platform, private file: File, private fileOpener: FileOpener, private toastCtrl: ToastController){

    }

    public createReport(manager: DataManager): Promise<any>{
        return this.convertToCsv(manager).then((result) => {
            let blob = new Blob(['\ufeff' + result], { type: 'text/csv;charset=utf-8;' });

            if(this.platform.is('core') || this.platform.is('mobileweb')){
                console.log('Browser');
            }
            else {

                let toast = this.toastCtrl.create({
                    message: 'File created',
                    duration: 3000,
                    position: 'top'
                  });

                  
                
               /* this.file.writeFile(this.file.dataDirectory, 'report.csv', blob, { replace: true}).then((fileEntry) => {
                    this.fileOpener.open(this.file.dataDirectory + 'report.csv', 'text/csv;charset=utf-8;').then(() => {
                        toast.present();
                    }).catch((error ) => {
                        let errorToast = this.toastCtrl.create({
                            message: 'error ' + JSON.stringify(error),
                            duration: 3000,
                            position: 'top'
                          });
                          errorToast.present();
                    });
                });*/

                this.file.writeFile(this.file.externalRootDirectory, 'report.csv', result, {replace: true}).then(() => {
                    toast.present();
                }).catch((error) => {
                    this.file.writeExistingFile(this.file.externalRootDirectory, 'report.csv', result).then(() => {
                        toast.present();
                    }).catch((error) => {
                        alert('error ' + JSON.stringify(error));
                    });
                }).catch((error) => {
                    alert('Error ' + JSON.stringify(error));
                });
            }
        })
    }

    public createExcel(manager: DataManager){
        let data: Array<Array<any>> = new Array<Array<any>>();

        let list: any[] = [
            'Gerard',
            'Rique',
            '4604644'
        ];

        let list2: any[] = [
            'Jerome',
            'Rique',
            '4604642'
        ];

        data.push(list);
        data.push(list2);

        //this.createExcelSpreadSheet(data);

        manager.getDataInSpreadSheetFormat().then((list) => {
            let name = this.createExcelSpreadSheet(list);
            console.log(list);
        })
        
    }

    public createExcelSpreadSheet(data: Array<Array<any>>): string{
        this.ws = XLSX.utils.aoa_to_sheet(data);

        this.wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(this.wb, this.ws, 'Sheet1');

        this.wbout = XLSX.write(this.wb, { bookType: 'xlsx', type: 'array' });

        console.log('Creating excel...');

        let blob: Blob = new Blob([this.wbout]);

        let filename = 'mySheet.xlsx';

        //this.saveInBrowser(blob, filename)

        return filename;
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