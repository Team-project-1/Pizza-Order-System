const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');

const api = require('./routes/userapi');
const pizza = require('./routes/pizzaapi');
const order = require('./routes/orderapi');
const topping = require('./routes/toppingapi');
const port = 3000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json());

app.use('/api', api, pizza, order, topping);

app.listen(port, function() {
    console.log("Server running on localhost:" + port);
});