import React, { Component } from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import { store } from "../store";

class App extends Component {

  render() {
    return (
      <Provider store={store}>
          <Fragment>
            <div>
              
            </div>
          </Fragment>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);