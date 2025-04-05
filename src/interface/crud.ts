export default interface Crud<T> {
    findAll(): Array<T>;
    find(id: string): T | null;
    save(model: T): void;
    update(id: string, model: T): void;
    delete(id: string): void;
}
