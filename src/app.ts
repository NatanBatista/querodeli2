import fastify, { FastifyInstance } from "fastify";
import { bookRoutes } from "./routes/book.route";

const app: FastifyInstance = fastify({ logger: true });

app.register(
    bookRoutes, {
        prefix: '/books',
    }
)

export { app }