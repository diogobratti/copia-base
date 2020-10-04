const user = require('./src/user');
const auth = require('./src/auth');

module.exports = app => {
  app.get('/', (req, res) => {res.send('Olá pessoa!')});
  
  user.routes(app);
  auth.routes(app);
};