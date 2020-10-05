require('dotenv').config();
const app = require('./app');
const db = require('./database');
require('./redis/blacklist')

const { sequelize }  = require('./config');

try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

const port = (process.env.PORT ? process.env.PORT : 3000);

const routes = require('./routes');
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
