request = require('request');

function forecast(data, callback){
	let url = 'https://api.darksky.net/forecast/51bd7031b48805f3bc2d6c7364ef57d6/' + data.latitude + ',' + data.longitude;

	request({url: url, json: true}, (err, response)=>{
		if(response.body.length<100){
			response.body = String(response.body).trim();
		}

		if(err){
			callback(err, {data});
		}else if(response.body === "Forbidden"){
			callback("It is forbidden, please check your token.", {data});
		}else if(response.body.currently === undefined){
			callback("It is not found.", {data});
		}else{
			callback(undefined, {temperature: response.body.currently.temperature, precipProbability: response.body.currently.precipProbability, data});
		}
	});
}

module.exports = forecast;

