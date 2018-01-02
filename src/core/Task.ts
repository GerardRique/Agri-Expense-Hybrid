import { Serializeable } from './Serializeable'
import { UUID } from 'angular2-uuid';

export class Task implements Serializeable{

    private id;

    constructor(private cycleId: string, private labourerId: string, private dateStarted: Date, private ratePerHour: number, private description: string){
        let uuid = new UUID();
        this.id = UUID.UUID();
    }

    public getId(): string{
        return this.id;
    }

    public getCycleId(): string{
        return this.cycleId;
    }

    public getLabourerId(): string{
        return this.labourerId;
    }

    public getDateStarted(): Date{
        return this.dateStarted;
    }

    public getRate(): number{
        return this.ratePerHour;
    }

    public getDescription(): string{
        return this.description;
    }
}