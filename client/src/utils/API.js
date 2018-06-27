import axios from "axios";

const USERSEARCH = "bar";
const LATLONG = "@47.6918452,-122.2226413";
const APIKEY = "AIzaSyD_2mmRZkUnIuOqeIxJRjKZjDadVGB1i0E";

export default {
  // Place search API call
  getPlaces: function (query) {
    alert("Hey you! You've succesfully queried the google api. Good on ya.");
    return axios.get("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + query + "&inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000" + LATLONG + "&key=" + APIKEY);
    return axios.get('/api/maps/' + query);
  },
  // Gets all businesses
  getBusinesses: function () {
    return axios.get("/api/businesses");
  },
  // Gets the business with the given id
  getBusiness: function (id) {
    return axios.get("/api/businesses/" + id);
  },
  // Deletes the business with the given id
  deleteBusiness: function (id) {
    return axios.delete("/api/businesses/" + id);
  },
  // Saves a business to the database
  saveBusiness: function (businessData) {
    return axios.post("/api/businesses", businessData);
  }
};