const axios = require('axios');

const LATLONG = "@47.6918452,-122.2226413";
const APIKEY = "AIzaSyD_2mmRZkUnIuOqeIxJRjKZjDadVGB1i0E";


module.exports = {
	queryMap: function (req, res) {
		axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + req.params.query + "&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000" + LATLONG + "&key=" + APIKEY)
			.then((data) => {
				console.log(data.data);
				res.json(data.data)
			})
	}
}