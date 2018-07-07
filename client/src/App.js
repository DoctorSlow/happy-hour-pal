import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./pages/Loading/Loading";
import Access from "./pages/Access/Access";
import BusinessListings from "./pages/BusinessListings/BusinessListings";
import ListResults from "./pages/ListResults/ListResults";
import MapResults from "./pages/MapResults/MapResults";
import Wrapper from "./components/Wrapper";
import BusinessDetails from "./pages/BusinessDetails/BusinessDetails";
import BizDetails from "./pages/BusinessDetails/BizDetails";
import LoginForm from "./pages/LogIn/LogIn";
import SignupForm from "./pages/SignUp/SignUp";
import AddBusiness from "./pages/AddBusiness/AddBusiness";
import EditBusiness from "./pages/EditBusiness/EditBusiness";
import EditBiz from "./pages/EditBusiness/EditBiz";
import SubmitEdit from "./pages/SubmitEdit/SubmitEdit";

import AddDeal from "./pages/SubmitEdit/AddDeal";
import EditDeal from "./pages/SubmitEdit/EditDeal";
import Tabs from "./pages/Tabs/Tabs";
import "./App.css";

// Function for which links to display if signed in
const DisplayLinks = props => {

	// Hides navbar on homepage
	if (window.location.pathname === "/") {
		return (<div></div>)
	}

	// Navbar links display
	if (props.loggedIn) {
		return (
			<nav className="navbar blue-navbar">
				<ul className="nav">
					<li>
						<Link to="#" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar blue-navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							Log in
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							Sign up
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

class App extends Component {

	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// Update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				<Router className="mapHeight">
					<div className="mapHeight">
						<Navbar />
						<Wrapper className="mapHeight">
							<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
							<Route exact path="/" component={Loading} />
							<Route exact path="/loading" component={Loading} />
							<Route exact path="/access" component={Access} />
							<Route exact path="/businessListings" component={BusinessListings} />
							{/* <Route exact path="/tabs" component={Tabs} /> */}
							<Route exact path="/tabs" render={
								(props) => {
									return (<Tabs {...props} loggedIn={this.state.loggedIn} />)
								}
							} />

							{/* <Route exact path="/listresults" component={ListResults} /> */}
							<Route exact path="/listresults" render={
								(props) => {
									return (<ListResults {...props} loggedIn={this.state.loggedIn} />)
								}
							} />
							<Route exact path="/mapresults" component={MapResults} />
							<Route exact path="/businessdetails" render={
								(props) => {
									return (<BusinessDetails {...props} loggedIn={this.state.loggedIn} />)
								}
							} />
							<Route exact path="/businessdetails/:id" render={
								(props) => {
									return (<BizDetails {...props} loggedIn={this.state.loggedIn} />)
								}
							} />
							<Route exact path="/login" render={() =>
								<LoginForm
									_login={this._login}
								/>
							} />
							<Route exact path="/signup" component={SignupForm} />
							<Route exact path="/addbusiness" component={AddBusiness} />
							{/* <Route exact path="/editbusiness" component={EditBusiness} /> */}
							<Route exact path="/editbusiness" render={
								(props) => {
									return (<EditBusiness {...props} loggedIn={this.state.loggedIn} />)
								}
							} />
							<Route exact path="/editbusiness/:id" render={
								(props) => {
									return (<EditBiz {...props} loggedIn={this.state.loggedIn} />)
								}
							} />
							<Route exact path="/submitedit" component={SubmitEdit} />
							<Route exact path="/adddeal/:id" component={AddDeal} />
							<Route exact path="/editdeal/:id" component={EditDeal} />
						</Wrapper>
					</div>
				</Router>
			</div>
		)
	}
}

export default App;
