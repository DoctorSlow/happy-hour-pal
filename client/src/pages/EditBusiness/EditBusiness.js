import React, { Component } from "react";
import Container from "../../components/Container";
import { Col, Row, Card, Button } from 'reactstrap';
import {BusinessCard, BusinessNameCard, DealCard} from "../../components/Business";
import deals from "../../deals.json";
// import API from "../../utils/API";
import "./EditBusiness.css";

// const styles = {
//     update: {
//       visibility: "visible"
//   }

class EditBusiness extends Component {
    state = {
    //   canEdit: true,
      visibility: "visible",
      deals,
      name: "Ermanos",
      address: "http://www.ermanosbrew.com/",
      stars: "****"
    }

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

                        {this.state.deals.map(deal => (   
                            <DealCard
                                // onClick={() => this.handleClickEvent(pic.id)}
                                id={deal.id}
                                key={deal.id}
                                day={deal.day}
                                beginTime={deal.beginTime}
                                endTime={deal.endTime}
                                info={deal.info}
                                // canEdit={this.state.canEdit}
                                // visibility={this.state.visible}
                                showButton={true}
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
