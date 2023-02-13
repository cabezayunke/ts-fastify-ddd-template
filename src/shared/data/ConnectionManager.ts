export interface ConnectionManager {
    connect(): Promise<void>
    disconnect(): Promise<void>
}