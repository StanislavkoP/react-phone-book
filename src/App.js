import React, { Component } from 'react';

import Dashboard from './containers/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="ui container" style={{marginTop: '16px'}}>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
