import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./SearchBar.css";
import API from "../../utils/API";


// SearchBar for Results pages
// const SearchBar = props => (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light navStyle">
//         <Link className="navbar-brand" to="/">
//             Happy Hour Pal
//         </Link>
//         <div>
//             <form className="form-inline my-2 my-lg-0">
//                 <input className="form-control mr-sm-2" type="search" placeholder="Current Location" aria-label="Search" />
//                 <button className="btn btn-dark my-2 my-sm-0" type="submit">Go</button>
//             </form>
//         </div>

//         {/* Add Search options here */}

//         {/* Add button to access Map/List option here */}

//     </nav>
// );

class SearchBar extends Component {
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
        API.getPlaces(query)
            .then(res =>
                this.setState({ results: res.data }))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light navStyle">
                <Link className="navbar-brand" to="/">
                    Happy Hour Pal
                </Link>
                <div>
                    <form className="form-inline my-2 my-lg-0">
                        <input onChange={this.handleInputChange} className="form-control mr-sm-2" name="search" type="search" placeholder="Current Location" aria-label="Search" />
                        <button onClick={this.handleInputSubmit} className="btn btn-dark my-2 my-sm-0" type="submit">Go</button>
                    </form>
                </div>

                {/* Add Search options here */}

                {/* Add button to access Map/List option here */}

            </nav>
        )
    }
}

export default SearchBar;