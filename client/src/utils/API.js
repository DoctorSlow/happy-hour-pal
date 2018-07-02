import axios from "axios";

export default {
  // Place search API call
  getPlaces: function (query, loc) {
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