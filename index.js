const express = require('express');
const app = express();
const port = 3000;
const host = 'localhost'

app.get('/', (req, res) => {
  res.send('Hi from Express');
});

app.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
