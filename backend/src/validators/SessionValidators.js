const { Joi, celebrate, Segments } = require('celebrate');

module.exports = {
    dataValidator() {
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                id: Joi.string().length(8)
            })
        })
    }
}