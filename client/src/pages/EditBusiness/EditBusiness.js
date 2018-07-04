import React, { Component } from "react";
import { Col, Row } from 'reactstrap';
// import deals from "../../deals.json";
import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";

import API from "../../utils/API";
import "./EditBusiness.css";

class EditBusiness extends Component {
    state = {
        businesses: [],
        day: "",
        beginTime: "",
        endTime: "",
        info: "",
        visibility: "visible",
        name: "Ermanos",
        address: "http://www.ermanosbrew.com/",
        stars: "****"
    };

    handleClickEvent = () => {
        this.props.history.push("/submitedit");
        // if (this.props.loggedIn) {
        //     this.props.history.push("/submitedit");
        // } else {
        //     this.props.history.push("/login");
        // }
    }

    componentDidMount() {
        this.loadBusinesses();
    }

    loadBusinesses = () => {
        API.getBusinesses()
            .then(res =>
                this.setState({
                    businesses: res.data,
                    day: "",
                    beginTime: "",
                    endTime: "",
                    info: ""
                })
            )
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Row>
                    <Col sm="4">

                        {/* <BackBtn /> */}

                        <BusinessCard>

                            <BusinessNameCard
                                name={this.state.name}
                                address={this.state.address}
                                stars={this.state.stars}
                            />

                            {this.state.businesses.map(business => (
                                <DealCard
                                    // onClick={() => this.handleClickEvent(pic.id)}
                                    id={business._id}
                                    key={business._id}
                                    day={business.day}
                                    beginTime={business.beginTime}
                                    endTime={business.endTime}
                                    info={business.info}
                                    // canEdit={this.state.canEdit}
                                    // visibility={this.state.visibility}
                                    showButton={true}
                                    handleClickEvent={this.handleClickEvent}
                                />
                            ))}

                        </BusinessCard>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default EditBusiness;
