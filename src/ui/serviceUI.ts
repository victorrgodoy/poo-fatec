import { clear } from 'console';
import Entrada from '../io/entrada';
import ServiceService from '../service/service.service';
import Company from '../model/company';
import Service from '../model/service';

export default class ServiceUI {
    private serviceService: ServiceService;

    constructor(company: Company) {
        this.serviceService = new ServiceService(company.getServices());
    }

    public menu(): void {
        clear();
        console.log(`Gerenciamento de Serviço\n`);
        let execution = true;
        while (execution) {
            console.log(`Opções:`);
            console.log(`1 - Cadastrar serviço`);
            console.log(`2 - Listar todos os serviços`);
            console.log(`3 - Atualizar serviço`);
            console.log(`4 - Remover serviço`);
            console.log(`0 - Voltar`);

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
                case 0:
                    execution = false;
                    break;
                default:
                    console.log(`\nOperação não entendida :(\n`);
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
            }
        }
    }

    public save(): void {
        console.log(`\nInício do cadastro do serviço`);
        let name = Entrada.receberTexto(`Por favor informe o nome do serviço: `);
        let value = Entrada.receberNumero(`Por favor informe o valor do serviço: `);
        const service = this.serviceService.find(name);
        if (service) {
            console.log(`\nServiço já cadastrado!\n`);
        } else {
            let newService = new Service(name, value);
            this.serviceService.save(newService);
            console.log(`\nServiço cadastrado com sucesso!\n`);
        }
    }

    public findAll(): void {
        console.log(`\nLista de todos os serviços:`);
        this.serviceService.findAll().forEach((s) => console.log(`${s.toString()}\n`));
    }

    public update(): void {
        let serviceName = Entrada.receberTexto(`Por favor informe o nome do serviço que deseja atualizar: `);
        const verify = this.serviceService.find(serviceName);
        if (!verify) {
            console.log(`\nServiço não encontrado!\n`);
        } else {
            let name = Entrada.receberTexto(`Por favor, informe o novo nome do serviço: `);
            let service = new Service(name, verify.getValue());
            this.serviceService.update(serviceName, service);
            console.log(`\nServiço atualizado com sucesso!\n`);
        }
    }

    public remove(): void {
        const serviceName = Entrada.receberTexto(`Por favor, informe o nome do serviço que deseja remover: `);
        const service = this.serviceService.find(serviceName);
        if (!service) {
            console.log(`\nServiço não encontrado!\n`);
        } else {
            this.serviceService.delete(service.getName());
            console.log(`\nServiço removido com sucesso!\n`);
        }
    }
}
