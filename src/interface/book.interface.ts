import { BookDto } from '../@controllers/book/dto/book.dto'

export interface Book {
    title: string
    description: string
    isbn: string
    date: Date
}

export interface BookInterface {
    findAll(): Promise<Book[]>
    findOne(id: string): Promise<Book>
    create(book: BookDto): Promise<Book>
    update(id: string, book: BookDto): Promise<Book>
    destroy(id: string): Promise<Book>
}