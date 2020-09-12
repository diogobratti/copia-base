const db = require('../../database');
const { InternalServerError } = require('../error/error');
const i18n = require('../i18n/texts');

module.exports = {
  add: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          INSERT INTO users (
            name,
            email,
            passwordHash
          ) VALUES (?, ?, ?)
        `,
        [user.name, user.email, user.passwordHash],
        error => {
          if (error) {
            reject(new InternalServerError(i18n.ADD_USER_ERROR));
          }

          return resolve();
        }
      );
    });
  },

  findById: id => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE id = ?
        `,
        [id],
        (error, user) => {
          if (error) {
            return reject(i18n.USER_NOT_FOUND);
          }

          return resolve(user);
        }
      );
    });
  },

  findByEmail: email => {
    return new Promise((resolve, reject) => {
      db.get(
        `
          SELECT *
          FROM users
          WHERE email = ?
        `,
        [email],
        (error, user) => {
          if (error) {
            return reject(i18n.USER_NOT_FOUND);
          }

          return resolve(user);
        }
      );
    });
  },

  list: () => {
    return new Promise((resolve, reject) => {
      db.all(
        `
          SELECT * FROM users
        `,
        (error, users) => {
          if (error) {
            return reject(i18n.USER_LIST_ERROR);
          }
          return resolve(users);
        }
      );
    });
  },

  delete: user => {
    return new Promise((resolve, reject) => {
      db.run(
        `
          DELETE FROM users
          WHERE id = ?
        `,
        [user.id],
        error => {
          if (error) {
            return reject(i18n.USER_DELETE_ERROR);
          }
          return resolve();
        }
      );
    });
  }
};
