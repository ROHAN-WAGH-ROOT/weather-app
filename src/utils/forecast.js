const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=d930546a9062a3123bf27c0dae2c44e8&query=' +
		latitude +
		',' +
		longitude +
		'';
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('unable to connect to weather service', undefined);
		} else if (body.error) {
			callback('unable to find location', undefined);
		} else {
			callback(
				undefined,
				' it is currently ' + body.current.temperature + ' but feels like ' + body.current.feelslike
			);
		}
	});
};
module.exports = forecast;
