export default class Product {
    private count: number = 0;
    private name: string;
    private value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }

    getName(): string {
        return this.name;
    }

    getValue(): number {
        return this.value;
    }

    setName(name: string): string {
        return (this.name = name);
    }

    setValue(value: number): void {
        this.value = value;
    }

    getCount(): number {
        return this.count;
    }

    registerConsumption(): void {
        this.count++;
    }

    toString(): string {
        return `Nome: ${this.getName()}\nValor: ${this.getValue()}`;
    }
}
