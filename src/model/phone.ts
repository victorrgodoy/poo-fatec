export default class Phone {
    private ddd: string;
    private number: string;
    constructor(ddd: string, number: string) {
        this.ddd = ddd;
        this.number = number;
    }

    getDdd(): string {
        return this.ddd;
    }

    getNumber(): string {
        return this.number;
    }
}
