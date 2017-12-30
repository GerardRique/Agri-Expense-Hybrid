import { Serializeable } from './Serializeable'
import { UUID } from 'angular2-uuid';

export class Labourer implements Serializeable{
    
    private id: string;

    constructor(private firstName: string, private lastName: string, private contactNumber: string){
        let uuid = new UUID();
        this.id = UUID.UUID();
    }


    public getId(): string{
        return this.id;
    }

    public getFirstName(): string{
        return this.firstName;
    }

    public getLastName(): string{
        return this.lastName;
    }
    public getFullName(): string{
        return this.firstName + " " + this.lastName;
    }
    public getContactNumber(): string{
        return this.contactNumber;
    }
}