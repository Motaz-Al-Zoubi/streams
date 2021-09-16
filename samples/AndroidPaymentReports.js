const _ = require('lodash');
const request = require('request-promise');
const dailyUrl = `https://api.harmonica-staging.app/stream-daily-report`;
const monthlyUrl = `https://api.harmonica-staging.app/stream-monthly-report`;
const urls = [dailyUrl, monthlyUrl];

const options = {
    method: 'GET',
    qs: {
      month: "202001",
      isOldApp: true,
	  marker: "yes"
    },
    json: true // Automatically stringifies the body to JSON
};

const getTowDigitFormat = (month) => {
	return month < 10 ? `0${month}`: `${month}`;
};


(async () => {
  const promises = [];
  ["2021", "2020"].forEach(year => {
	urls.forEach(url => {
		const option = _.cloneDeep(options);
		for (let index = 1; index <= 12; index++) {
			option.qs.month = `${year}${getTowDigitFormat(index)}`;
			option.uri = url;
			promises.push(request(option));
		}
	});
  });
  const result = await Promise.all(promises);
  console.log("result", JSON.stringify(result, null, 4));
})();
