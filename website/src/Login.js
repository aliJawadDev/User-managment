import React, { Component } from 'react';
import axios from 'axios';
import './Card.css';
import Nav from './Components/Nav';

export default class Login extends Component {
  componentDidMount() {
    setTimeout(() => {
      axios.get(`http://localhost:1000/getUser`)
      .then(res => {
        this.setState({ results: res.data })
      })
    }, 1000);
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({user})
  }
  constructor(props) {
    super(props)
    this.state = {
      results: [],
      username: '',
      password: '',
      alerts: '',
      success: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.giveAlert = this.giveAlert.bind(this)
    this.Success = this.Success.bind(this)
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

  Success(message) {
    this.setState({
      success: message
    })
    setTimeout(function () {
      this.setState({ success: '' })
    }.bind(this), 1000)
  }

  handleSubmit() {
    var data = this.state.results
    var userEntered = this.state.username
    var passEntered = this.state.password
    var found = [];
    for(var i = 0;i<data.length;i++){
        if((data[i].username===userEntered || data[i].email===userEntered) && data[i].password===passEntered){
            found.push(data[i])
        }
    }
    if(found.length){
    localStorage.setItem('user', JSON.stringify(found));
    window.location.href='/Profile/' + found[0]._id;
    }
  }



  render() {
    return (
      <div id="body">
        <Nav active="Login"/>

        {/* card and background */}

        <div className="container">
          <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm card-Sign">
              <h3 style={{ textAlign: 'center', marginTop: 25, marginBottom: 25, fontSize: 4 + 'em' }}>Login</h3>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-user"></i></span>
                </div>
                <input type="text" className="form-control" name="username" onChange={this.handleChange} placeholder="Username/Email" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-key"></i></span>
                </div>
                <input type="password" className="form-control" name="password" onChange={this.handleChange} placeholder="Password" />
              </div>
              <div className="row" id="btnRow">
                <div className="col-sm"></div>
                <div className="col-sm">
                  <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
                </div>
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
