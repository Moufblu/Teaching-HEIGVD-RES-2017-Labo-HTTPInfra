var Chance = require('chance');
var chance = new Chance();
var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send(generateProfile());
});

app.get('/test', function(req, res) {
	res.send("Hello RES - some test ");
});

app.listen(3000, function() {
	console.log('Accepting HTTP requests on port 3000 !');
});

function generateProfile() 
{
	var numberOfProfiles = chance.integer({
		min: 0,
		max: 10
	});
	console.log(numberOfProfiles);
	var profiles = [];
	for (var i = 0; i < numberOfProfiles; i++)
	{
		var avatar = chance.avatar({fileExtension: 'jpg'});
		var email = chance.email({domain: "res.com"});
		var year = chance.integer({
			min: 2000,
			max: 2017
		})
		var lastConnection = chance.date({string: true, year: year});
		profiles.push({
			avatar: avatar,
			email: email,
			lastConnection: lastConnection
		});
	};
	console.log(profiles);
	return profiles;
}