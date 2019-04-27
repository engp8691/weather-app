const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast= require('./utils/forecast');

const app = express();
// Heroku will use this to start the app
const port = process.env.PORT || 3000;

const viewsFolderPath = path.join(__dirname, '../templates/views');
const publicFolderPath = path.join(__dirname, '../public');
const partialsFolderPath = path.join(__dirname, '../templates/partials');

// Set handlerbar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsFolderPath);
hbs.registerPartials(partialsFolderPath);

app.use(express.static(publicFolderPath));

app.get('', (req, res)=>{
	// send('Hello express!');
	res.render('index', {
		title: 'Weather Application',
		name: 'Yonglin'
	});
});

app.get('/help', (req, res)=>{
	res.render('help', {
		title: 'Help pages',
		name: 'Yonglin'
	});
});

app.get('/help/*', (req, res)=>{
	res.render('404', {
		title: 'Cannot find further help',
		name: 'Yonglin'
	});
});

app.get('/about', (req, res)=>{
	// res.send('I am express server!');
	res.render('about', {
		title: 'About weather application',
		name: 'Yonglin'
	});
});

app.get('/weather', (req, res)=>{
	if(!req.query.address){
		return res.send({err: 'Please provide the address'});
	}

	geocode(req.query.address, (err, data)=>{
		if(err){
			return res.send(err);
		}

		if(data){
			forecast(data, (err, data2)=>{
				if(err){
					return res.send(err);
				}

				if(data2){
					res.send(data2);
				}
			});
		}else{
			return res.send({err: 'Cannot query data'});
		}
	});
});

app.get('*', (req, res)=>{
	res.render('404', {title: 'Page is not found!'});
});

app.listen(port, ()=>{
	console.log(`Server is up on port ${port}`);
});

