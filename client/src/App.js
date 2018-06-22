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

const App = () => (
  <Router class="mapHeight">
    <div class="mapHeight">
      <Wrapper class="mapHeight">
      <Navbar />
        <Route exact path="/" component={ListResults} />
        <Route exact path="/loading" component={Loading} />
        <Route exact path="/access" component={Access} />
        <Route exact path="/businessListings" component={BusinessListings} />
        <Route exact path="/listresults" component={ListResults} />
        <Route exact path="/mapresults" component={MapResults} />
        <Route exact path="/businessdetails" component={BusinessDetails} />
      </Wrapper>
    </div>
  </Router>
);

export default App;
