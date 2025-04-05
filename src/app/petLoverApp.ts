import { clear } from 'console';
import Entrada from '../io/entrada';
import Company from '../model/company';
import ClientUI from '../ui/clientUI';
import StatsUI from '../ui/statsUI';
import ProductUI from '../ui/productUI';
import ServiceUI from '../ui/serviceUI';

export default class PetLoverApp {
    private company: Company = new Company();
    private clientUI: ClientUI;
    private serviceUI: ServiceUI;
    private productUI: ProductUI;
    private consumptionUI: StatsUI;

    constructor() {
        this.clientUI = new ClientUI(this.company);
        this.serviceUI = new ServiceUI(this.company);
        this.productUI = new ProductUI(this.company);
        this.consumptionUI = new StatsUI(this.company);
    }

    public start() {
        let execution = true;
        while (execution) {
            clear();
            console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`);
            console.log(`Opções:`);
            console.log(`1 - Gerenciar Clientes`);
            console.log(`2 - Gerenciar Produtos`);
            console.log(`3 - Gerenciar Servicos`);
            console.log(`4 - Gerenciar Consumo`);
            console.log(`0 - Sair\n`);
            let option = Entrada.receberNumero(`Por favor, escolha uma opção: `);
            switch (option) {
                case 1:
                    this.clientUI.menu();
                    break;
                case 2:
                    this.productUI.menu();
                    break;
                case 3:
                    this.serviceUI.menu();
                    break;
                case 4:
                    this.consumptionUI.menu();
                    break;
                case 0:
                    execution = false;
                    console.log(`Até mais`);
                    break;
                default:
                    console.log(`\nOperação não entendida :(\n`);
            }
        }
    }
}
