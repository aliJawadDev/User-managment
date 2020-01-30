import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Nav from './Components/Nav';

export default class Profile extends Component {

  componentDidMount() {
    axios.get(`http://localhost:1000/profile/`+this.props.match.params.id)
      .then(res => {
        const data = res.data;
        if (data.length !== 0) {
          this.setState({ data })
        }
      })
  }

  logOut(){
    localStorage.clear();
    window.location.href='/Login'
  }


  constructor(props) {
    super(props)
    this.state = {
      data: [],
      user: JSON.parse(localStorage.getItem('user')),
    }
  }



  render() {
    return (
      <div>
        <Nav active="Profile" />
        <h3>{this.state.data.username}</h3>
        <h3>{this.state.data.email}</h3>
        <h3>{this.state.data.password}</h3>
        <h3>{this.state.data._id}</h3>
        {this.state.user && this.state.user[0]._id === this.state.data._id ? 
        <button className="btn btn-danger" onClick={this.logOut}>Log Out</button>
        :
        null
      }
      </div>
    );
  }
}
