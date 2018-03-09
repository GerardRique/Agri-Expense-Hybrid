import { Serializeable } from "./Serializeable";
import { UUID } from "angular2-uuid";

export class Purchase implements Serializeable{
    
    private id: string;
    private quantityRemaining: number;
    private used: boolean

    constructor(private materialId: string, private typeId: string, private units: string, private quantityPurchased: number, private cost: number, private datePurchased: string){
        this.id = UUID.UUID();
        this.quantityRemaining = this.quantityPurchased;
        this.used = false;
    }

    public static deserialize(data: Object){
        //let purchase = new Purchase(data['materialId'], data['typeId'], data['units'], data['quantityPurchased'], data['cost'], data['datePurchased'], data['quantityRemaining']);
        //return purchase;
    }

    public getId(): string{
        return this.id;
    }

    public getMaterialId(): string{
        return this.materialId;
    }

    public getTypeId(): string{
        return this.typeId;
    }

    public getUnits(): string{
        return this.units;
    }

    public getQuantityPurchased(): number{
        return this.quantityPurchased;
    }

    public getQuantityRemaining(): number{
        return this.quantityRemaining;
    }

    public getCost(): number{
        return this.cost;
    }

    public getDatePurchases(): string{
        return this.datePurchased;
    }

    public getTotalCost(): number{
        let totalCost = this.cost * this.quantityPurchased;
        return totalCost;
    }

    public useMaterial(quantityUsed: number): number{
        if(quantityUsed > this.quantityRemaining)
            return -1;
        this.quantityRemaining = this.quantityRemaining - quantityUsed;
        return this.quantityRemaining;
    }
}