const { nanoid } = require('nanoid');
const books = require('./books');
 
const postBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    
    if (name === undefined) {
    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
       });
       response.code(400);
    
       return response;

    }else if(year === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi tahun buku'
        });
        response.code(400);

        return response;
    }else if(author === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama penulis buku'
        });
        response.code(400);

        return response;
    }else if(publisher === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi penerbit buku'
        });
        response.code(400);

        return response;
    }else if(pageCount === undefined){
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi total halaman buku'
        });
        response.code(400);
        
        return response;
    }else if (readPage > pageCount) {
    const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
       });
       response.code(400);
    
       return response;
    };
    
    const id = nanoid(16);
    const finished = (pageCount === readPage);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const newBook = {id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,};
    
    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;
    
      if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        response.code(201);
    
        return response;
      };
    
      const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(500);
    
      return response;
};

const getAllBooksHandler = (request, h) => {
     const { name, reading, finished } = request.query;
      
     let filteredBooks = books;
      
     if (name !== undefined) {
       filteredBooks = filteredBooks.filter((book) => book
         .name.toLowerCase().includes(name.toLowerCase()));
     }else if (reading !== undefined) {
       filteredBooks = filteredBooks.filter((book) => book.reading === !!Number(reading));
     }else if (finished !== undefined) {
       filteredBooks = filteredBooks.filter((book) => book.finished === !!Number(finished));
     };
      
     const response = h.response({
       status: 'success',
       data: {
         books: filteredBooks.map((book) => ({
           id: book.id,
           name: book.name,
           publisher: book.publisher,
         })),
       },
     });
     response.code(200);
      
     return response;
 };

const getBookByIdHandler = (request, h) => {
        const { bookid } = request.params;
    const book = books.filter((n) => n.id === bookid)[0];

    if (book !== undefined) {
      return {
        status: 'success',
        data: {
          book,
        },
      };
    };

    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);

    return response;
};

const putBookByIdHandler = (request, h) =>{
    const { bookid } = request.params;
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((book) => book.id === bookid);

    if (index !== -1) {
        if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
        }else if(year === undefined){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi tahun buku'
            });
            response.code(400);

            return response;
        }else if(author === undefined){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama penulis buku'
            });
            response.code(400);

            return response;
        }else if(publisher === undefined){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi penerbit buku'
            });
            response.code(400);

            return response;
        }else if(pageCount === undefined){
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi total halaman buku'
            });
            response.code(400);
            
            return response;
        }else if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        
        return response;
        };

        const finished = (pageCount === readPage);

        books[index] = {
        ...books[index], name, year, author, summary, publisher, pageCount, readPage, finished, reading, updatedAt};

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
            });
        response.code(200);

        return response;
        }
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        });
        response.code(404);

        return response;
};
const deleteBookByIdHandler = ( request, h) => {
    const { bookid } = request.params;

    const index = books.findIndex((book) => book.id === bookid);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });
        response.code(200);
        
        return response;
      }

      const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);

      return response;
    
};

module.exports = { 
    postBookHandler, 
    getAllBooksHandler,
    getBookByIdHandler,
    putBookByIdHandler,
    deleteBookByIdHandler };