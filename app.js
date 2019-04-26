const geocode = require('./utils/geocode');
const forecast= require('./utils/forecast');

let place = 'Boston';

if (process.argv.length === 3){
	place = process.argv[2];
}else{
	console.log('Usage: node app.js "place name"');
	console.log('It uses default place of Boston');
}

geocode(place, (err, data)=>{
	if(err)  console.log('Err: ', err);
	if(data){
		forecast(data, (err, data)=>{
			if(err)  console.log(err);
			if(data) console.log(data);
		});
	}
});

