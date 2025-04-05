import Product from './product';
import Service from './service';

export default class Pet {
    private name: string;
    private type: string;
    private breed: string;
    private gender: string;
    private itemsConsumed: Array<Product | Service>;

    constructor(name: string, breed: string, gender: string, type: string) {
        this.name = name;
        this.breed = breed;
        this.gender = gender;
        this.type = type;
        this.itemsConsumed = [];
    }

    getName(): string {
        return this.name;
    }
    getBreed(): string {
        return this.breed;
    }
    getGender(): string {
        return this.gender;
    }
    getType(): string {
        return this.type;
    }

    setName(name: string): void {
        this.name = name;
    }

    setBreed(breed: string): void {
        this.breed = breed;
    }

    setGender(gender: string): void {
        this.gender = gender;
    }

    setType(type: string): void {
        this.type = type;
    }

    getConsumedItems(): Array<Product | Service> {
        return this.itemsConsumed;
    }

    addConsumedItem(item: Product | Service) {
        this.itemsConsumed.push(item);
    }

    toString() {
        return `Nome: ${this.getName()}\nTipo: ${this.getType()}\nRaça: ${this.getBreed()}\nGênero: ${this.getGender()}`;
    }
}
