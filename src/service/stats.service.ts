import Client from '../model/client';
import Pet from '../model/pet';
import Product from '../model/product';
import Service from '../model/service';

export default class StatsService {
    private constructor() {}

    public static register(client: Client, pet: Pet, item: Product | Service): void {
        if (item instanceof Product) client.addConsumedProduct(item), item.registerConsumption();
        if (item instanceof Service) client.addConsumedService(item), item.registerConsumption();
        pet.addConsumedItem(item);
    }
    public static historic(clients: Client[]): { name: string; products: string[]; services: string[] }[] {
        return clients
            .filter((c) => c.getTotalConsumptions() > 0)
            .map((c) => ({
                name: c.getName(),
                products: c.getConsumedProducts().map((p) => p.getName()),
                services: c.getConsumedServices().map((s) => s.getName()),
            }))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    public static top10Consumers(clients: Client[]): Client[] {
        return clients
            .filter((c) => c.getTotalConsumptions() > 0)
            .sort((a, b) => b.getTotalConsumptions() - a.getTotalConsumptions())
            .slice(0, 10);
    }

    public static topItemsConsumed(products: Array<Product>, services: Array<Service>): Array<Product | Service> {
        const items: Array<Product | Service> = [];
        items.push(...products, ...services);
        return items.filter((item) => item.getCount() > 0).sort((a, b) => b.getCount() - a.getCount());
    }

    public static itemsByPet(clients: Client[]) {
        const map = new Map<string, number>();
        clients.forEach((c) =>
            c.getPets().forEach((p) =>
                p.getConsumedItems().forEach((i) => {
                    const key = `${p.getType()},${p.getBreed()},${i.getName()}`;
                    const total = (map.get(key) || 0) + 1;
                    map.set(key, total);
                }),
            ),
        );

        const resultMap = new Map<string, { type: string; breed: string; name: string; value: number }>();
        for (const [key, value] of map.entries()) {
            const [type, breed, name] = key.split(',');
            const i = `${type},${breed}`;
            const existingEntry = resultMap.get(i);
            if (!existingEntry || existingEntry.value < value) {
                resultMap.set(i, { type, breed, name, value });
            }
        }
        return Array.from(resultMap.values()).sort((a, b) => b.value - a.value);
    }

    public static clientByAmoutSpent(clients: Client[]) {
        return clients.sort((a,b) => b.getAmoutSpent() - a.getAmoutSpent())
    }
}
