import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import Container from "../../components/Container";
import Row from "../../components/Row";
import Col from "../../components/Col";
import SearchBar from "../../components/SearchBar";
import "./BusinessListings.css";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class BusinessListings extends Component {
  state = {
    businesses: [],
    name: "",
    address: "",
    phone: "",
    link: "",
    description: ""
  };

  componentDidMount() {
    this.loadBusinesses();
  }

  loadBusinesses = () => {
    API.getBusinesses()
      .then(res =>
        this.setState({ businesses: res.data, name: "", address: "", phone: "", link: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  deleteBusiness = id => {
    API.deleteBusiness(id)
      .then(res => this.loadBusinesses())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.address && this.state.phone) {
      API.saveBusiness({
        name: this.state.name,
        address: this.state.address,
        phone: this.state.phone,
        link: this.state.link,
        description: this.state.description
      })
        .then(res => this.loadBusinesses())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
      <SearchBar />
      <Container>
        <Row>
          <Col size="md-6">
            <h1>Add a New Business</h1>
            <form>
              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Business Name (required)"
              />
              <Input
                value={this.state.address}
                onChange={this.handleInputChange}
                name="address"
                placeholder="Address (required)"
              />
              <Input
                value={this.state.phone}
                onChange={this.handleInputChange}
                name="phone"
                placeholder="Phone (required)"
              />
              <Input
                value={this.state.link}
                onChange={this.handleInputChange}
                name="link"
                placeholder="Link (Optional)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                // disabled={!(this.state.names && this.state.address && this.state.phone)}
                onClick={this.handleFormSubmit}
              >
                Submit New Business
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <h1>Saved Businesses</h1>
            {this.state.businesses.length ? (
              <List>
                {this.state.businesses.map(business => (
                  <ListItem key={business._id}>
                    <Link to={"/businesses/" + business._id}>
                      <strong>
                        {business.name} at {business.address}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBusiness(business._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
      </div>
    );
  }
}
// const ListResults = () => (
//   <div>
//     <SearchBar />
//     <Container>
//       <Row>
//         <Col size="md-12">

//           {/* Business cards goes here */}

//         </Col>
//       </Row>
//       <Row>
//         <Col size="md-12">

//           {/* Add new location option goes here */}

//         </Col>
//       </Row>
//     </Container>
//   </div>
// );

export default BusinessListings;
