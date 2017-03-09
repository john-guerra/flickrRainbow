// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flickr = require("flickrapi");
const fs = require("fs");

const app = express();

function getApiKeys(callback, errorcallback) {
	fs.readFile(path.resolve(__dirname,"./api_key.txt"), "utf-8", (err, api_key) => {
		if (err) {
			errorcallback(err);
			return;
		}
		fs.readFile(path.resolve(__dirname,"./api_secret.txt"), "utf-8",(err, api_secret) => {
			if (err) {
				errorcallback(err);
				return;
			}
			callback(api_key, api_secret);
		});
	});
}


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/flickr/:query', function (req, res) {
	console.log("Flickr!");
	console.log(req.params["query"].split("~"));
	getApiKeys((api_key, api_secret) => {
		const Flickr = require("flickrapi"),
	    flickrOptions = {
	      api_key: api_key,
	      secret: api_secret
	    };
		console.log("REQUIRED");
		Flickr.tokenOnly(flickrOptions, function(error, flickr) {
			console.log("tokenOnly");
			if (error) {
				res.send(error);
				return;
			}
		  // we can now use "flickr" as our API object,
		  // but we can only call public methods and access public data
		  flickr.photos.search({
		  	safe:1,
		  	sort:"relevance",
		  	// tags:req.params["query"].split(",")[0],
		  	text:req.params["query"].replace(",", " ")
		  }, (err, data) => {
		  	if (err) res.send(err);
		  	res.send(data);
		  });
		});

	}, (err) => {
		console.log(err);
		res.send("Error!");
	})
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


module.exports = app;