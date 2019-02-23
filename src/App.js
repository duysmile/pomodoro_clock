import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

class IncrementDecrement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0
    };
  }

  render() {
    return (
      <div className="d-flex flex-column align-items-center m-3">
        <p>
          <strong className="title--transform-upper">
            {this.props.displayLabel}
          </strong>
        </p>
        <div className="d-flex">
          <button>
            <i className="fa fa-arrow-down"></i>
          </button>
          {this.state.time}
          <button>
            <i className="fa fa-arrow-up"></i>
          </button>
        </div>
      </div>
    );
  }
}

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Session',
      time: '0:00'
    };
  }

  render() {
    return (
      <div className="mt-3 py-3 px-5 d-flex flex-column justify-content-center align-items-center clock--border">
        <strong>
          {this.state.display}
        </strong>
        <span className="clock--font-size">
          {this.state.time}
        </span>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App-header d-flex justify-content-center align-items-center">
        <h1>
          Pomodoro Clock
        </h1>
        <div className="d-flex">
          <IncrementDecrement displayLabel="Break Length"/>
          <IncrementDecrement displayLabel="Session Length"/>
        </div>
        <Clock/>
        <div className="mt-2">
          <button>
            <i className="fa fa-play"></i>
          </button>
          <button>
            <i className="fa fa-pause"></i>
          </button>
          <button>
            <i className="fa fa-refresh"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
