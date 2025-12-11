const Joi = require('joi');
const sorteoSchema = Joi.object({
    nombre: Joi.string().min(1).max(100).required(),
    fecha: Joi.date().required(),
});

module.exports = {
    sorteoSchema,
};
