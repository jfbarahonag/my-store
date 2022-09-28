const { config } = require('./config/config')
const express = require('express');
const cors = require('cors')
const router_api = require('./routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')
const app = express();
const port = config.port;

//middleware
app.use(express.json())

//CORS middleware
const whitelist = ['http://localhost:8080','https://my-front.com', 'https://my-second-front.net']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Access denied'))
    }
  }
}
app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Hi from Express. My name is jfbarahonag and this is my testing API. Enjoy it');
});

router_api(app)

//midlewares must be used after routing (ALWAYS!!!)
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);
