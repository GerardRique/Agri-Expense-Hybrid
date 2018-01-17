import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Nav, Platform, NavController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { DataManager } from './DataManager';
import { File, FileSaver } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Injectable()
export class ReportCreator{

    constructor(private platform: Platform, private file: File, private fileOpener: FileOpener){

    }

    public createReport(manager: DataManager): Promise<any>{
        return this.convertToCsv(manager).then((result) => {
            let blob = new Blob(['\ufeff' + result], { type: 'text/csv;charset=utf-8;' });

            if(this.platform.is('core') || this.platform.is('mobileweb')){
                console.log('Browser');
            }
            else {
                this.file.writeFile(this.file.dataDirectory, 'report.csv', blob, { replace: true}).then((fileEntry) => {
                    this.fileOpener.open(this.file.dataDirectory + 'report.csv', 'text/csv;charset=utf-8;');
                });
            }
        })
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