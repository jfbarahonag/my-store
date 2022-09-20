const express = require('express');
const router_api = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const app = express();
const port = 3000;
const host = 'localhost'

//middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hi from Express');
});

router_api(app)

//midlewares must be used after routing (ALWAYS!!!)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
