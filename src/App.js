import React, {Component} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

const INCREASE = 1;
const DECREASE = 0;
const SESSION = 'Session';
const BREAK = 'Break';
const MIN_TIME = 1;
const MAX_TIME = 60;
const PLAY = 'played';
const STOP = 'stopped';

class IncrementDecrement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: props.time ? props.time : 0
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    if (this.state.time === MAX_TIME) {
      return;
    }
    this.setState((prevState) => {
      return {
        time: prevState.time + 1
      }
    });
    this.props.onChangeTime(INCREASE, this.props.type);
  }

  decrement() {
    if (this.state.time === MIN_TIME) {
      return;
    }
    this.setState((prevState) => {
      return {
        time: prevState.time - 1
      }
    });
    this.props.onChangeTime(DECREASE, this.props.type);
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
          <button onClick={this.decrement}>
            <i className="fa fa-arrow-down"></i>
          </button>
          {this.state.time}
          <button onClick={this.increment}>
            <i className="fa fa-arrow-up"></i>
          </button>
        </div>
      </div>
    );
  }
}

class Clock extends Component {
  render() {
    return (
      <div className="mt-3 py-3 px-5 d-flex flex-column justify-content-center align-items-center clock--border">
        <strong>
          {this.props.type}
        </strong>
        <span className="clock--font-size">
          {this.props.time}
        </span>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: 5,
      break: 5,
      timer: 300,
      type: SESSION,
      status: STOP
    };
    this.changeBreak = this.changeBreak.bind(this);
    this.displayTime = this.displayTime.bind(this);
  }

  displayTime() {
    let minutes = Math.round(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds;
  }

  countDown() {
    if (this.status.status === STOP) {

    }
  }

  changeBreak(option, state) {
    let timer = this.state.timer;
    let breakTime = this.state.break;
    let sessionTime = this.state.session;
    if (option === INCREASE) {
      breakTime = state === BREAK ? this.state.break + 1 : breakTime;
      sessionTime = state === SESSION ? this.state.session + 1 : sessionTime;
    } else if (option === DECREASE) {
      breakTime = state === BREAK ? this.state.break - 1 : breakTime;
      sessionTime = state === SESSION ? this.state.session - 1 : sessionTime;
    }
    if (state === this.state.type) {
      if (state === SESSION) {
        timer = sessionTime * 60;
      } else {
        timer = breakTime * 60;
      }
    }
    this.setState({
      break: breakTime,
      session: sessionTime,
      timer: timer
    });
  }

  render() {
    return (
      <div className="App-header d-flex justify-content-center align-items-center">
        <h1>
          Pomodoro Clock
        </h1>
        <div className="d-flex">
          <IncrementDecrement
            displayLabel="Break Length"
            time={this.state.break}
            onChangeTime={this.changeBreak}
            type={BREAK}
          />
          <IncrementDecrement
            displayLabel="Session Length"
            time={this.state.session}
            onChangeTime={this.changeBreak}
            type={SESSION}
          />
        </div>
        <Clock type={this.state.type} time={this.displayTime()}/>
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
