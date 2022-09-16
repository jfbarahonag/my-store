const express = require('express');
const router_api = require('./routes')
const app = express();
const port = 3000;
const host = 'localhost'

//middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hi from Express');
});

router_api(app)

app.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
