import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RegisterConsumeParams {
  cpf: string;
  itemType: 'product' | 'service';
  itemName: string;
  petName: string; 
  quantity?: number;
}

export const registerItem = async ({
  cpf,
  itemType,
  itemName,
  petName,
  quantity = 1,
}: RegisterConsumeParams) => {
  if (quantity <= 0) throw new Error("Quantidade deve ser maior que zero");
  if (!petName) throw new Error("Nome do pet é obrigatório");

  const client = await prisma.client.findFirst({
    where: { cpf: { number: cpf } },
    include: {
      pets: { where: { name: petName } }
    }
  });

  if (!client) throw new Error("Cliente não encontrado pelo CPF");
  if (client.pets.length === 0) throw new Error("Pet não encontrado para esse cliente");

  const pet = client.pets[0];
  if (itemType === "product") {
    const product = await prisma.product.findFirst({ 
      where: { title: itemName } 
    });
    if (!product) throw new Error("Produto não encontrado");

    await prisma.$transaction([
      prisma.consumedProduct.create({
        data: {
          clientId: client.id,
          productId: product.id,
          quantity
        }
      }),
      prisma.petConsumption.create({
        data: {
          clientId: client.id,
          petId: pet.id,
          itemName: product.title,
          quantity
        }
      })
    ]);
  } 
  else if (itemType === "service") {
    const service = await prisma.service.findFirst({ 
      where: { title: itemName } 
    });
    if (!service) throw new Error("Serviço não encontrado");

    await prisma.$transaction([
      prisma.consumedService.create({
        data: {
          clientId: client.id,
          serviceId: service.id,
          quantity
        }
      }),
      prisma.petConsumption.create({
        data: {
          clientId: client.id,
          petId: pet.id,
          itemName: service.title,
          quantity
        }
      })
    ]);
  }
  else {
    throw new Error("Tipo de item inválido");
  }
  return { message: "Consumo registrado com sucesso" };
};

export const getHistoric = async () => {
  const clients = await prisma.client.findMany({
    include: {
      consumedProducts: {
        include: { product: true },
      },
      consumedServices: {
        include: { service: true },
      },
    },
  });

  return clients
    .filter(c => c.consumedProducts.length || c.consumedServices.length)
    .map(c => ({
      name: c.name,
      products: c.consumedProducts.map(cp => cp.product.title),
      services: c.consumedServices.map(cs => cs.service.title),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};

export const getTop10Consumers = async () => {
  const clients = await prisma.client.findMany({
    include: {
      consumedProducts: true,
      consumedServices: true,
    },
  });

  return clients
    .map(c => ({
      id: c.id,
      name: c.name,
      total: c.consumedProducts.reduce((sum, cp) => sum + cp.quantity, 0) +
             c.consumedServices.reduce((sum, cs) => sum + cs.quantity, 0),
    }))
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
};

export const getTopItemsConsumed = async () => {
  const [products, services] = await Promise.all([
    prisma.product.findMany({ include: { consumptions: true } }),
    prisma.service.findMany({ include: { consumptions: true } }),
  ]);

  const allItems = [
    ...products.map(p => ({
      id: p.id,
      name: p.title,
      type: 'product',
      count: p.consumptions.reduce((acc, c) => acc + c.quantity, 0),
    })),
    ...services.map(s => ({
      id: s.id,
      name: s.title,
      type: 'service',
      count: s.consumptions.reduce((acc, c) => acc + c.quantity, 0),
    })),
  ];

  return allItems
    .filter(i => i.count > 0)
    .sort((a, b) => b.count - a.count);
};

export const getClientsByAmountSpent = async () => {
  const clients = await prisma.client.findMany({
    include: {
      consumedProducts: {
        include: { product: true },
      },
      consumedServices: {
        include: { service: true },
      },
    },
  });

  return clients
    .map(c => {
      const productTotal = c.consumedProducts.reduce(
        (acc, cp) => acc + cp.quantity * Number(cp.product.value),
        0
      );
      const serviceTotal = c.consumedServices.reduce(
        (acc, cs) => acc + cs.quantity * Number(cs.service.value),
        0
      );
      return {
        id: c.id,
        name: c.name,
        totalSpent: productTotal + serviceTotal,
      };
    })
    .sort((a, b) => b.totalSpent - a.totalSpent);
};

export const getItemsByPet = async () => {
  const pets = await prisma.pet.findMany({
    include: {
      PetConsumption: true,
    },
  });

  const result = pets.map(pet => {
    // Agrupar consumos por nome do item
    const itemMap: { [itemName: string]: { quantity: number, consumedAt: Date[] } } = {};

    pet.PetConsumption.forEach(pc => {
      if (!itemMap[pc.itemName]) {
        itemMap[pc.itemName] = { quantity: 0, consumedAt: [] };
      }
      itemMap[pc.itemName].quantity += pc.quantity;
      itemMap[pc.itemName].consumedAt.push(pc.consumedAt);
    });

    const items = Object.entries(itemMap).map(([name, data]) => ({
      name,
      quantity: data.quantity,
      consumedAt: data.consumedAt, // ou pode pegar só a última data, se quiser
    }));

    const total = items.reduce((acc, item) => acc + item.quantity, 0);

    return {
      petName: pet.name,
      species: pet.species,
      breed: pet.breed,
      totalItems: total,
      items,
    };
  });

  return result
    .filter(p => p.totalItems > 0)
    .sort((a, b) => b.totalItems - a.totalItems);
};