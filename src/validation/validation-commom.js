const i18n = require('../i18n/texts');
const { InvalidArgumentError } = require('../error/error');

module.exports = {
  notNullStringField: (value, name) => {
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(i18n.FIELD_REQUIRED_ERRO(name));
  },

  minimumSizeField: (value, name, minimum) => {
    if (value.length < minimum)
      throw new InvalidArgumentError(
        i18n.MINIMUM_SIZE_FIELD_ERROR(name,minimum)
      );
  },

  maximumSizeField: (value, name, maximum) => {
    if (value.length > maximum)
      throw new InvalidArgumentError(
        i18n.MAXIMUM_SIZE_FIELD_ERROR(name,maximum)
      );
  }
};
