import React, { Component } from 'react';
import axios from 'axios';
import './Card.css';
import Nav from './Components/Nav';

export default class Sign extends Component {
  componentDidMount() {
    setTimeout(() => {
      axios.get(`http://localhost:1000/getUser`)
      .then(res => {
        this.setState({ results: res.data })
      })
    }, 1000);
  }
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      username: '',
      email: '',
      password: '',
      confirm: '',
      alerts: '',
      success: '',
      waiting: true,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.giveAlert = this.giveAlert.bind(this)
    this.Success = this.Success.bind(this)
    this.create = this.create.bind(this)
    this.getData = this.getData.bind(this)
  }
  getData() {
    axios.get(`http://localhost:1000/getUser`)
    .then(res => {
      this.setState({ results: res.data })
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  giveAlert(alert) {
    this.setState({
      alerts: alert
    })
    setTimeout(function () {
      this.setState({ alerts: '' })
    }.bind(this), 1000)
  }

  create() {
    axios.post(`http://localhost:1000/newUser`, {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
  }

  Success(message) {
    this.setState({
      success: message
    })
    setTimeout(function () {
      this.setState({ success: '' })
    }.bind(this), 1000)
  }

  handleSubmit() {
    var resultsLength = this.state.results.length;
    var result = this.state.results;
    var usernames = [];
    var emails = []
    if (this.state.username && this.state.email && this.state.password && this.state.confirm && resultsLength) {
      if (this.state.password === this.state.confirm) {
        for (var i = 0; i < resultsLength; i++) {
          usernames.push(result[i].username)
          emails.push(result[i].email)
        }
        if (!usernames.includes(this.state.username)) {
          if (!emails.includes(this.state.email)) {
            this.create()
            this.setState({waiting: false})
            this.getData()
            this.Success('User Created!')
            setInterval(() => {
              this.setState({waiting: true})
            }, 1000);
          }
          else {
            this.giveAlert("Email already taken! (Login instead)")
          }
        }
        else {
          this.giveAlert("Username taken!")
        }
      }
      else {
        this.giveAlert('Password do not match!')
      }
    }
    else if (this.state.username && this.state.email && this.state.password && this.state.confirm && !resultsLength) {
      this.create()
      this.getData()
      this.Success('User Created!')
    }
    else {
      this.giveAlert('Please enter all information!')
    }
  }



  render() {
    return (
      <div id="body">
        <Nav active="Sign"/>

        {/* card and background */}

        <div className="container">
          <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm card-Sign">
              <h3 style={{ textAlign: 'center', marginTop: 25, marginBottom: 25, fontSize: 4 + 'em' }}>Sign Up</h3>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-user"></i></span>
                </div>
                <input type="text" className="form-control" name="username" onChange={this.handleChange} placeholder="Username" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                </div>
                <input type="email" className="form-control" name="email" onChange={this.handleChange} placeholder="Email" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-key"></i></span>
                </div>
                <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Password" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-key"></i></span>
                </div>
                <input type="password" className="form-control" name="confirm" onChange={this.handleChange} placeholder="Confirm Password" />
              </div>
              <div className="row" id="btnRow">
                <div className="col-sm"></div>
                {this.state.waiting === true ? <div className="col-sm">
                  <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                </div> :
                null}
                <div className="col-sm">
                </div>
              </div>
              <h4 className={(this.state.alerts ? 'alert' : '')}>{this.state.alerts}</h4>
              <h4 className={(this.state.success ? 'success' : '')}>{this.state.success}</h4>
            </div>
            <div className="col-sm"></div>
          </div>
        </div>
      </div>
    );
  }
}
