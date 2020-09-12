const posts = require('./src/posts');
const user = require('./src/user');
const auth = require('./src/auth');

module.exports = app => {
  app.get('/', (req, res) => {res.send('Olá pessoa!')});
  
  posts.rotas(app);
  user.routes(app);
  auth.routes(app);
};