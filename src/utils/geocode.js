request = require('request');

function geocode(place, callback){
	const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place +'.json?access_token=pk.eyJ1IjoiZW5ncDg2OTEiLCJhIjoiY2p1dzI3Z3lnMDd5ZzRkcXRrZml4c2U2dSJ9.t5j-MR0cQWtXLl1tTMlsLg';

	request({url: geourl, json: true}, (err, response)=>{
		if(err){
			callback({err: "Error happened, it could not connect to the server."}, undefined);
		}else if(response.message === "Not Found"){
			callback({err: "Place is not found"}, undefined);
		}else if(response.body.features.length==0){
			callback({err: "Place is not found"}, undefined);
		}else{
			const longitude = response.body.features[0].center[0];
			const latitude  = response.body.features[0].center[1];
			const location  = response.body.features[0].place_name;
			callback(undefined, {location, latitude, longitude});
		}
	});
}

module.exports = geocode;

