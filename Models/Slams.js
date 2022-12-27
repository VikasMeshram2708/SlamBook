const Joi = require("joi");

const SlamSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().trim().min(2).max(250).required(),
  tag: Joi.string().trim().min(1).max(100).required(),
});

module.exports = SlamSchema;
