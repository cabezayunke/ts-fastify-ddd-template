import { FastifyInstance } from "fastify";
import { ContainerBuilder } from "diod"

import getUser from "./controller/getUser";
import { MongoUserRepository } from "./data/MongoUserRepository"
import { UserRepository } from "./data/UserRepository"
import { GetUserUseCase } from "./use-cases/GetUserUseCase"

const builder = new ContainerBuilder()
builder.register(UserRepository).use(MongoUserRepository)
builder.registerAndUse(GetUserUseCase)

const container = builder.build()
const routes = async (app: FastifyInstance): Promise<void[]> => Promise.all([
    getUser(app),
])

export { container, routes }