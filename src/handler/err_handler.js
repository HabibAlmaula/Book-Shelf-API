const handleValidationError = function (request, h, err) {
    if (err.isJoi && Array.isArray(err.details) && err.details.length > 0) {
        const invalidItem = err.details[0];
        let message = invalidItem.message;
        return h.response({
            status: 'fail',
            message: (request.method === 'put') ? message.replace('menambahkan', 'memperbarui') : message,
        })
            .code(400)
            .takeover();
    }

    return h.response(err)
        .takeover()
};

module.exports = handleValidationError;