import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class Template{
    private active: boolean;
    private title: string;
    private name: string;

    constructor(templateTitle: string, templateName: string){
        this.active = false;
        this.name = templateName;
        this.title = templateTitle;
    }

    public getTtitle(): string{
        return this.title;
    }
    public getName(): string{
        return this.name;
    }
    public isActive(): boolean{
        return this.active;
    }
    public activate(): Template{
        this.active = true;
        return this;
    }
    public deactivate(): Template{
        this.active = false;
        return this;
    }
}