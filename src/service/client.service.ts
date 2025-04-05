import Client from '../model/client';
import Crud from '../interface/crud';

export default class ClientService implements Crud<Client> {
    private clients: Array<Client>;

    constructor(clients: Array<Client>) {
        this.clients = clients;
    }
    findAll(): Array<Client> {
        return this.clients;
    }
    find(cpf: string): Client | null {
        return this.clients.find((c) => c.getCpf().getValue() === cpf) || null;
    }
    save(client: Client): void {
        this.clients.push(client);
    }
    update(cpf: string, updateCliente: Client): void {
        const client = this.find(cpf);
        client?.setName(updateCliente.getName());
        client?.setSocialName(updateCliente.getSocialName());
    }
    delete(cpf: string): void {
        const i = this.clients.findIndex((c) => c.getCpf().getValue() === cpf);
        this.clients.splice(i, 1);
    }
}
