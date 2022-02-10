import { Stack, Text } from "@chakra-ui/react";
import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import SidebarWithHeader from "./Sidebar";
import ProductList from './containers/ProductList';
class App extends Component {

  render() {
    return (
          <Fragment>
            <div>
              <SidebarWithHeader>
                  <h1>The Force Awakens</h1>
                  <ProductList />
              </SidebarWithHeader>
            </div>
          </Fragment>
    );
  }
}

export default App;