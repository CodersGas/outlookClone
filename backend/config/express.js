import { createRequire } from 'module';
import express from 'express';
import routes from '../routes/index.js';
import cors from 'cors';

const require = createRequire(import.meta.url);
var bodyParser = require('body-parser');

const app = express();

//use bodyParser() to let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/', routes);

export default app;