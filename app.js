const geocode = require('./utils/geocode');
const forecast= require('./utils/forecast');

geocode("Boston", (err, data)=>{
	if(err)  console.log("Err: ", err);
	if(data){
		forecast(data, (err, data)=>{
			if(err)  console.log(err);
			if(data) console.log(data);
		});
	}
});

geocode("Sioux Falls", (err, data)=>{
	if(err)  console.log("Err: ", err);
	if(data){
		forecast(data, (err, data)=>{
			if(err)  console.log(err);
			if(data) console.log(data);
		});
	}
});

