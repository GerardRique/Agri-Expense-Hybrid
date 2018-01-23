import { Serializeable } from "./Serializeable";
import { UUID } from "angular2-uuid";

export class MaterialUse implements Serializeable{
    private id;
    private totalCost: number;

    constructor(private cycleId: string, private materialId: string, private purchaseId: string, private quantityUsed: number, private costPerMaterial: number, private units: string, private dateUsed: string){
        this.id = UUID.UUID();

        this.totalCost = this.quantityUsed * this.costPerMaterial;
    }

    public getId(){
        return this.id;
    }

    public getCycleId(): string{
        return this.cycleId;
    }

    public getMaterialId(): string{
        return this.materialId;
    }

    public getPurchaseId(): string{
        return this.purchaseId;
    }

    public getQuantityUsed(): number{
        return this.quantityUsed
    }

    public getTotalCost(): number{
        return this.totalCost;
    }

    public getUnits(): string{
        return this.units;
    }

    public getDateUsed(): string{
        return this.dateUsed;
    }
}