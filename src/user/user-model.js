const userDao = require('./user-dao');
const { InvalidArgumentError } = require('../error/error');
const i18n = require('../i18n/texts');
const validation = require('../validation/validation-commom');
const bcrypt = require('bcrypt');

class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.passwordHash = user.passwordHash;

    this.valida();
  }

  async add() {
    if (await User.findByEmail(this.email)) {
      throw new InvalidArgumentError(i18n.USER_ALREADY_EXISTS_ERROR);
    }

    return userDao.add(this);
  }

  async addPassword(password) {
    validation.notNullStringField(password, 'password');
    validation.minimumSizeField(password, 'password', 8);
    validation.maximumSizeField(password, 'password', 64);

    this.passwordHash = await User.generatePasswordHash(password);
  }

  validate() {
    validation.notNullStringField(this.name, 'name');
    validation.notNullStringField(this.email, 'email');
  }

  async delete() {
    return userDao.delete(this);
  }

  static async findById(id) {
    const user = await userDao.findById(id);
    if (!user) {
      return null;
    }

    return new User(user);
  }

  static async findByEmail(email) {
    const user = await userDao.findByEmail(email);
    if (!user) {
      return null;
    }

    return new User(user);
  }

  static list() {
    return userDao.list();
  }

  static generatePasswordHash(password) {
    const rounds = 12;
    return bcrypt.hash(password, rounds);
  }
}

module.exports = User;
