require('dotenv').config();
const app = require('./app');
require('./redis');


const port = (process.env.PORT ? process.env.PORT : 3333);

const routes = require('./routes');
routes(app);

app.listen(port, () => console.log(`App listening on port ${port}`));
