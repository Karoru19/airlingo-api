import express from 'express';
import { soap } from 'soap-decorators';
import { createConnection } from 'typeorm';
import { PlaneController } from './controllers/PlaneController';
import { FlightController } from './controllers/FlightController';
import { UserController } from './controllers/UserController';
import { TicketController } from './controllers/TicketController';
import https from 'https';
import fs from 'fs';

const app = express();

createConnection();

app.use('/plane', soap(new PlaneController()));
app.use('/flight', soap(new FlightController()));
app.use('/user', soap(new UserController()));
app.use('/ticket', soap(new TicketController()));

// app.listen(8080, () => {
//   console.log("It's works.");
// });
https
  .createServer(
    {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem'),
      passphrase: 'asdasd'
    },
    app
  )
  .listen(8080);
