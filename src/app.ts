import express from 'express';
import Themes from './Theme/routes';
import Movies from './Movie/routes';

const app = express();

app.use(express.json());

app.use('/themes', Themes);
app.use('/movies', Movies);


export { app } ;
