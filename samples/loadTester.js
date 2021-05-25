const _ = require('lodash');
const request = require('request-promise');

const promises = [];
const count = 50;
const timeInSeconds=10;

const options = {
    method: 'GET',
    uri: 'https://motaz-dot-harmonica-staging.ew.r.appspot.com/dating/v1/users/countries?time=' + timeInSeconds,
    json: true // Automatically stringifies the body to JSON
};

for (let index = 0; index < count; index++) {
    const current = _.cloneDeep(options);
    promises.push(current);
}

Promise.all(promises.map(item => request(item))).then(results => {
    console.log('results', JSON.stringify(results, null, 4));
})
.catch(e => {
    console.log('e', JSON.stringify(e, null, 4));
});
