const _ = require('lodash');
const request = require('request-promise');

const options = {
    method: 'GET',
    uri: 'https://places-proxy-service-dot-harmonica-dev.nw.r.appspot.com/cities',
    qs: {
        term: 'payload'
    },
    json: true // Automatically stringifies the body to JSON
};

const promises = [];
const count = 200;
const term = "j";

for (let index = 0; index < count; index++) {
    const current = _.cloneDeep(options);
    current.qs.term = term;
    promises.push(current);
}

Promise.all(promises.map(item => request(item))).then(results => {
    console.log('results', JSON.stringify(results, null, 4));
})
.catch(e => {
    console.log('e', JSON.stringify(e, null, 4));
});
