import { clear } from 'console';
import Entrada from '../io/entrada';
import Client from '../model/client';
import Pet from '../model/pet';
import PetService from '../service/pet.service';

export default class PetUI {
    private client: Client;
    private petService: PetService;

    constructor(client: Client) {
        this.petService = new PetService(client.getPets());
        this.client = client;
    }

    public petMenu(): void {
        clear();
        console.log(`Gerenciamento de Pet\nCliente: ${this.client.getName()}`);
        let execution = true;

        while (execution) {
            console.log(`\nOpções: `);
            console.log(`1 - Cadastrar pet`);
            console.log(`2 - Listar todos os pets`);
            console.log(`3 - Atualizar pet`);
            console.log(`4 - Remover pet`);
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
        console.log(`\nInício do cadastro`);
        const name = Entrada.receberTexto(`Por favor, informe o nome do pet: `).trim();
        const type = Entrada.receberTexto(`Por favor, informe o tipo do pet (Ex: Cachorro, Gato): `).trim();
        const bread = Entrada.receberTexto(`Por favor, informe a raça do pet: `).trim();
        const gender = Entrada.receberTexto(`Por favor, informe o gênero do pet: `).trim();
        if (this.petService.find(name)) {
            console.log(`\nNome de pet já cadastrado!\n`);
        } else {
            const pet = new Pet(name, type, bread, gender);
            this.petService.save(pet);
            console.log(`\nPet cadastrado com sucesso!\n`);
        }
    }

    private findAll(): void {
        console.log(`\nLista de todos os pets`);
        const pets = this.petService.findAll();
        if (pets.length === 0) {
            console.log(`Nenhum pet cadastrado.\n`);
            return;
        }
        pets.forEach((p) => console.log(`${p.toString()}\n`));
    }

    private update(): void {
        const name = Entrada.receberTexto(`Por favor, informe o nome do pet que deseja atualizar: `).trim();
        const pet = this.petService.find(name);
        if (!pet) {
            console.log(`\nPet não cadastrado!\n`);
        } else {
            console.log(`\nAtualizando dados do pet - ${pet.getName()}`);
            const newName = Entrada.receberTexto(`Novo nome do pet: `).trim();
            const newType = Entrada.receberTexto(`Novo tipo de pet (Ex: Cachorro, Gato): `).trim();
            const newBread = Entrada.receberTexto(`Nova raça do pet: `).trim();
            const newGender = Entrada.receberTexto(`Novo gênero: `).trim();

            const updatePet = new Pet(newName, newType, newBread, newGender);
            this.petService.update(name, updatePet);
            console.log(`\nPet atualizado com sucesso!\n`);
        }
    }

    private remove(): void {
        const name = Entrada.receberTexto(`Por favor, informe o nome do pet que deseja remover: `).trim();
        const pet = this.petService.find(name);
        if (!pet) {
            console.log(`\nPet não cadastrado!\n`);
        } else {
            this.petService.delete(pet.getName());
            console.log(`\nPet removido com sucesso!\n`);
        }
    }
}
