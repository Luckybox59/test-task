import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import debug from 'debug';
import session from 'express-session';
import _ from 'lodash';
import sendMail from './send-email';

const app = Express();
const log = debug('http');
log('booting %j', 'App');

const logger = morgan('dev');


app.use(logger);
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json());

//app.use(session());

//const allowCrossDomain = function(req, res, next) {
//  res.header('Access-Control-Allow-Origin', '*');
//  res.header('Access-Control-Allow-Methods', '*');
//  res.header('Access-Control-Allow-Headers', '*');
//  next();
//}

//app.use(allowCrossDomain)

app.post('/register', (req, res) => {
  console.log(req.body.title);
  const link = 'http://localhost:3000';
  //sendMail(req.body.email, link);
  res.status(200).end();
});

//app.use(router)
 
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port' ${port}`);
});
