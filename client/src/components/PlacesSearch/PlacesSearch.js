import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./SearchBar.css";
import API from "../../utils/API";

class PlacesSearch extends Component {

	state = {
		results: [],
		search: ""
	};

	//allows state changes(right now just the search parameter) to be updated live
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleInputSubmit = event => {
		event.preventDefault();
		this.searchGoogle(this.state.search);
	};

	searchGoogle(query) {
		console.log("google has been searched")
		API.getPlaces(query)
			.then(res =>
				this.setState({ results: res.data.results }))
			.catch(err => console.log(err));
	};

}

export default PlacesSearch;