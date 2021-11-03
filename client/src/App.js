import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';

import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        "0x02C0c53579Ae3623244709DaD3D6EcB20D642205",
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
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

          <Switch>
              <Route path="/properties">
                <Properties />
              </Route>
              <Route path="/addProperty">
                <AddProperty />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
      </Router>
    );

    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }
    // return (
    //   <div className="App">
    //     <h1>Good to Go!</h1>
    //     <p>Your Truffle Box is installed and ready.</p>
    //     <h2>Smart Contract Example</h2>
    //     <p>
    //       If your contracts compiled and migrated successfully, below will show
    //       a stored value of 5 (by default).
    //     </p>
    //     <p>
    //       Try changing the value stored on <strong>line 42</strong> of App.js.
    //     </p>
    //     <div>The stored value is: {this.state.storageValue}</div>
    //   </div>
    // );
  }
}

export default App;
