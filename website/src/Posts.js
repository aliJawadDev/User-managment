import React, { Component } from 'react';
import axios from 'axios';
import Nav from './Components/Nav';


export default class Posts extends Component {

  getData() {
    axios.get(`http://localhost:1000/getPosts`)
      .then(res => {
        this.setState({ Posts: res.data })
        this.setState({ Filterd: res.data })
      })
  }

  componentDidMount() {
    setTimeout(() => {
      this.getData()
    }, 500);

  }

  constructor(Props) {
    super(Props)
    this.state = {
      Posts: [],
      Filterd: [],
      searched: "",
      user: JSON.parse(localStorage.getItem('user')),
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.del = this.del.bind(this)
    this.getData = this.getData.bind(this)
  }

  loadByTag() {
    var tag = this.state.searched
    var data = this.state.Posts
    var found = []
    for (var i = 0; i < data.length; i++) {
      if (tag) {
        if (data[i].tags.includes(tag)) {
          found.push(data[i])
        }
      }
      else {
        found.push(data[i])
      }
    }
    this.setState({ Filterd: found })
  }

  del(e) {
    axios.get(`http://localhost:1000/delete/` + e.target.name)
    this.getData()
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  loadAll() {
    var tag = this.state.searched
    var data = this.state.Posts
    var found = []
    for (var i = 0; i < data.length; i++) {
      if (tag) {
        if (data[i].tags.includes(tag)) {
          found.push(data[i])
        }
      }
      else {
        found.push(data[i])
      }
    }
    this.setState({ Filterd: found })
  }

  loadLess100() {
    var tag = this.state.searched
    var data = this.state.Posts
    var found = []
    for (var i = 0; i < data.length; i++) {
      if (tag) {
        if (data[i].price <= 100 && data[i].tags.includes(tag)) {
          found.push(data[i])
        }
      }
      else if (data[i].price <= 100) {
        found.push(data[i])
      }
    }
    this.setState({ Filterd: found })
  }

  loadMore100() {
    var tag = this.state.searched
    var data = this.state.Posts
    var found = []
    for (var i = 0; i < data.length; i++) {
      if (tag) {
        if (data[i].price >= 100 && data[i].tags.includes(tag)) {
          found.push(data[i])
        }
      }
      else if (data[i].price >= 100) {
        found.push(data[i])
      }
    }
    this.setState({ Filterd: found })
  }

  handleSort(event) {
    var selected = event.target.value
    if (selected === "All") {
      this.loadAll()
    }
    else if (selected === "L100") {
      this.loadLess100()
    }
    else if (selected === "M100") {
      this.loadMore100()
    }
  }

  render() {
    return (
      <div>
        <Nav active="Find Posts" />
        <button className="btn btn-primary" style={{ margin: 10 }} onClick={this.loadByTag.bind(this)}>Hello</button>
        <div className="container">
          <div className="col-sm"></div>
          <div className="col-sm">
            <div className="form-group">
              <label>Sort by:</label>
              <select className="custom-select" onChange={this.handleSort}>
                <option selected value="All">All</option>
                <option value="L100">Less than 100$</option>
                <option value="M100">More than 100$</option>
              </select>
            </div>
          </div>
          <div className="col-sm"></div>
        </div>
        <div className="container" style={{ marginTop: 100 }}>
          <div className="row">
            <div className="col-sm"><input placeholder="search" name="searched" onChange={this.handleChange} /></div>
            {this.state.Filterd.length ? <div className="col-sm">
              {this.state.Filterd.map(Post =>
                <div className="container" style={{ marginTop: 10 }}>
                  <div className="card" style={{ width: 18 + 'rem' }}>
                  {this.state.user && this.state.user[0].username === Post.author ?
                        <button className="btn btn-danger" style={{position: 'absolute', right: 0}} name={Post._id} onClick={this.del}>
                        X
                        </button>
                        :
                        null
                      }
                    <div className="card-body">
                      <h5 className="card-title">{Post.title}</h5>
                      <div className="text-muted">
                        ${Post.price}
                      </div>
                      <p className="card-text">{Post.description}</p>
                      <button className="btn" style={{ margin: 0, padding: 5 }}>
                        from: {Post.author}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
              :
              <div className="col-sm">

              </div>
            }
            <div className="col-sm"></div>
          </div>
        </div>
      </div>
    );
  }
}