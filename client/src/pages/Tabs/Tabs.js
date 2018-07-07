import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ListResults from "../ListResults/ListResults";
import MapResults from "../MapResults/MapResults";
// import DisplayLinks from "../../components/DisplayLinks/DisplayLinks";
import NestedModal from "../../components/NestedModal/NestedModal";
import "./Tabs.css"

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className="mapHeight">
                {/* <DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} /> */}
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
                <TabContent activeTab={this.state.activeTab} className="mapHeight">
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <ListResults />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2" className="mapHeight">
                        <Row className="mapHeight">
                            <Col sm="12" className="mapHeight">
                                <MapResults />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
                <NestedModal buttonLabel="Click Me" />
            </div>
        );
    }
}