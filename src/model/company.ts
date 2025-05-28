import Client from './client';
import Service from './service';
import Product from './product';
import CPF from './cpf';
import RG from './rg';
import Phone from './phone';
import Pet from './pet';

export default class Company {
    private clients: Array<Client>;
    private products: Array<Product>;
    private services: Array<Service>;

    constructor() {
        this.products = [];
        this.services = [];
        this.clients = [];
        this.loadInitialData();
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

    private loadInitialData(): void {
        // Produtos
        const shampoo = new Product('Shampoo Pet', 25.0);
        const racao = new Product('Ração Premium', 120.0);
        const coleira = new Product('Coleira Antipulgas', 45.0);
        const brinquedo = new Product('Brinquedo Morder', 15.0);
        const petisco = new Product('Petisco Natural', 20.0);
        this.products.push(shampoo, racao, coleira, brinquedo, petisco);

        // Serviços
        const banho = new Service('Banho', 50.0);
        const tosa = new Service('Tosa', 60.0);
        const consulta = new Service('Consulta Veterinária', 100.0);
        const vacinacao = new Service('Vacinação', 80.0);
        const hotel = new Service('Hotel Pet', 150.0);
        this.services.push(banho, tosa, consulta, vacinacao, hotel);

        // Função auxiliar de consumo
        const consume = (client: Client, petIndex: number, items: Array<Product | Service>) => {
            const pet = client.getPets()[petIndex];
            items.forEach((item) => {
                item.registerConsumption();
                pet.addConsumedItem(item);
                if (item instanceof Product) client.addConsumedProduct(item);
                if (item instanceof Service) client.addConsumedService(item);
            });
        };

        // Função auxiliar para criar clientes
        const createClient = (
            name: string,
            socialName: string,
            cpfValue: string,
            cpfDate: Date,
            rgValue: string,
            rgDate: Date,
            ddd: string,
            phoneNumber: string,
            petName: string,
            petBreed: string,
            petGender: string,
            petType: string,
            consumedItems: Array<Product | Service> = [],
        ) => {
            const client = new Client(name, socialName, new CPF(cpfValue, cpfDate));
            client.addRg(new RG(rgValue, rgDate));
            client.addPhone(new Phone(ddd, phoneNumber));
            client.addPet(new Pet(petName, petBreed, petGender, petType));

            if (consumedItems.length > 0) {
                consume(client, 0, consumedItems); // Sempre para o primeiro pet
            }

            this.clients.push(client);
        };

        // Criando alguns clientes com consumos
        createClient(
            'João da Silva',
            'Joãozinho',
            '12345678900',
            new Date(2000, 5, 15),
            'MG1234567',
            new Date(2010, 2, 10),
            '31',
            '999999999',
            'Rex',
            'Labrador',
            'M',
            'Cachorro',
            [shampoo, brinquedo, banho],
        );
        createClient(
            'Maria Oliveira',
            'Mari',
            '98765432100',
            new Date(1995, 10, 2),
            'SP9876543',
            new Date(2012, 6, 22),
            '11',
            '988888888',
            'Mimi',
            'Persa',
            'F',
            'Gato',
            [racao, consulta],
        );
        createClient(
            'Carlos Souza',
            'Carlão',
            '11122233344',
            new Date(1988, 3, 20),
            'RJ1234567',
            new Date(2011, 5, 15),
            '21',
            '987654321',
            'Bolt',
            'Pastor Alemão',
            'M',
            'Cachorro',
            [racao, coleira, banho],
        );
        createClient(
            'Ana Lima',
            'Aninha',
            '55566677788',
            new Date(1992, 8, 5),
            'MG7654321',
            new Date(2013, 4, 30),
            '32',
            '991112223',
            'Luna',
            'Siamês',
            'F',
            'Gato',
            [petisco, vacinacao],
        );
        createClient(
            'Pedro Martins',
            'Pedrinho',
            '99988877766',
            new Date(1990, 0, 12),
            'BA1233214',
            new Date(2009, 7, 18),
            '71',
            '981234567',
            'Max',
            'Golden',
            'M',
            'Cachorro',
            [shampoo, tosa, consulta],
        );
        createClient(
            'Juliana Costa',
            'Ju',
            '22334455667',
            new Date(1985, 2, 25),
            'PE1122334',
            new Date(2014, 1, 14),
            '81',
            '998877665',
            'Mel',
            'Poodle',
            'F',
            'Cachorro',
            [coleira],
        );
        createClient(
            'Rafael Nunes',
            'Rafa',
            '33445566778',
            new Date(1993, 6, 30),
            'PR2233445',
            new Date(2016, 3, 12),
            '41',
            '996655443',
            'Tom',
            'Maine Coon',
            'M',
            'Gato',
            [brinquedo, petisco, banho],
        );
        createClient(
            'Fernanda Rocha',
            'Fe',
            '44556677889',
            new Date(1987, 9, 22),
            'CE3344556',
            new Date(2015, 5, 20),
            '85',
            '997766554',
            'Nina',
            'Shih Tzu',
            'F',
            'Cachorro',
            [racao, consulta],
        );
        createClient(
            'Lucas Mendes',
            'Luquinhas',
            '55667788990',
            new Date(1996, 11, 3),
            'AM4455667',
            new Date(2013, 9, 10),
            '92',
            '994433221',
            'Spike',
            'Bulldog',
            'M',
            'Cachorro',
            [hotel],
        );
        createClient(
            'Isabela Ferreira',
            'Isa',
            '66778899001',
            new Date(1991, 4, 18),
            'GO5566778',
            new Date(2012, 11, 25),
            '62',
            '993344556',
            'Lola',
            'Beagle',
            'F',
            'Cachorro',
            [petisco, tosa],
        );
        createClient(
            'Marcos Dias',
            'Marcão',
            '77889900112',
            new Date(1984, 2, 14),
            'SC7788991',
            new Date(2011, 10, 11),
            '48',
            '991223344',
            'Toby',
            'Boxer',
            'M',
            'Cachorro',
            [coleira, vacinacao],
        );
        createClient(
            'Camila Azevedo',
            'Cami',
            '88990011223',
            new Date(1997, 7, 7),
            'RS8899001',
            new Date(2018, 2, 2),
            '51',
            '998812345',
            'Jade',
            'Husky',
            'F',
            'Cachorro',
            [shampoo, banho, tosa],
        );

        createClient(
            'Eduardo Teixeira',
            'Dudu',
            '99001122334',
            new Date(1986, 6, 6),
            'AC9900112',
            new Date(2014, 1, 5),
            '68',
            '993322110',
            'Simba',
            'Vira-lata',
            'M',
            'Cachorro',
            [consulta],
        );
        createClient(
            'Larissa Borges',
            'Lari',
            '10111222334',
            new Date(1994, 9, 9),
            'TO1011122',
            new Date(2015, 11, 22),
            '63',
            '992211334',
            'Bela',
            'Sphynx',
            'F',
            'Gato',
            [brinquedo],
        );
        createClient(
            'Henrique Silva',
            'Rick',
            '11122334455',
            new Date(1993, 2, 18),
            'RO1112233',
            new Date(2013, 7, 30),
            '69',
            '995544332',
            'Thor',
            'Doberman',
            'M',
            'Cachorro',
            [shampoo, vacinacao],
        );
        createClient(
            'Patrícia Mendes',
            'Pathy',
            '12233445566',
            new Date(1989, 4, 21),
            'RR1223344',
            new Date(2012, 10, 19),
            '95',
            '994455667',
            'Kira',
            'Persa',
            'F',
            'Gato',
            [racao, hotel],
        );
        createClient(
            'Gustavo Alves',
            'Guga',
            '13344556677',
            new Date(1983, 1, 1),
            'PI1334455',
            new Date(2016, 6, 6),
            '86',
            '993366777',
            'Zeca',
            'Buldogue',
            'M',
            'Cachorro',
            [shampoo, petisco],
        );
        createClient(
            'Sabrina Lopes',
            'Sá',
            '14455667788',
            new Date(1990, 11, 11),
            'MA1445566',
            new Date(2011, 3, 15),
            '98',
            '992244888',
            'Cacau',
            'Chow Chow',
            'F',
            'Cachorro',
            [brinquedo, consulta],
        );
        createClient(
            'Daniel Cardoso',
            'Dani',
            '15566778899',
            new Date(1992, 5, 25),
            'AL1556677',
            new Date(2014, 7, 9),
            '82',
            '991155446',
            'Lulu',
            'Pug',
            'F',
            'Cachorro',
            [banho],
        );
        createClient(
            'Elaine Faria',
            'Lai',
            '16677889900',
            new Date(1996, 8, 8),
            'SE1667788',
            new Date(2013, 12, 12),
            '79',
            '997722556',
            'Frajola',
            'Angorá',
            'M',
            'Gato',
            [coleira, tosa],
        );
        createClient(
            'Renato Pinto',
            'Renatão',
            '17788990011',
            new Date(1981, 6, 6),
            'PA1778899',
            new Date(2009, 4, 4),
            '91',
            '995577334',
            'Rocky',
            'Rottweiler',
            'M',
            'Cachorro',
            [consulta, hotel],
        );
        createClient(
            'Tatiane Silva',
            'Tati',
            '18899001122',
            new Date(1998, 0, 30),
            'MT1889900',
            new Date(2019, 1, 1),
            '65',
            '998899111',
            'Luna',
            'Bengal',
            'F',
            'Gato',
            [vacinacao],
        );
    }
}
