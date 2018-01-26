import { Serializeable } from './Serializeable'
import { UUID } from 'angular2-uuid';

export class Harvest implements Serializeable{

    private id: string;

    private quantityRemaining;

    constructor(private cycleId: string, private cropId: string, private crop: string, private quantityHarvested: number, private unitsHarvested: string, private dateHarvested: string){
        this.id = UUID.UUID();
        this.quantityRemaining = this.quantityHarvested;
    }

    public getId(): string{
        return this.id;
    }

    public getCycleId(): string{
        return this.cycleId;
    }

    public getCropId(): string{
        return this.cropId;
    }

    public getCrop(): string{
        return this.crop;
    }

    public getQuantityHarvested(): number{
        return this.quantityHarvested;
    }

    public getUnitsHarvested(): string{
        return this.unitsHarvested;
    }

    public getDateHarvested(): string{
        return this.dateHarvested;
    }
}