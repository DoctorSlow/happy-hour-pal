const axios = require('axios');

const LATLONG = "47.6918452,-122.2226413";
const APIKEY = "AIzaSyD_2mmRZkUnIuOqeIxJRjKZjDadVGB1i0E";

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=beer&location=-33.8670522,151.1957362&radius=15000&type=restaurant&keyword=cruise&key=AIzaSyD_2mmRZkUnIuOqeIxJRjKZjDadVGB1i0E

module.exports = {
	// (trying to set the LATLONG const. to the the User location via geolocation)
	// getLocation: function (req, res) {
	// 	axios.post("https://maps.googleapis.com/maps/api/js?key=" + APIKEY + "&callback=initMap")
	// 		.then((data) => {
	// 			console.log(data.data);
	// 			res.json(data.data)
	// 		})
	// },
	queryMap: function (req, res) {
		axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=" + req.params.query + "&location=" + LATLONG + "&radius=1500&key=" + APIKEY)
			.then((data) => {
				console.log(data.data);
				res.json(data.data)
			})
	}
}