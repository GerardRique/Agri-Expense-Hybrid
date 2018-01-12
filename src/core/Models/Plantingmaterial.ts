import { Serializeable } from '../Serializeable'
import { UUID } from 'angular2-uuid';


export class PlantingMaterial implements Serializeable{

    private id;

    constructor(private name: string, private imagePath: string){
        let uuid = new UUID();
        this.id = UUID.UUID();
    }

    public getId(): string{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }

    public getImagePath():string{
        return this.imagePath;
    }
}