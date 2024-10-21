import { FastifyInstance } from "fastify";
import supertest from "supertest";
import { bookService as BookService } from "../@services/book.service";
import { app } from "../app"; // Importando a instância do app

describe("Book routes", () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = app;
    await server.ready();
  });

  const mockBookService: Partial<typeof BookService> = {
    findAll: jest.fn().mockResolvedValue([
      {
        name: "Test Book",
        description: "Test Description",
        date: "2023-10-01",
        isbn: "123-456-789",
      },
    ]),
    findOne: jest.fn().mockResolvedValue({
      _id: "1",
      name: "Test Book",
      description: "Test Description",
      date: "1925-04-10T00:00:00.000Z",
      isbn: "123-456-789",
    }),
    create: jest.fn().mockResolvedValue({
      name: "Test Book",
      description: "Test Description",
      date: "1925-04-10T00:00:00.000Z",
      isbn: "123-456-789",
    }),
    update: jest.fn().mockResolvedValue({
      _id: "1",
      name: "Updated Book",
      description: "Updated Description",
      date: "1925-04-10T00:00:00.000Z",
      isbn: "987-654-321",
    }),
    destroy: jest.fn().mockResolvedValue({ _id: "1" }),
  };

  beforeEach(() => {
    jest.spyOn(BookService, 'findAll').mockImplementation(mockBookService.findAll as jest.Mock);
    jest.spyOn(BookService, 'findOne').mockImplementation(mockBookService.findOne as jest.Mock);
    jest.spyOn(BookService, 'create').mockImplementation(mockBookService.create as jest.Mock);
    jest.spyOn(BookService, 'update').mockImplementation(mockBookService.update as jest.Mock);
    jest.spyOn(BookService, 'destroy').mockImplementation(mockBookService.destroy as jest.Mock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /books", async () => {
    const response = await supertest(server.server)
      .get("/books")
      .expect(200);

    expect(response.body).toEqual(await (mockBookService.findAll as jest.Mock).mock.results[0].value);
  });

  it("GET /books/:id", async () => {
    const response = await supertest(server.server)
      .get("/books/1")
      .expect(200);

    expect(response.body).toEqual(await (mockBookService.findOne as jest.Mock).mock.results[0].value);
  });

  it("POST /books", async () => {
    const newBook = {
      name: "New Book",
      description: "New Description",
      date: "1925-04-10T00:00:00.000Z",
      isbn: "111-222-333",
    };

    const response = await supertest(server.server)
      .post("/books")
      .send(newBook)
      .expect(201);

    expect(response.body).toEqual(await (mockBookService.create as jest.Mock).mock.results[0].value);
  });

  it("PUT /books/:id", async () => {
    const updatedBook = {
      name: "Updated Book",
      description: "Updated Description",
      date: "2023-10-02",
      isbn: "987-654-321",
    };

    const response = await supertest(server.server)
      .put("/books/1")
      .send(updatedBook)
      .expect(200);

    expect(response.body).toEqual(await (mockBookService.update as jest.Mock).mock.results[0].value);
  });

  it("DELETE /books/:id", async () => {
    const response = await supertest(server.server)
      .delete("/books/1")
      .expect(200);

    expect(response.body).toEqual(await (mockBookService.destroy as jest.Mock).mock.results[0].value);
  });

  afterAll(async () => {
    await server.close();
  });
});