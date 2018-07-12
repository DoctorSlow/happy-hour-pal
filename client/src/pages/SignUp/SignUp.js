import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios'
import "./SignUp.css";

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
        event.preventDefault()
        
        // Temp check
        // console.log('sign-up-form, username: ');
        // console.log(this.state.username);

        // TODO - validate!
        
        // Request to server
		axios
			.post('/auth/signup', {
				email: this.state.email,
				username: this.state.username,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('Sign-up successful')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('Sign-up error')
                }
            })
            .catch(error => {
                console.log('Sign-up server error: ')
                console.log(error)
			})
	}
	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div className="form-signup">
				<h5 className="form-signup-heading">Sign up and save</h5>
				<Form>
					<FormGroup>
						<Label for="email" hidden>Email</Label>
						<Input 
							className="email-input shadow-sm"
							type="text"
							name="email"
							placeholder="email"
							value={this.state.email}
							onChange={this.handleChange} 
						/>
					</FormGroup>
					{' '}
					<FormGroup>
						<Label for="username" hidden>Username</Label>
						<Input 
							className="user-input shadow-sm"
							type="text"
							name="username"
							placeholder="username"
							value={this.state.username}
							onChange={this.handleChange} 
						/>
					</FormGroup>
					{' '}
					<FormGroup>
						<Label for="password" hidden>Password</Label>
						<Input
							className="password-input shadow-sm"
							type="password"
							name="password"
							placeholder="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</FormGroup>
					{' '}
					<FormGroup>
						<Label for="confirmPassword" hidden>Password</Label>
						<Input
							className="password-input shadow-sm"
							type="password"
							name="confirmPassword"
							placeholder="password"
							value={this.state.confirmPassword}
							onChange={this.handleChange}
						/>
					</FormGroup>
					{' '}
					<Button color="#2296a2ff" className="signup-btn btn-block shadow" onClick={this.handleSubmit}>Sign up</Button>
				</Form>
				<p>Already have an account? <Link className="link" to="/login">Log in</Link></p>
			</div>
		)
	}
}

export default SignupForm
