const i18n = require('../i18n/texts');
const { InvalidArgumentError } = require('../error/error');

module.exports = {
  notNullStringField: (value, name) => {
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${name}!`);
  },

  minimumSizeField: (value, name, minimum) => {
    if (value.length < minimum)
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser maior que ${minimum} caracteres!`
      );
  },

  maximumSizeField: (value, name, maximum) => {
    if (value.length > maximum)
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser menor que ${maximum} caracteres!`
      );
  }
};
