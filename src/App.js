import React, { Component } from 'react';

import Dashboard from './containers/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <Dashboard/>
      </div>
    );
  }
}

export default App;
