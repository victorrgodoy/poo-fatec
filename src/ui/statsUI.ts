import { clear } from 'console';
import Entrada from '../io/entrada';
import Product from '../model/product';
import Service from '../model/service';
import ClientService from '../service/client.service';
import PetService from '../service/pet.service';
import ProductService from '../service/product.service';
import ServiceService from '../service/service.service';
import Company from '../model/company';
import StatsService from '../service/stats.service';

export default class StatsUI {
    private clientService: ClientService;
    private productService: ProductService;
    private serviceService: ServiceService;

    constructor(company: Company) {
        this.clientService = new ClientService(company.getClients());
        this.productService = new ProductService(company.getProducts());
        this.serviceService = new ServiceService(company.getServices());
    }

    public menu(): void {
        console.log(`Gerenciamento de Consumos`);
        let execution = true;
        while (execution) {
            clear();
            console.log(`Opções:`);
            console.log(`1 - Registrar consumo (PRODUTO / SERVIÇO)`);
            console.log(`2 - Registro de consumo dos produtos ou serviços que cada cliente adquiriu`);
            console.log(`3 - Listagem dos 10 clientes que mais consumiram produtos ou serviços`);
            console.log(`4 - Listagem geral dos serviços ou produtos mais consumidos.`);
            console.log(`5 - Listagem dos serviços ou produtos mais consumidos por tipo e raça de pets.`);
            console.log(`6 - Listagem dos 5 clientes que mais consumiram em valor, não em quantidade.`);
            console.log(`0 - Voltar`);
            let option = Entrada.receberNumero(`Por favor, escolha uma opção: `);
            switch (option) {
                case 1:
                    this.register();
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
                    break;
                case 2:
                    this.historic();
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
                    break;
                case 3:
                    this.top10Consumers();
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
                    break;
                case 4:
                    this.topItemsConsumed();
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
                    break;
                case 5:
                    this.itemsByPet();
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
                    break
                case 6:
                    this.clientByAmoutSpent();
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
                    break
                case 0:
                    execution = false;
                    break;
                default:
                    console.log(`\nOperação não entendida :(\n`);
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
            }
        }
    }

    private clientByAmoutSpent(){
        console.log(`\nLista dos 5 clientes que mais gastaram:`);
        return StatsService.clientByAmoutSpent(this.clientService.findAll()).forEach((c,i) => {
            console.log(`${i + 1} - ${c.getName()}: ${c.getAmoutSpent()}`)
        })

    }

    private itemsByPet(): void {
        console.log(`\nLista dos itens mais consumidos por tipo e raça de pet:`);
        const items = StatsService.itemsByPet(this.clientService.findAll());
        items.forEach(({ type, breed, name, value }) => {
            console.log(`Tipo: ${type}, Raça: ${breed}, Item: ${name}, Quantidade: ${value}`);
        });
    }

    private topItemsConsumed(): void {
        const items = StatsService.topItemsConsumed(this.productService.findAll(), this.serviceService.findAll());
        console.log(`\nLista dos itens mais consumidos: \n`);
        items.forEach((item, i) => console.log(`${i + 1} - ${item.getName()}: ${item.getCount()} vezes`));
    }

    private top10Consumers(): void {
        const topConsumers = StatsService.top10Consumers(this.clientService.findAll());
        if (topConsumers.length === 0) {
            console.log('Nenhum cliente consumiu produtos ou serviços\n');
            return;
        }
        console.log('\nTop 10 clientes que mais consumiram:');
        topConsumers.forEach((c, i) => {
            console.log(`${i + 1} - ${c.getName()}: ${c.getTotalConsumptions()} items consumidos`);
        });
    }

    private historic(): void {
        const historicRegister = StatsService.historic(this.clientService.findAll());
        historicRegister.forEach((c) => {
            console.log(`Nome: ${c.name}`);
            console.log(`Produtos: ${c.products.join(',') || 'Nenhum'}`);
            console.log(`Serviços: ${c.services.join(',') || 'Nenhum'}`);
            console.log('\n');
        });
    }

    private register(): void {
        let cpf = Entrada.receberTexto(`Por favor, digite o CPF do cliente: `).trim();
        let client = this.clientService.find(cpf);
        if (!client) {
            console.log(`Cliente não encontrado!\n`);
            return;
        }
        const petService = new PetService(client.getPets());
        let petName = Entrada.receberTexto(`Por favor, digite o nome do pet: `).trim();
        const pet = petService.find(petName);

        if (!pet) {
            console.log(`Pet não cadastrado!\n`);
            return;
        }

        let item = this.chooseItem();
        if (!item) {
            console.log(`Nenhum consumo foi registrado.\n`);
            return;
        }
        StatsService.register(client, pet, item);
        console.log(
            `Consumo registrado com sucesso!\n` +
                `Item: ${item.getName()}\n` +
                `Cliente: ${client.getName()}\n` +
                `Pet: ${pet.getName()}\n`,
        );
    }

    private chooseItem(): Product | Service | null {
        let type = Entrada.receberTexto(`Por favor, escolha o tipo (PRODUTO / SERVIÇO): `).toLowerCase().trim();
        if (type !== 'produto' && type !== 'serviço' && type !== 'servico') return null;
    
        let name = Entrada.receberTexto(`Por favor, digite o nome do ${type}: `).trim();
        return type === 'produto' ? this.productService.find(name) : this.serviceService.find(name);
    }
}
