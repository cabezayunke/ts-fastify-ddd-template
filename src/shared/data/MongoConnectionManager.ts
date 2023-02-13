import mongoose, {Mongoose} from "mongoose";
import {ConnectionManager} from './ConnectionManager';

export class MongoConnectionManager implements ConnectionManager {

    private connection: Mongoose;

    // TODO: add proper logging
    constructor(private config: any) {}

    async connect(): Promise<void> {
        const db = mongoose.connection;
        const tags = { tags: "init,mongodb" };
        
        mongoose.set('debug', this.config.debug);

        db.on("connecting", () => {
            console.log(
                `connecting to mongodb://${this.config.host}:${this.config.port}/${this.config.database}`,
                tags,
            );
        });
        db.on("error", error => {
            console.error("Error in MongoDb connection: " + error.toString(), { ...tags, error });
        });
        db.on("connected", () => {
            console.log("MongoDB connected!", tags);
        });
        db.once("open", () => {
            console.log("MongoDB connection opened!", tags);
        });
        db.on("reconnected", () => {
            console.log("MongoDB reconnected!", tags);
        });
        db.on("disconnected", () => {
            console.log("MongoDB disconnected!", tags);
        });

        this.connection = this.config.uri
            ? await mongoose.connect(this.config.uri, { autoIndex: true })
            : await mongoose.connect(
                `mongodb://${this.config.host}:${this.config.port}/${this.config.database}?authMechanism=DEFAULT`,
                {
                    user: this.config.user,
                    pass: this.config.password,
                    autoIndex: true
                },
            )      
    }

    async disconnect(): Promise<void> {
        if(this.connection) {
            await this.connection.disconnect();
        }
    }
}