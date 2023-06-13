const Joi = require('joi');

const schema = Joi.object(
    {   
        'name' : Joi.string().required(),
        'examples' : Joi.array().required()
    }
);

module.exports = schema;