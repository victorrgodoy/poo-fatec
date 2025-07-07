import Entrada from '../io/entrada';
import Product from '../model/product';
import ProductService from '../service/product.service';
import Company from '../model/company';
import { clear } from 'console';

export default class ProductUI {
    private productService: ProductService;

    constructor(company: Company) {
        this.productService = new ProductService(company.getProducts());
    }

    public menu(): void {
        clear();
        console.log(`Gerenciamento de Produto\n`);
        let execution = true;
        while (execution) {
            console.log(`Opções:`);
            console.log(`1 - Cadastrar produto`);
            console.log(`2 - Listar todos os produtos`);
            console.log(`3 - Atualizar produto`);
            console.log(`4 - Remover produto`);
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
                case 0:
                    execution = false;
                    break;
                default:
                    console.log(`\nOperação não entendida :(\n`);
                    Entrada.receberTexto(`Pressione Enter para continuar.`);
            }
        }
    }

    private save(): void {
        console.log(`\nInício do cadastro do produto`);
        let name = Entrada.receberTexto(`Por favor informe o nome do produto: `);
        let value = Entrada.receberNumero(`Por favor informe o valor do produto: `);
        const verify = this.productService.find(name);
        if (verify) {
            console.log(`\nProduto já em estoque!\n`);
        } else {
            let product = new Product(name, value);
            this.productService.save(product);
            console.log(`\nProduto cadastrado com sucesso!\n`);
        }
    }

    private findAll(): void {
        console.log(`\nLista de todos os produtos em estoque:`);
        this.productService.findAll().forEach((p) => console.log(`${p.toString()}\n`));
    }

    private update(): void {
        let productName = Entrada.receberTexto(`Por favor, informe o nome do produto que deseja atualizar: `);
        const product = this.productService.find(productName);
        if (!product) {
            console.log(`\nProduto não encontrado!\n`);
        } else {
            let name = Entrada.receberTexto(`Por favor, informe o novo nome do produto: `);
            let newProduct = new Product(name, product.getValue());
            this.productService.update(productName, newProduct);
            console.log(`\nProduto atualizado com sucesso!\n`);
        }
    }

    private remove(): void {
        const name = Entrada.receberTexto(`Por favor informe o nome do produto que deseja remover: `);
        const product = this.productService.find(name);
        if (!product) {
            console.log(`\nProduto não encontrado!\n`);
        } else {
            this.productService.delete(product.getName());
            console.log(`\nProduto removido com sucesso!\n`);
        }
    }
}
