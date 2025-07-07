import Pet from '../model/pet';
import Crud from '../interface/crud';

export default class PetService implements Crud<Pet> {
    private pets: Array<Pet>;

    constructor(pets: Array<Pet>) {
        this.pets = pets;
    }

    find(name: string): Pet | null {
        return this.pets.find((p) => p.getName() === name) || null;
    }

    findAll(): Pet[] {
        return this.pets;
    }
    save(pet: Pet): void {
        this.pets.push(pet);
    }
    update(name: string, updatePet: Pet): void {
        const pet = this.find(name);
        pet?.setName(updatePet.getName());
        pet?.setBreed(updatePet.getBreed());
        pet?.setGender(updatePet.getGender());
        pet?.setType(updatePet.getType());
    }
    delete(name: string): void {
        const i = this.pets.findIndex((p) => p.getName() === name);
        this.pets.splice(i, 1);
    }
}
