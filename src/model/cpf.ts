export default class CPF {
    private value: string;
    private date: Date;
    constructor(value: string, date: Date) {
        this.value = value;
        this.date = date;
    }
    getValue(): string {
        return this.value;
    }
    getDate(): Date {
        return this.date;
    }
}
