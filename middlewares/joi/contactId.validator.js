const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const { WrongParametersError } = require("../../helpers/errors");

const schema = Joi.object({
  contactId: Joi.string().regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i),
});

const contactIdValidator = (req, res, next) => {
  try {
    const { error } = schema.validate(req.params);

    const response = (errorName) => {
      throw new WrongParametersError(
        `Must be a valid value ${errorName}`,
        "Bad request"
      );
    };

    if (error) {
      return res.json(response(error.details[0].context.key));
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = contactIdValidator;
