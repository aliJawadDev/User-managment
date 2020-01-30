import React, { Component } from 'react';
import Nav from './Components/Nav';
import axios from 'axios';


export default class Home extends Component {
  constructor(Props) {
    super(Props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Nav active="Home" />
      </div>
    );
  }
}