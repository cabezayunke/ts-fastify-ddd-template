import { ContainerBuilder } from "diod";
import { FastifyInstance } from "fastify";

import { GetUserUseCase } from "../../contexts/users/application/GetUserUseCase";
import { UserRepository } from "../../contexts/users/domain/UserRepository";
import { MongoUserRepository } from "../../contexts/users/infrastructure/MongoUserRepository";
import getUser from "./controller/getUser";

const builder = new ContainerBuilder()
builder.register(UserRepository).use(MongoUserRepository)
builder.registerAndUse(GetUserUseCase)

const container = builder.build()
const routes = async (app: FastifyInstance): Promise<void[]> => Promise.all([
    getUser(app),
])

export { container, routes };
