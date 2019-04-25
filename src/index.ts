import express from 'express';
import { soap } from 'soap-decorators';
import { PlaneController } from './controllers/PlaneController';
import { createConnection } from 'typeorm';
import { FlightController } from './controllers/FlightController';

const app = express();

createConnection();

app.use('/plane', soap(new PlaneController()));
app.use('/flight', soap(new FlightController()));

app.listen(8080, () => {
  console.log('Chyba działa');
});
