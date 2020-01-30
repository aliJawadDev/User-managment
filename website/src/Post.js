import React, { Component } from 'react';
import axios from 'axios';
import './Card.css';
import Nav from './Components/Nav';

export default class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      price: '',
      description: '',
      tags: '',
      alerts: '',
      user: JSON.parse(localStorage.getItem('user')),
      success: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.giveAlert = this.giveAlert.bind(this)
    this.Success = this.Success.bind(this)
    this.create = this.create.bind(this)
    this.onChange = this.onChange.bind(this)

  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  onChange(e){
    const check = /^[0-9/./,]+$/;
    if (e.target.value === '' || check.test(e.target.value)) {
       this.setState({price: e.target.value})
    }
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
    axios.post(`http://localhost:1000/newPost`, {
      title: this.state.title,
      price: this.state.price,
      description: this.state.description,
      tags: this.state.tags,
      author: this.state.user[0].username,
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
      var data = this.state.title && this.state.price && this.state.description && this.state.tags;
      if(data){
          this.create();
          this.Success('Post Created!')
      }
      else{
          this.giveAlert('Please enter all information!')
      }
  }
  render() {
    return (
      <div id="body">
        <Nav active="Post"/>
        <div className="container">
          <div className="row">
            <div className="col-sm"></div>
            <div className="col-sm card-Sign">
              <h3 style={{ textAlign: 'center', marginTop: 25, marginBottom: 25, fontSize: 4 + 'em' }}>Post Item</h3>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-edit"></i></span>
                </div>
                <input type="text" className="form-control" name="title" onChange={this.handleChange} placeholder="Title" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-credit-card"></i></span>
                </div>
                <input type="text" className="form-control" value={this.state.price} onChange={this.onChange}  placeholder="Price" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-font"></i></span>
                </div>
                <textarea type="password" className="form-control" name="description" onChange={this.handleChange} placeholder="Description" />
              </div>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fa fa-tag"></i></span>
                </div>
                <input type="text" className="form-control" name="tags" onChange={this.handleChange} placeholder="Tags" />
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