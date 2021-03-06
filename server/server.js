import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './app/routes/routes';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(router);

app.listen(port);

export default app;
