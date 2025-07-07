TRUNCATE TABLE consumed_services, consumed_products, consumed_pets, phones, rgs, cpfs, pets, clients, services, products RESTART IDENTITY CASCADE;

INSERT INTO products (title, value) VALUES
('Ração Premium', 89.90),
('Shampoo Canino', 29.99),
('Coleira Antipulgas', 59.50),
('Brinquedo de Borracha', 19.90),
('Petisco Natural', 15.00);


INSERT INTO services (title, value) VALUES
('Banho e Tosa', 79.00),
('Consulta Veterinária', 120.00),
('Vacinação', 99.90),
('Adestramento', 150.00),
('Transporte Pet', 49.00);


INSERT INTO clients (name, "socialName", "registrationDate") VALUES
('Ana Beatriz da Silva', 'Ana Silva', NOW()),
('Carlos Eduardo Souza', 'Carlos Souza', NOW()),
('Juliana Mendes Lima', 'Jú Mendes', NOW()),
('Rafael Oliveira Santos', 'Rafa Santos', NOW()),
('Fernanda Alves Costa', 'Fê Costa', NOW()),
('Bruno Henrique Rocha', 'Bruno Rocha', NOW()),
('Camila Ferreira Dias', 'Camila Dias', NOW()),
('Lucas Gabriel Martins', 'Lucas G. Martins', NOW()),
('Mariana Gonçalves Ribeiro', 'Mari Ribeiro', NOW()),
('Gustavo Pereira Lima', 'Gustavo Lima', NOW()),
('Patrícia Moreira', 'Paty Moreira', NOW()),
('André Luiz Barbosa', 'André L. Barbosa', NOW()),
('Bianca Rocha Nunes', 'Bia Nunes', NOW()),
('Rodrigo Azevedo Pinto', 'Rodrigo Pinto', NOW()),
('Letícia Fernandes Gomes', 'Letícia Gomes', NOW()),
('Thiago Costa Almeida', 'Thi Almeida', NOW()),
('Gabriela Teixeira Ramos', 'Gabi Ramos', NOW()),
('Felipe Moura Dantas', 'Fê Dantas', NOW()),
('Aline Souza Marques', 'Aline Marques', NOW()),
('Vinícius Tavares', 'Vini Tavares', NOW())


INSERT INTO pets (name, breed, species, "clientId") VALUES
('Rex', 'Labrador', 'Cachorro', 1),
('Mimi', 'Poodle', 'Cachorro', 2),
('Luna', 'Siamês', 'Gato', 3),
('Tico', 'Bulldog', 'Cachorro', 4),
('Nina', 'Persa', 'Gato', 5),
('Bob', 'Shih Tzu', 'Cachorro', 6),
('Malu', 'Sphynx', 'Gato', 7),
('Toby', 'Golden Retriever', 'Cachorro', 8),
('Lili', 'Angorá', 'Gato', 9),
('Max', 'Beagle', 'Cachorro', 10),
('Bella', 'Bengal', 'Gato', 11),
('Thor', 'Boxer', 'Cachorro', 12),
('Zizi', 'Maine Coon', 'Gato', 13),
('Fred', 'Doberman', 'Cachorro', 14),
('Moka', 'Siberiano', 'Gato', 15),
('Rudy', 'Pug', 'Cachorro', 16),
('Susi', 'Ragdoll', 'Gato', 17),
('Jake', 'Dálmata', 'Cachorro', 18),
('Lola', 'Himalaio', 'Gato', 19),
('Bobbie', 'Yorkshire', 'Cachorro', 20);

INSERT INTO cpfs (number, "issueDate", "clientId") VALUES
('123.456.789-01', NOW() - INTERVAL '5 years', 1),
('234.567.890-12', NOW() - INTERVAL '4 years', 2),
('345.678.901-23', NOW() - INTERVAL '3 years', 3),
('456.789.012-34', NOW() - INTERVAL '6 years', 4),
('567.890.123-45', NOW() - INTERVAL '2 years', 5),
('678.901.234-56', NOW() - INTERVAL '1 years', 6),
('789.012.345-67', NOW() - INTERVAL '7 years', 7),
('890.123.456-78', NOW() - INTERVAL '8 years', 8),
('901.234.567-89', NOW() - INTERVAL '3 years', 9),
('012.345.678-90', NOW() - INTERVAL '4 years', 10),
('123.321.123-11', NOW() - INTERVAL '5 years', 11),
('234.432.234-22', NOW() - INTERVAL '6 years', 12),
('345.543.345-33', NOW() - INTERVAL '2 years', 13),
('456.654.456-44', NOW() - INTERVAL '1 years', 14),
('567.765.567-55', NOW() - INTERVAL '3 years', 15),
('678.876.678-66', NOW() - INTERVAL '4 years', 16),
('789.987.789-77', NOW() - INTERVAL '5 years', 17),
('890.098.890-88', NOW() - INTERVAL '6 years', 18),
('901.109.901-99', NOW() - INTERVAL '2 years', 19),
('012.210.012-00', NOW() - INTERVAL '1 years', 20);

