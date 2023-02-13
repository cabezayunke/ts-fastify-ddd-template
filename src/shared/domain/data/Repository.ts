export interface Repository<T> {
    find(criteria: Record<string, unknown>): Promise<T | T[]>;
    remove(data: T): Promise<void>;
    save(data: T): Promise<void>;
}