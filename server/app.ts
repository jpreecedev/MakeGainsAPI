import * as express from 'express';
import { json, urlencoded } from 'body-parser';
import * as path from 'path';
import * as compression from 'compression';

import { loginRouter } from './routes/login';
import { protectedRouter } from './routes/protected';
import { fitbitRouter } from './routes/fitbit';
import mongoose = require('mongoose');

import * as config from './config';

const app: express.Application = express();

let mongodbUrl = 'mongodb://' + config.DB_HOST + ':' + config.DB_PORT + '/' + config.DB_NAME;

let dbOptions = {
  server: {
    reconnectTries: -1,
    socketOptions: {
      keepAlive: 120
    }
  }
};

let connectWithRetry = () => {
  return mongoose.connect(mongodbUrl, dbOptions, (err) => {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec. -> ' + err);
      setTimeout(connectWithRetry, 5000);
    }
  });
};

connectWithRetry();

mongoose.connection.once('open', () => {
  console.log('Connection with database succeeded.');
});

app.disable('x-powered-by');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

app.use('/api/secure', protectedRouter);
app.use('/api/login', loginRouter);
app.use('/api/fitbit', fitbitRouter);

if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/../client')));
}

app.use((req: express.Request, res: express.Response, next) => {
  let err = new Error('Not Found');
  next(err);
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message
  });
});

export { app }
