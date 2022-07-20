const express = require('express');
require('dotenv').config();
const rotas = require('./rotas');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotas);

app.listen(PORT);