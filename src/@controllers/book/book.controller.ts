import { FastifyReply, FastifyRequest } from "fastify"
import { bookService } from '../../@services/book.service'
import { Book } from '../../interface/book.interface'
import { BookDto } from './dto/book.dto'

class BookController {
    async findAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const books: Book[] = await bookService.findAll()
            reply.status(200).send(books)
        } catch (error) {
            console.error(error)
            reply.status(500).send({ error: 'Erro ao buscas' })
        }
    }

    async findOne(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        try {
            const book: Book = await bookService.findOne(id)
            reply.status(200).send(book)
        } catch (error) {
            console.error(error)
            reply.status(404).send({ error: 'Erro ao buscar' })
        }
    }

    async create(request: FastifyRequest<{Body: BookDto}>, reply: FastifyReply) {
        const bookDto = request.body;
        try {
            const newBook: Book = await bookService.create(bookDto)
            reply.status(201).send(newBook)
        } catch (error) {
            console.error(error)
            reply.status(400).send({ error: "Error ao criar" })
        }
    }

    async update(request: FastifyRequest<{ Params: { id: string },Body: BookDto }>, reply: FastifyReply) {
        const { id } = request.params
        const bookDto = request.body
        try {
            const updatedBook: Book = await bookService.update(id, bookDto)
            reply.status(200).send(updatedBook)
        } catch (error) {
            console.error(error)
            reply.status(404).send({ error: "Erro ao atualizar" })
        }
    }

    async destroy(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string }
        try {
            const deletedBook: Book = await bookService.destroy(id)
            reply.status(200).send(deletedBook)
        } catch (error) {
            console.error(error)
            reply.status(404).send({ error: "Erro ao excluir" })
        }
    }
}

export const bookController = new BookController();
