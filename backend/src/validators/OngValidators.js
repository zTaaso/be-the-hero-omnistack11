const { celebrate, Joi, Segments } = require('celebrate')

module.exports = {
    headerValidator() {
        // validate request headers
        return celebrate({
            [Segments.HEADERS]: Joi.object({
                authorization: Joi.string().required()
            }).unknown()
        })
    },

    dataValidator() {
        // validate request data
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                whatsapp: Joi.number().required().min(10),
                city: Joi.string().required(),
                uf: Joi.string().length(2)
            })
        })
    },

    

    
}