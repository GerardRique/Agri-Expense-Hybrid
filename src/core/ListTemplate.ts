import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Template } from './Template';
import 'rxjs/add/operator/map';

@Injectable()
export class ListTemplate extends Template{
    listData: Array<any>;

    constructor(templateTitle: string, templateName: string){
        super(templateTitle, templateName);
    }

    public setList(data: Array<any>): void{
        this.listData = data.slice();
    }
}