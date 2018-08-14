import { Injectable } from '@angular/core';
import { Template } from './Template';
import 'rxjs/add/operator/map';

@Injectable()
export class ListTemplate extends Template{
    listData: Array<Object>;

    constructor(templateTitle: string, templateName: string){
        super(templateTitle, templateName);
    }

    public setList(data: Array<Object>): void{
        this.listData = data;
    }
}