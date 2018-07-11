import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ListResults from "../ListResults/ListResults";
// import MapResults from "../MapResults/MapResults";
import NestedModal from "../../components/NestedModal/NestedModal";
import API from "../../utils/API";
import SearchBar from "../../components/SearchBar";
import MyMapComponent from "../../components/Maps";
import "./Tabs.css"
// import "../MapResults/MapResults.css";

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.dbCompare = this.dbCompare.bind(this);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            results: [],
            search: "",
            center: null,
            autores: [],
            dbBusinesses: [],
            matched: []
        };
    }
    //      state = {
    //     results: [],
    //     search: "",
    //     center: null,
    //     autores: [],
    //     dbBusinesses: [],
    //     matched: []
    //   };

    //automatically grab current location 
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        }, () => {
            this.setState({
                center: {
                    lat: 32.2322432,
                    lng: -110.95162880000001
                }
            })
        },
            {
                timeout: 2000,
                enableHighAccuracy: true
            })
        setTimeout(() => {
            this.autoSearch(this.state.center.lat, this.state.center.lng);
        }, 2000);
    };

    //allows state changes(right now just the search parameter) to be updated live
    //this isnt necessary
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //on sumbit take search and geo states to be entered in places search
    handleSearchSubmit = event => {
        event.preventDefault();
        this.searchGoogle(this.state.search, this.state.center.lat, this.state.center.lng);
    };

    autoSearchSumbit = event => {
        event.preventDefault();
        this.autoSearch(this.state.center.lat, this.state.center.lng);
    }

    //queries the places api and loads results into this components result state MANUAL SEARCH
    searchGoogle(query, lat, lng) {

        API.getPlaces(query, lat, lng)
            .then(res =>
                this.setState({ results: res.data.results })
            )
            .catch(err => console.log(err));
    };

    //new google api query that runs without user input
    autoSearch(lat, lng) {

        API.autoPlaces(lat, lng)
            .then(res =>
                this.setState({ autores: res.data.results }, this.getDbBusiness)
            )
            .catch(err => console.log(err));
    };

    getDbBusiness = () => {
        //straightforward api call to grab all our stored business data
        API.getBusinesses()
            .then(res =>
                this.setState({ dbBusinesses: res.data }, () => {
                    //dbCompare is used as a CB to avoid async setState issues
                    this.dbCompare(this.state.dbBusinesses, this.state.autores)
                })
            )
            .catch(err => console.log(err));
    }

    dbCompare(dbBiz, googleBiz) {
        //db objects will now be in an array with corresponding id as a KEY and business object as VALUE
        let knownPlaces = dbBiz.reduce((translated, kPlace) => {
            translated[kPlace.googleID] = kPlace;
            return translated;
        }, {});
        //finds the chosen ones, where our ids between db and google api match
        let matchedPlaces = googleBiz.reduce((matched, currentPlace) => {
            if (knownPlaces.hasOwnProperty(currentPlace.id)) {
                matched.push({ ...currentPlace, ...knownPlaces[currentPlace.id] });
            }
            return matched;
        }, []);

        console.log(matchedPlaces);
        //results is the state that markers are generated from
        this.setState({ results: matchedPlaces })
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {

        console.log(this.state.results);
        return (
            <div className="mapHeight background">

                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            List View
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                            Map View
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab} className="mapHeight background">
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <SearchBar onClick={this.handleSearchSubmit} autoClick={this.autoSearchSumbit} onChange={this.handleInputChange} />
                                <ListResults
                                    history={this.props.history}
                                    loggedIn={this.props.loggedIn}
                                    businesses={this.state.results}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2" className="mapHeight">
                        <Row className="mapHeight">
                            <Col sm="12" className="mapHeight">
                                <div className="mapHeight">
                                    <SearchBar onClick={this.handleSearchSubmit} autoClick={this.autoSearchSumbit} onChange={this.handleInputChange} />
                                    <MyMapComponent
                                        isMarkerShown
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD_2mmRZkUnIuOqeIxJRjKZjDadVGB1i0E"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `100%` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        center={this.state.center}
                                        results={this.state.results}
                                    />
                                </div>


                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                {/* <NestedModal buttonLabel="Click Me" /> */}
            </div>
        );
    }
}