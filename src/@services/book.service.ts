// src/services/bookService.ts


import { BookInterface } from '../interface/book.interface';
import { BookDto } from '../@controllers/book/dto/book.dto';
import { BookModel } from '../schema/book.shema'
import { Book } from '../interface/book.interface';

class BookService implements BookInterface {
    async findAll(): Promise<Book[]> {
        return await BookModel.find({});  // Retorna todos os livros do banco de dados
    }

    async findOne(id: string): Promise<Book> {
        const book = await BookModel.findById(id);
        if (!book) {
            throw new Error('Book not found');  // Lidar com o caso em que o livro não é encontrado
        }
        return book;
    }

    async create(bookDto: BookDto): Promise<Book> {
        const book = new BookModel(bookDto);  // Cria uma nova instância de livro
        return await book.save();         // Salva no banco de dados
    }

    async update(id: string, bookDto: BookDto): Promise<Book> {
        const updatedBook = await BookModel.findByIdAndUpdate(id, bookDto, { new: true });
        if (!updatedBook) {
            throw new Error('Book not found');  // Lidar com o caso em que o livro não é encontrado
        }
        return updatedBook;
    }

    async destroy(id: string): Promise<Book> {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        if (!deletedBook) {
            throw new Error('Book not found');  // Lidar com o caso em que o livro não é encontrado
        }
        return deletedBook;
    }
}

export const bookService = new BookService();  // Instância do serviço
