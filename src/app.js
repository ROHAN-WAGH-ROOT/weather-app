const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocast');
const forecode = require('./utils/forecast');
// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../Templates/views');
const partialpath = path.join(__dirname, '../Templates/partial');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialpath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'rohan wagh'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'rohan wagh'
	});
});
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'help me',
		name: 'rohan wagh'
	});
});

app.get('', (req, res) => {
	res.send('<h1>hello express</h1>');
});
app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'must provide address !'
		});
	}

	geocode(req.query.address, (error, { latitude, longitude, location }) => {
		if (error) {
			return res.send({ error });
		}
		forecode(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({
				forecast: forecastData,
				location,
				address: req.query.address
			});
		});
	});
	// res.send({
	// 	forecast: 'It is rainy',
	// 	location: 'shirdi',
	// 	address: req.query.address
	// });
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'you must provide a search term'
		});
	}
	console.log(req.query.search);
	res.send({
		products: []
	});
});
app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		eof: 'error page not found'
	});
});
app.listen(port, () => {
	console.log('server is up on port' + port);
});

// app.get('/help', (req, res) => {
// 	res.send([
// 		{
// 			name: 'rohan',
// 			age: 21
// 		},
// 		{
// 			name: 'wagh'
// 		}
// 	]);
// });

// app.get('/about', (req, res) => {
// 	res.send('About');
// });
