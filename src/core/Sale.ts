import { Serializeable } from './Serializeable'
import { UUID } from 'angular2-uuid';

export class Sale implements Serializeable{
    private id;

    constructor(private crop: string, private cropId: string, private harvestId: string, private cycleId: string, private unitsSoldBy: string, private quantityOfUnitsSold: number, private costPerunit: number, private dateSold: string){
        this.id = UUID.UUID();
    }

    public getId(): string{
        return this.id;
    }

    public getCropSold(): string{
        return this.crop;
    }

    public getCropId(): string{
        return this.cropId;
    }

    public getHarvestId(): string{
        return this.harvestId;
    }

    public getCycleId(): string{
        return this.cycleId;
    }

    public getUnitsSoldBy(): string{
        return this.unitsSoldBy;
    }

    public getQuantityUnitsSold(): number{
        return this.quantityOfUnitsSold;
    }

    public getCostPerUnit(): number{
        return this.costPerunit;
    }

    public getDateSold(): string{
        return this.dateSold;
    }

}