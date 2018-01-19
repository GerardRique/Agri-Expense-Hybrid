import { Serializeable } from "./Serializeable";
import { UUID } from "angular2-uuid";

export class Purchase implements Serializeable{
    
    private id: string;
    private quantityRemaining: number;

    constructor(private materialId: string, private typeId: string, private units: string, private quantityPurchased: number, private cost: number, private dataPurchased: string){
        this.id = UUID.UUID();
        this.quantityRemaining = quantityPurchased;
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
        return this.dataPurchased;
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