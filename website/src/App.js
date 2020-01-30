import React,{Component} from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './Home'
import Sign from './Sign'
import Post from './Post'
import User from './User'
import Posts from './Posts'
import Profile from './Profile'
import Login from './Login'



export default class App extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
        user: JSON.parse(localStorage.getItem('user')),
    }
}

  render(){
  return (
    <Switch>
      <Route exact path="/" component={Home} /> {/*home page*/}
      {this.state.user ? null : <Route path="/Sign" component={Sign} /> /*make users*/}
      <Route path="/Post" component={Post} /> {/*make posts*/}
      <Route path="/User" component={User} /> {/*find users*/}
      <Route path="/Posts" component={Posts} /> {/*find posts*/}
      <Route path="/Profile/:id" component={Profile} />
      <Route path="/Login" component={Login} /> {/*Login page*/}
    </Switch>
  )
  }
}