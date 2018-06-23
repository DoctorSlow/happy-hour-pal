import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Loading from "./pages/Loading/Loading";
import Access from "./pages/Access/Access";
import BusinessListings from "./pages/BusinessListings/BusinessListings";
import ListResults from "./pages/ListResults/ListResults";
import MapResults from "./pages/MapResults/MapResults";
import Wrapper from "./components/Wrapper";
import BusinessDetails from "./pages/BusinessDetails/BusinessDetails"
import LogIn from "./pages/LogIn/LogIn"
import SignUp from "./pages/SignUp/SignUp"
import AddBusiness from "./pages/AddBusiness/AddBusiness";
import EditBusiness from "./pages/EditBusiness/EditBusiness";

const App = () => (
  <Router className="mapHeight">
    <div className="mapHeight">
      <Navbar />
      <Wrapper class="mapHeight">
        <Route exact path="/" component={Loading} />
        <Route exact path="/loading" component={Loading} />
        <Route exact path="/access" component={Access} />
        <Route exact path="/businessListings" component={BusinessListings} />
        <Route exact path="/listresults" component={ListResults} />
        <Route exact path="/mapresults" component={MapResults} />
        <Route exact path="/businessdetails" component={BusinessDetails} />
        <Route exact path="/signin" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/addbusiness" component={AddBusiness} />
        <Route exact path="/editbusiness" component={EditBusiness} />
      </Wrapper>
    </div>
  </Router>
);

export default App;
