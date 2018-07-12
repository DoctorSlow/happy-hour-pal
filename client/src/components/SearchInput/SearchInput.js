import React, { Component } from 'react';
import "./SearchInput.css";

// SearchBar for AddBusiness page
const SearchInput = props => (
    <div>
        <form className="form-inline my-2 my-lg-0">
            <input name="search" onChange={props.onChange} className="form-control mr-sm-2 shadow-sm" type="search" placeholder="Enter business name" aria-label="Search" />
            <button onClick={props.nameClick} className="btn my-2 my-sm-0 orange-btn keyword-search-btn add-biz-search-btn shadow" type="submit">Search By Name</button>
            <button onClick={props.autoClick} className="btn my-2 my-sm-0 orange-btn add-biz-search-btn shadow" type="submit">Search Nearby</button>
        </form>
    </div>
);

export default SearchInput;