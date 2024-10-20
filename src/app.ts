import express from 'express';
import Themes from './Theme/routes';
import Movies from './Movie/routes';
import Users from './User/routes';
import Pack from './Pack/routes';
import Watched from './Watched/routes';

const app = express();

app.use(express.json());

app.use('/themes', Themes);
app.use('/movies', Movies);
app.use('/user', Users);
app.use('/pack', Pack);
app.use('/watched', Watched);


export { app } ;
