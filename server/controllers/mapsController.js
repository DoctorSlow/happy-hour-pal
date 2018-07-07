const axios = require('axios');

//move this into an .env file
const APIKEY = "AIzaSyD_2mmRZkUnIuOqeIxJRjKZjDadVGB1i0E";

//In mapResults you can see the onClick event that triggers this API call both the search query as well as lat + lng 
//should be part of the request giving us a custom search to google places with their input and current coordinates
module.exports = {

	queryMap: function (req, res) {
		// console.log(req);
		axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=" + req.params.query + "&location=" + req.params.lat + "," + req.params.lng + "&radius=15000&key=" + APIKEY)

			.then((data) => {
				res.json(data.data);
			})
	},
	autoQuery: function (req, res) {
		axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + req.params.lat + "," + req.params.lng + "&radius=3200&type=bar&key=" + APIKEY)

			.then((data) => {
				// console.log(data.data);
				res.json(data.data);
			})
	}

}