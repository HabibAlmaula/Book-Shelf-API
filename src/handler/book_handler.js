const {nanoid} = require("nanoid");
const _ = require('lodash/core');

const books = [];
const addBookHandler = (req, h) => {
    const {
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = req.payload;
    const insertedAt = new Date().toISOString();
    const book = {
        id: nanoid(16),
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        insertedAt,
        updatedAt: insertedAt,
    };
    books.push(book);

    const isSuccess = books.filter((b) => b.id === book.id).length > 0;
    if (isSuccess) {
        return h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: book.id,
            }
        }).code(201);
    }
    return h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    }).code(500);
};
const getAllBooksHandler = (req, h) => {
    const {reading, finished, name} = req.query;
    return h.response({
        status: 'success',
        data: {
            books: _.filter(books, (book) => {
                    if (reading) {
                        return book.reading === !!+reading;
                    }
                    if (finished) {
                        return book.finished === !!+finished;
                    }
                    if (name) {
                        return book.name.includes(name);
                    }
                    return true;
                }
            ).map((book) => {
                if (name) {
                    return {
                        name: book.name,
                        publisher: book.publisher,
                    }
                } else {
                    return {
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    }
                }
            }),
        },
    });


}
const getBookByIdHandler = (req, h) => {
    const {id} = req.params;
    const book = books.find((book) => book.id === id);
    if (book) {
        return h.response({
            status: 'success',
            data: {
                book,
            },
        });
    }
    return h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    }).code(404);
}
const editBookByIdHandler = (req, h) => {
    const {id} = req.params;
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.payload;
    const book = books.find((book) => book.id === id);
    if (book) {
        book.name = name;
        book.year = year;
        book.author = author;
        book.summary = summary;
        book.publisher = publisher;
        book.pageCount = pageCount;
        book.readPage = readPage;
        book.finished = pageCount === readPage;
        book.reading = reading;
        book.updatedAt = new Date().toISOString();
        return h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
    }
    return h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    }).code(404);
}
const deleteBookByIdHandler = (req, h) => {
    const {id} = req.params;
    const book = books.find((book) => book.id === id);
    if (book) {
        books.splice(books.indexOf(book), 1);
        return h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
    }
    return h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    }).code(404);
}


module.exports = {
    books,
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};
