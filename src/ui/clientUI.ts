import { clear } from 'console';
import Entrada from '../io/entrada';
import CPF from '../model/cpf';
import Client from '../model/client';
import Company from '../model/company';
import ClientService from '../service/client.service';
import PetUI from './petUI';
import RG from '../model/rg';

export default class ClientUI {
    private clientService: ClientService;

    constructor(company: Company) {
        this.clientService = new ClientService(company.getClients());
    }

    public menu(): void {
        clear();
        console.log(`Gerenciamento do cliente`);
        let execution = true;
        while (execution) {
            console.log(`Opções:`);
            console.log(`1 - Cadastrar clientes`);
            console.log(`2 - Listar todos os clientes`);
            console.log(`3 - Atualizar cliente`);
            console.log(`4 - Remover cliente`);
            console.log(`5 - Gerenciar pet`);
            console.log(`0 - Voltar\n`);

            let option = Entrada.receberNumero(`Por favor, escolha uma opção: `);
            switch (option) {
                case 1:
                    this.save();
                    break;
                case 2:
                    this.findAll();
                    break;
                case 3:
                    this.update();
                    break;
                case 4:
                    this.remove();
                    break;
                case 5:
                    this.petManager();
                    break;
                case 0:
                    execution = false;
                    break;
                default:
                    console.log(`\nOperação não entendida :(\n`);
                     Entrada.receberTexto(`Pressione Enter para continuar.`);
            }
        }
    }

    private petManager() {
        let cpf = Entrada.receberTexto(`Por favor, digite o cpf do cliente: `);
        let client = this.clientService.find(cpf);
        if (!client) {
            console.log(`\nCPF não registrado!`);
        } else {
            const petUI = new PetUI(client);
            petUI.petMenu();
        }
    }

    private save(): void {
        console.log(`\nInício do cadastro do cliente`);
        const name = Entrada.receberTexto(`Por favor informe o nome do cliente: `).trim();
        const socialName = Entrada.receberTexto(`Por favor, informe o nome social do cliente: `).trim();
        const cpfNumber = Entrada.receberTexto(`Por favor, informe o número do CPF: `).trim();
        const cpfDate = Entrada.receberTexto(`Por favor, informe a data de emissão do CPF (dd/mm/yyyy): `).trim();
        let rgNumber = Entrada.receberTexto(`Por favor, informe o número do RG: `).trim();
        const rgDate = Entrada.receberTexto(`Por favor, informe a data de emissão do RG (dd/mm/yyyy): `).trim();

        if (!name || !socialName || !cpfNumber || !cpfDate) {
            console.log(`\nTodos os campos são obrigatórios!\n`);
            return;
        }
        const cpf = new CPF(cpfNumber, this.formatDate(cpfDate));
        const rg = new RG(rgNumber, this.formatDate(rgDate))
        const client = new Client(name, socialName, cpf);
        client.addRg(rg)
        const save = this.clientService.find(cpfNumber);
        if (save) {
            console.log(`\nCPF: ${cpfNumber} já cadastrado!\n`);
        } else {
            this.clientService.save(client);
            console.log(`\nCliente: ${name} cadastrado com sucesso!\n`);
        }
    }

    private findAll(): void {
        console.log(`\nLista de todos os clientes:`);
        const clients = this.clientService.findAll();
        if (clients.length === 0) {
            console.log(`Nenhum cliente cadastrado.\n`);
            return;
        }
        clients.forEach((c) => console.log(`${c.toString()}\n`));
    }

    public update(): void {
        let cpf = Entrada.receberTexto(`Por favor, digite o cpf: `);
        const client = this.clientService.find(cpf);
        if (!client) {
            console.log(`\nCPF não cadastrado!\n`);
        } else {
            console.log(`Cliente: ${client.getName()}`);
            let name = Entrada.receberTexto(`Por favor, digite o novo nome: `);
            let socialName = Entrada.receberTexto(`Por favor, digite o novo nome social: `);
            const updatedClient = new Client(name, socialName, client.getCpf());
            this.clientService.update(cpf, updatedClient);
            let rg = Entrada.receberTexto(`Deseja adicionar RG? Aperte SIM / CONTINUAR: `).toUpperCase();
            if(rg == 'SIM') {
                let rgNumber = Entrada.receberTexto(`Por favor, informe o número do RG: `).trim();
                const rgDate = Entrada.receberTexto(`Por favor, informe a data de emissão do RG (dd/mm/yyyy): `).trim();
                let date = this.formatDate(rgDate)
                const rg = new RG(rgNumber, date)
                client.addRg(rg)
                console.log(`\nRG adicionado com sucesso!`);
            }
            console.log(`\nCliente atualizado com sucesso!\n`);
        }
    }

    private remove(): void {
        let cpf = Entrada.receberTexto(`Por favor informe o número do CPF: `).trim();
        let client = this.clientService.find(cpf);
        if (!client) {
            console.log(`\nCPF não cadastrado!\n`);
        } else {
            this.clientService.delete(client.getCpf().getValue());
            console.log(`\nCliente removido com sucesso!\n`);
        }
    }

    private formatDate(date: string): Date {
        const partes = date.split('/');
        const ano = Number(partes[2]);
        const mes = Number(partes[1]) - 1;
        const dia = Number(partes[0]);
        return new Date(ano, mes, dia);
    }
}
