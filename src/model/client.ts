import CPF from './cpf';
import RG from './rg';
import Service from './service';
import Product from './product';
import Pet from './pet';
import Phone from './phone';

export default class Client {
    private name: string;
    private socialName: string;
    private cpf: CPF;
    private rgs: Array<RG>;
    private registrationDate: Date;
    private phones: Array<Phone>;
    private consumedProducts: Array<Product>;
    private consumedServices: Array<Service>;
    private pets: Array<Pet>;

    constructor(name: string, socialName: string, cpf: CPF) {
        this.name = name;
        this.socialName = socialName;
        this.cpf = cpf;
        this.registrationDate = new Date();
        this.rgs = [];
        this.phones = [];
        this.consumedProducts = [];
        this.consumedServices = [];
        this.pets = [];
    }

    getName(): string {
        return this.name;
    }

    getSocialName(): string {
        return this.socialName;
    }

    getCpf(): CPF {
        return this.cpf;
    }

    getRgs(): Array<RG> {
        return this.rgs;
    }

    getRegistrationDate(): Date {
        return this.registrationDate;
    }

    getPhones(): Array<Phone> {
        return this.phones;
    }

    getConsumedProducts(): Array<Product> {
        return this.consumedProducts;
    }

    getConsumedServices(): Array<Service> {
        return this.consumedServices;
    }

    getPets(): Array<Pet> {
        return this.pets;
    }

    getTotalConsumptions(): number {
        return this.getConsumedProducts().length + this.getConsumedServices().length;
    }

    getAmoutSpent(): number {
        let total = 0;
        this.getConsumedProducts().forEach((p) => {total += p.getValue();});
        this.getConsumedServices().forEach((s) => {total += s.getValue();});
        return total;
    }

    setName(name: string) {
        this.name = name;
    }

    setSocialName(socialName: string) {
        this.socialName = socialName;
    }

    addRg(rg: RG) {
        this.rgs.push(rg);
    }

    addPhone(phone: Phone) {
        this.phones.push(phone);
    }

    addConsumedProduct(product: Product) {
        this.consumedProducts.push(product);
    }

    addConsumedService(service: Service) {
        this.consumedServices.push(service);
    }

    addPet(pet: Pet) {
        this.pets.push(pet);
    }

    toString() {
        return (
            'Nome: ' +
            this.name +
            '\n' +
            'Nome social: ' +
            this.socialName +
            '\n' +
            'CPF: ' +
            this.getCpf().getValue() +
            '\n' +
            `RG: ` +
            this.getRgs()
                .map((rg) => rg.toString())
                .join(` | `)
        );
    }
}
