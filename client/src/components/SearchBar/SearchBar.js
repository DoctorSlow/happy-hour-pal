import React, { Component } from 'react';
import { Col, Row, Button, Input } from 'reactstrap';
import "./SearchBar.css";
import API from "../../utils/API";


// SearchBar for Results pages
const SearchBar = props => (
    <nav className="navbar navbar-expand-lg navbar-light navStyle white-navbar">
        <div>
            <Row>
                <Col>
                <form className="form-inline my-2 my-lg-0">
                    <Input name="search" onChange={props.onChange} className="form-control mr-sm-2" type="search" placeholder="Current Location" aria-label="Search" />
                    <Button color="#2296a2ff" className="left-btn" onClick={props.onClick} className="btn search-btn my-2 my-sm-0" type="submit">Manual Search</Button>
                    <Button color="#2296a2ff" onClick={props.autoClick} className="btn search-btn my-2 my-sm-0" type="submit">Search Nearby</Button>
                </form>
                </Col>
            </Row>
        </div>

        {/* Add Search options here */}

        {/* Add button to access Map/List option here */}

    </nav>
);

export default SearchBar;