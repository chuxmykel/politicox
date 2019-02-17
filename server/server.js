import express from 'express';
import bodyParser from 'body-parser';
import router from './app/routes/routes';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

module.exports = app.listen(port);
