import Client from './client';
import Service from './service';
import Product from './product';

export default class Company {
    private clients: Array<Client>;
    private products: Array<Product>;
    private services: Array<Service>;

    constructor() {
        this.products = [];
        this.services = [];
        this.clients = [];
    }


    getClients(): Array<Client> {
        return this.clients;
    }

    getProducts(): Array<Product> {
        return this.products;
    }

    getServices(): Array<Service> {
        return this.services;
    }

    addClient(client: Client): void {
        this.clients.push(client);
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    addService(service: Service) {
        this.services.push(service);
    }
}
