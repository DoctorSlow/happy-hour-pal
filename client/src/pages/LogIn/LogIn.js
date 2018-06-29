import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import "./LogIn.css";

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
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
		console.log('Log-in successful')
		this.props._login(this.state.username, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="form-signin">
					<h5 className="form-signin-heading">Welcome back</h5>
                    <Form>
                        <FormGroup>
                            <Label for="username" hidden>Username</Label>
                            <Input 
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
                                type="password"
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        {' '}
                        <Button className="login-btn btn-block" onClick={this.handleSubmit}>Log in</Button>
                    </Form>
                    <p>Don't have an account? <Link className="link" to="/signup">Sign up</Link></p>
				</div>
			)
		}
	}
}

export default LoginForm
