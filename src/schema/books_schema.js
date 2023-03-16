const Joi = require('joi');

const bookSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Gagal menambahkan buku. Mohon isi nama buku',
  }),
  year: Joi.number().required(),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number(),
  readPage: Joi.number().max(Joi.ref('pageCount')).messages({
    'number.max': 'Gagal menambahkan buku. ' +
        'readPage tidak boleh lebih besar dari pageCount',
  }),
  reading: Joi.boolean(),
});

module.exports = bookSchema;
