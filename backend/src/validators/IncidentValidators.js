const { Segments, celebrate, Joi } = require('celebrate')

module.exports = {
    // queryValidator() {
    //     // validate request query params
    //     return celebrate({
    //         [Segments.QUERY]: Joi.object().keys({
    //             page: Joi.string().num
    //         })
    //     })
    // },

    routeParamsValidator() {
        // validate request route params
        return celebrate({
            [Segments.PARAMS]: Joi.object().keys({
                id: Joi.number().required()
            })
        })
    },
    
    dataValidator() {
        // validate request data
        return celebrate({
            [Segments.BODY]: Joi.object().keys({
                title: Joi.string().required(),
                description: Joi.string().required(),
                value: Joi.number().required(),
            })
        })
    }
}