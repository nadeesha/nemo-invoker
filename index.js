import express from 'express';
import bodyParser from 'body-parser';
import invoke from './invoke.js';
import persist from './persist.js';

var app = express();
app.use(bodyParser.json());

app.post('/invoke', (req, res, next) => {
  const invokeOptions = {
    pluginName: req.body.pluginName,
    payload: req.body.payload,
  };

  invoke(invokeOptions)
    .then(result => JSON.parse(result.Payload))
    .then(payload => {
      return persist(req.body.personId, req.body.pluginId, payload);
    })
    .then(() => res.status(204).end())
    .catch(err => res.status(500).send(err));
});

app.listen(process.env.PORT || 3001);

console.log('Running invoker...');
