import { FastifyInstance } from "fastify";
import { bookController } from "../@controllers/book/book.controller";

export async function bookRoutes(fastify: FastifyInstance)   {
    fastify.get('/', bookController.findAll)
    fastify.get('/:id', bookController.findOne)
    fastify.post('/', bookController.create)
    fastify.put('/:id', bookController.update)
    fastify.delete('/:id', bookController.destroy)
}