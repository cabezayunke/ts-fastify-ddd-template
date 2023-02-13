export interface Repository<T> {
    find(criteria: Record<string, unknown>): Promise<T[]>;
    remove(key: string): Promise<string>;
    save(data: T): Promise<string>;
}