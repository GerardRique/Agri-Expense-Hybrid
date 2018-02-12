import { Serializeable } from '../Serializeable';
import { UUID } from 'angular2-uuid';

export class Cycle implements Serializeable{

    private id: string;
    constructor(private name: string, private crop: string,private cropId: string, private cropImagePath: string, private landUnit: string, private landQuantity: number, private datePlanted: string, private harvested: number, private active: boolean, id? : string){
        if(id){
            this.id = id;
        }else{
            this.id = UUID.UUID();
        }
    }

    public getId(): string{
        return this.id;
    }

    public getCrop(): string{
        return this.crop;
    }

    public getCropId(): string{
        return this.cropId
    }

    public getCropImagePath(): string{
        return this.cropImagePath;
    }

    public getLandUnit(): string{
        return this.landUnit;
    }

    public getLandQuantity(): number{
        return this.landQuantity;
    }

    public getDatePlanted(): string{
        return this.datePlanted;
    }

    private getHarvted(): number{
        return this.harvested;
    }

    private isActive(): boolean{
        return this.active;
    }
}