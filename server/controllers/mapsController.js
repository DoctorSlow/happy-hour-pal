const axios = require('axios');

//move this into an .env file
const APIKEY = "AIzaSyD_2mmRZkUnIuOqeIxJRjKZjDadVGB1i0E";

//In mapResults you can see the onClick event that triggers this API call both the search query as well as lat + lng 
//should be part of the request giving us a custom search to google places with their input and current coordinates
module.exports = {

	queryMap: function (req, res) {

		axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=" + req.params.query + "&location=" + req.params.lat + "," + req.params.lng + "&radius=7500&key=" + APIKEY)

			.then((data) => {
				res.json(data.data);
			})
	},
	//&pagetoken=next_page_token
	autoQuery: function (req, res) {
		axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req.params.lat + "," + req.params.lng + "&radius=7500&type=bar&key=" + APIKEY)

			.then((data) => {
				let firstQuery = data.data;

				let pageToken = data.data.next_page_token;
				console.log(pageToken);
				//this request needs time before the page token is validated 
				setTimeout(function () {
					axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" + pageToken + "&key=" + APIKEY)

						.then((results) => {
							let secondQuery = results.data;
							// var compiled = extend(firstQuery, secondQuery);
							// console.log(secondQuery);
							var compiled = {
								status: "OK",
								results: [...firstQuery.results, ...secondQuery.results]
							};
							res.json(compiled);
						})
				}, 2000);
			})
	}

}