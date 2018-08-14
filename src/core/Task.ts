import { Serializeable } from './Serializeable'
import { UUID } from 'angular2-uuid';


export enum RateOfPay{
    Hours,
    Days,
    Weeks,
    Months
}
export class Task implements Serializeable{

    private id;

    constructor(private cycleId: string, private labourerId: string, private dateStarted: Date, private rateOfPay: string, private salary: number, private quantity: number, private description: string){
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

    public getSalary(): number{
        return this.salary;
    }

    public getQuantity(): number{
        return this.quantity;
    }

    public getRateOfPay(): string{
        return this.rateOfPay;
    }

    public static getRatesOfPay(): Array<string>{
        let list = [];
        for(let rate in RateOfPay){
            if(isNaN(Number(rate)))
                list.push(rate.toString());
        }
        return list;
    }

    public getDescription(): string{
        return this.description;
    }
}