INSERT INTO rgs (number, "issueDate", "clientId") VALUES
('MG1234567', NOW() - INTERVAL '10 years', 1),
('SP2345678', NOW() - INTERVAL '9 years', 2),
('RJ3456789', NOW() - INTERVAL '8 years', 3),
('MG4567890', NOW() - INTERVAL '7 years', 4),
('SP5678901', NOW() - INTERVAL '6 years', 5),
('RJ6789012', NOW() - INTERVAL '5 years', 6),
('MG7890123', NOW() - INTERVAL '4 years', 7),
('SP8901234', NOW() - INTERVAL '3 years', 8),
('RJ9012345', NOW() - INTERVAL '2 years', 9),
('MG0123456', NOW() - INTERVAL '1 year', 10),
('SP1122334', NOW() - INTERVAL '10 years', 11),
('RJ2233445', NOW() - INTERVAL '9 years', 12),
('MG3344556', NOW() - INTERVAL '8 years', 13),
('SP4455667', NOW() - INTERVAL '7 years', 14),
('RJ5566778', NOW() - INTERVAL '6 years', 15),
('MG6677889', NOW() - INTERVAL '5 years', 16),
('SP7788990', NOW() - INTERVAL '4 years', 17),
('RJ8899001', NOW() - INTERVAL '3 years', 18),
('MG9900112', NOW() - INTERVAL '2 years', 19),
('SP0011223', NOW() - INTERVAL '1 year', 20);

INSERT INTO phones (ddd, number, "clientId") VALUES
('11', '987654321', 1),
('21', '976543210', 2),
('31', '965432109', 3),
('41', '954321098', 4),
('51', '943210987', 5),
('61', '932109876', 6),
('71', '921098765', 7),
('81', '910987654', 8),
('91', '909876543', 9),
('11', '998877665', 10),
('21', '887766554', 11),
('31', '776655443', 12),
('41', '665544332', 13),
('51', '554433221', 14),
('61', '443322110', 15),
('71', '332211009', 16),
('81', '221100998', 17),
('91', '110099887', 18),
('11', '009988776', 19),
('21', '998877665', 20);


INSERT INTO consumed_pets ("petId", "clientId", "itemName", "consumedAt", "quantity") VALUES
(1, 1, 'Ração Premium', NOW() - INTERVAL '10 days', 2),
(2, 2, 'Vacina Antirrábica', NOW() - INTERVAL '15 days', 1),
(3, 3, 'Banho e Tosa', NOW() - INTERVAL '7 days', 1),
(4, 4, 'Ração Light', NOW() - INTERVAL '12 days', 3),
(5, 5, 'Consulta Veterinária', NOW() - INTERVAL '5 days', 1),
(6, 6, 'Brinquedo', NOW() - INTERVAL '9 days', 2),
(7, 7, 'Ração Premium', NOW() - INTERVAL '11 days', 1),
(8, 8, 'Vacina Antirrábica', NOW() - INTERVAL '8 days', 1),
(9, 9, 'Banho e Tosa', NOW() - INTERVAL '6 days', 2),
(10, 10, 'Ração Light', NOW() - INTERVAL '3 days', 1);

INSERT INTO consumed_products ("productId", "clientId","consumedAt", "quantity") VALUES
(1, 1, NOW() - INTERVAL '10 days', 3),
(2, 2, NOW() - INTERVAL '15 days', 1),
(3, 3, NOW() - INTERVAL '7 days', 2),
(4, 4, NOW() - INTERVAL '12 days', 1),
(5, 5, NOW() - INTERVAL '5 days', 4);

INSERT INTO consumed_services ("serviceId", "clientId", "consumedAt", "quantity") VALUES
(1, 1, NOW() - INTERVAL '10 days', 1),
(2, 2, NOW() - INTERVAL '15 days', 1),
(3, 3, NOW() - INTERVAL '7 days', 2),
(4, 4, NOW() - INTERVAL '12 days', 1),
(5, 5, NOW() - INTERVAL '5 days', 3);
