import { Serializeable } from '../Serializeable';
import { UUID } from 'angular2-uuid';

export class Country implements Serializeable{
    private id: string;

    constructor(private name: string){
        this.id = UUID.UUID();
    }

    public getId(): string{
        return this.id;
    }

    public getName(): string{
        return this.name;
    }
}