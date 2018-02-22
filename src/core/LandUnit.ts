import { Serializeable } from "./Serializeable";
import { UUID } from "angular2-uuid";

export class LandUnit implements Serializeable{

    private id: string

    constructor(private name: string, private unitSymbol: string, private ratioToAcres: number, private ratioToHectares){
        this.id = UUID.UUID();
    }

    public getId(): string{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public convertToAcres(quantity: number):number{
        return this.ratioToAcres * quantity;
    } 

    public convertToHecatres(quantity: number): number{
        return this.ratioToHectares * quantity;
    }

    public getRatioToAcres(){
        return this.ratioToAcres;
    }

    public getRatioToHectares(){
        return this.ratioToHectares;
    }
}