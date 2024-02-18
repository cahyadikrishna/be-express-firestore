const express = require('express');
const cors = require('cors');

const config = require('./config.js');
const route = require('./routes/index.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(route);

app.listen(config.port, () => {
  console.log(`Server running at ${config.hostUrl}`);
});
