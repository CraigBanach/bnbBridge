import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

import bnbBridge from "./contracts/bnbBridge.json";
import getWeb3 from "./getWeb3";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: [], contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = bnbBridge.networks[networkId];
      const instance = new web3.eth.Contract(
        bnbBridge.abi,
        deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand>bnbBridge</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Link className="nav-item nav-link" to="/">Home</Link>
                  <Link className="nav-item nav-link" to="/properties">Properties</Link>
                  <Link className="nav-item nav-link" to="/addProperty">Add Property</Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Container>
            <Switch>
              <Route path="/properties">
                <Properties 
                  contract={this.state.contract}
                />
              </Route>
              <Route path="/addProperty">
                <AddProperty 
                  account={this.state.accounts[0]}
                  contract={this.state.contract}
                />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
