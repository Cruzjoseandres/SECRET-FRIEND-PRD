const Joi = require('joi');
const usuarioSchema = Joi.object({
    nombre: Joi.string().min(1).max(100).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required()
});

module.exports = {
    usuarioSchema
};
