import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SearchFlights from "./pages/searchflights";
import FlightDetails from "./pages/flightdetails";
import history from "./history";

export default class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/flights">
            <FlightDetails />
          </Route>
          <Route path="/">
            <SearchFlights />
          </Route>
        </Switch>
      </Router>
    );
  }
}
