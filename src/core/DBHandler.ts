export abstract class DBHandler{
    size: number;
    constructor(){
        this.size = 0;
    }
    getSize(){
        return this.size;
    }
    abstract getAll()
    abstract add(data: object)
    abstract edit(data: object, index: number)
}