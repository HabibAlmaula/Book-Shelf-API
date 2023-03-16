const {
  addBookHandler, getAllBooksHandler,
  getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler,
} = require('./handler/book_handler');
const bookSchema = require('./schema/books_schema');
const handleValidationError = require('./handler/err_handler');

const routes = [{
  method: 'POST', path: '/books', handler: addBookHandler, options: {
    validate: {
      payload: bookSchema, failAction: handleValidationError,
    },
  },
}, {
  method: 'GET', path: '/books', handler: getAllBooksHandler,
}, {
  method: 'GET', path: '/books/{id}', handler: getBookByIdHandler,
}, {
  method: 'PUT', path: '/books/{id}', handler: editBookByIdHandler, options: {
    validate: {
      payload: bookSchema, failAction: handleValidationError,
    },
  },
}, {
  method: 'DELETE', path: '/books/{id}', handler: deleteBookByIdHandler,
},

];

module.exports = routes;
