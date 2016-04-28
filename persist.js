import superagent from 'superagent';
import _ from 'lodash';

export default function (personId, pluginId, events) {
  return new Promise((resolve, reject) => {
    const processedEvents = _.map(events, event => (_.assign(event, {
        personId,
        pluginId,
      })));
    

    superagent
      .post(`${process.env.NEMO_URI}/events`)
      .send(processedEvents)
      .end((err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
  });
}