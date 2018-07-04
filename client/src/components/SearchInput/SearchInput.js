import React, { Component } from 'react';

// SearchBar for AddBusiness page
const SearchInput = props => (
    <div>
        <form className="form-inline my-2 my-lg-0">
            <input name="search" onChange={props.onChange} className="form-control mr-sm-2" type="search" placeholder="Business name or type" aria-label="Search" />
            <button onClick={props.onClick} className="btn my-2 my-sm-0 orange-btn" type="submit">Find</button>
        </form>
    </div>
);

export default SearchInput;