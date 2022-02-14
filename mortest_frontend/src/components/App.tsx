import { Stack, Text } from "@chakra-ui/react";
import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// import { store } from "../store";
import SidebarWithHeader from "./Sidebar";
class App extends Component {

  render() {
    return (
          <Fragment>
            <div>
              <SidebarWithHeader>
                Hello
              </SidebarWithHeader>
            </div>
          </Fragment>
    );
  }
}

export default App;