import Service from '../model/service';
import Crud from '../interface/crud';

export default class ServiceService implements Crud<Service> {
    private services: Array<Service>;

    constructor(services: Array<Service>) {
        this.services = services;
    }
    findAll(): Array<Service> {
        return this.services;
    }
    find(name: string): Service | null {
        return this.services.find((s) => s.getName() === name) || null;
    }
    save(service: Service): void {
        this.services.push(service);
    }
    update(name: string, updateService: Service): void {
        const service = this.find(name);
        service?.setName(updateService.getName());
    }
    delete(name: string): void {
        const i = this.services.findIndex((s) => s.getName() === name);
        this.services.splice(i, 1);
    }
}
