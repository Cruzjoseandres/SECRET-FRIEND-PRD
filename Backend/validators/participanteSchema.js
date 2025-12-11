const Joi = require('joi');
const participanteSchema = Joi.object({
    nombre: Joi.string().min(1).max(100).required(),
});


module.exports = {
    participanteSchema,
};
