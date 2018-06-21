import React, { Component } from "react";
import { Card, Row, Col } from 'reactstrap';
// import API from "../utils/API";
import deals from "../../deals.json";
import reviews from "../../reviews.json";
// import { BusinessCard, BusinessNameCard, DealCard } from "../../components/Business";

import BusinessCard from "../../components/BusinessCard";
import  BusinessNameCard from "../../components/BusinessNameCard";
import DealCard from "../../components/DealCard";
import ReviewCard from "../../components/ReviewCard";
import ReviewsContainer from "../../components/ReviewsContainer";
// import { BackBtn, ReportDealBtn, RateDealBtn, ViewAllBtn, SuggestEditBtn } from "../../../components/Buttons";


class Results extends Component {
  state = {
    reviews,
    deals,
    name: "Ermanos",
    address: "http://www.ermanosbrew.com/",
    stars: "****"

   
  };

  



  render() {

    return (
      <div>
        <Row>
  <Col sm="4">
        {/* <BackBtn /> */}
        <BusinessCard>
             <BusinessNameCard 
             name={this.state.name} address={this.state.address} stars={this.state.stars} 
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
       />
          ))}

        </BusinessCard>
        {/* <ReportDealBtn /> */}
        {/* <RatingCard>
            {children}
        </RatingCard> */}
        <ReviewsContainer>
            {this.state.reviews.map(review => (   
       <ReviewCard
              // onClick={() => this.handleClickEvent(pic.id)}
              id={review.id}
              key={review.id}
              username={review.username}
              date={review.date}
              info={review.info}
             
       />
          ))}
        </ReviewsContainer>
        {/* <TopPalCard>
            {children}
        </TopPalCard> */}
        {/* <SuggestEditBtn /> */}
        </Col>
        </Row>
      </div>
    );
  }
}

export default Results; 
