const request = require('request');
const geocast = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1Ijoicm9oYW53YWdoIiwiYSI6ImNrcjBiN2F0MTBvbXUydW1uNnZ1NzFuNW4ifQ.llC5SLCGSVhiTZC9vdM8sw';
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('unable to connect to weather service', undefined);
		} else if (body.features.length === 0) {
			callback('unable to find location', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};
module.exports = geocast;
