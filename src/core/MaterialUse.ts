import { Serializeable } from "./Serializeable";
import { UUID } from "angular2-uuid";

export class MaterialUse implements Serializeable{
    private id;

    constructor(private cycleId: string, private materialId: string, private purchaseId: string, private quantityUsed: number, private units: string){
        this.id = UUID.UUID();
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

    public getUnits(): string{
        return this.units;
    }
}