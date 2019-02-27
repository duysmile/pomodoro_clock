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
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    if (this.props.time === MAX_TIME) {
      return;
    }
    this.props.onChangeTime(INCREASE, this.props.type);
  }

  decrement() {
    if (this.props.time === MIN_TIME) {
      return;
    }
    this.props.onChangeTime(DECREASE, this.props.type);
  }

  render() {
    return (
      <div id={this.props.id + '-label'} className="d-flex flex-column align-items-center m-3">
        <p>
          <strong className="title--transform-upper">
            {this.props.displayLabel}
          </strong>
        </p>
        <div className="d-flex">
          <button id={this.props.id + '-decrement'} onClick={this.decrement}>
            <i className="fa fa-arrow-down"></i>
          </button>
          <span id={this.props.id + '-length'}>
            {this.props.time}
          </span>
          <button id={this.props.id + '-increment'} onClick={this.increment}>
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
    this.warningTime = this.warningTime.bind(this);
  }
  warningTime() {
    if (this.props.timeLeft < 60) {
      return {
        color: 'red'
      };
    }
  }
  render() {
    return (
      <div
        style={this.warningTime()}
        className="mt-3 py-3 px-5 d-flex flex-column justify-content-center align-items-center clock--border"
      >
        <strong id='timer-label'>
          {this.props.type}
        </strong>
        <span id='time-left' className="clock--font-size">
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
      session: 25,
      break: 5,
      timer: 1500,
      type: SESSION,
      status: STOP,
      intervalId: ''
    };
    this.changeBreak = this.changeBreak.bind(this);
    this.displayTime = this.displayTime.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  displayTime() {
    let minutes = Math.floor(this.state.timer / 60);
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
    if (this.state.status === STOP && this.state.timer > 0) {
      const intervalId = setInterval(() => {
        if (this.state.timer === 0) {
          this.audioBeep.play();
        }
        this.setState((prevState) => {
          let type = prevState.type;
          let timer = prevState.timer;
          if (prevState.timer === 0) {
            type = type === SESSION ? BREAK : SESSION;
            timer = type === SESSION ? prevState.session * 60 : prevState.break * 60
          } else {
            timer = timer - 1;
          }
          return {
            timer: timer,
            type: type
          };
        })
      }, 1000);
      this.setState({
        intervalId: intervalId,
        status: PLAY
      })
    } else if (this.state.status === PLAY) {
      clearInterval(this.state.intervalId);
      this.setState({
        intervalId: '',
        status: STOP
      });
    }
  }

  resetTimer() {
    clearInterval(this.state.intervalId);
    this.setState({
      session: 25,
      break: 5,
      timer: 1500,
      type: SESSION,
      status: STOP,
      intervalId: ''
    });
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }

  changeBreak(option, state) {
    if (this.state.status === PLAY) {
      return;
    }
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
            id='break'
          />
          <IncrementDecrement
            displayLabel="Session Length"
            time={this.state.session}
            onChangeTime={this.changeBreak}
            type={SESSION}
            id='session'
          />
        </div>
        <Clock timeLeft={this.state.timer} type={this.state.type} time={this.displayTime()}/>
        <div className="mt-2">
          <button id='start_stop' onClick={this.countDown}>
            <i className="fa fa-play"></i>
            <i className="fa fa-pause"></i>
          </button>
          <button id='reset' onClick={this.resetTimer}>
            <i className="fa fa-refresh"></i>
          </button>
        </div>
        <audio
          preload="auto"
          src="https://goo.gl/65cBl1"
          ref={(audio) => {this.audioBeep = audio}}
        >
        </audio>
      </div>
    );
  }
}

export default App;
