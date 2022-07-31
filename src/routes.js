const { handler } = require('@hapi/hapi/lib/cors');
const { postBookHandler, getAllBooksHandler, getBookByIdHandler, putBookByIdHandler, deleteBookByIdHandler } = require('./handler');
const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: postBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooksHandler,
    },
    {
        method: 'GET',
        path: '/books/{bookid}',
        handler: getBookByIdHandler,    
    },
    {
        method: 'PUT',
        path: '/books/{bookid}',
        handler: putBookByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{bookid}',
        handler: deleteBookByIdHandler,

    }

  ];
   
  module.exports = routes;