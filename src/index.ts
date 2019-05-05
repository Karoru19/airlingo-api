import express from 'express';
import { soap } from 'soap-decorators';
import { createConnection } from 'typeorm';
import { PlaneController } from './controllers/PlaneController';
import { FlightController } from './controllers/FlightController';
import { UserController } from './controllers/UserController';
import { TicketController } from './controllers/TicketController';

const app = express();

createConnection();

app.use('/plane', soap(new PlaneController()));
app.use('/flight', soap(new FlightController()));
app.use('/user', soap(new UserController()));
app.use('/ticket', soap(new TicketController()));

app.listen(8080, () => {
  console.log("It's works.");
});
