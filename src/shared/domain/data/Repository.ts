export interface Repository<I, A> {
    find(criteria: Record<string, unknown>): Promise<A | A[]>;
    remove(id: I): Promise<void>;
    save(data: A): Promise<void>;
}