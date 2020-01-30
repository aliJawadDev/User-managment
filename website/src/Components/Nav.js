import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavLink from './NavLink'
import Logo from '../school.png'
import './Nav.css'



export default class Nav extends Component {
    constructor(Props) {
        super(Props);
        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} style={{ width: 30 + 'px', hieght: 30 + 'px', marginRight: 10 + 'px' }} alt='Image not found' />Navbar
          </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        {/* home */}
                        {this.props.active === "Home" ?
                            <NavLink actived="active" name="Home" goTo="/" />
                            :
                            <NavLink name="Home" goTo="/" />
                        }


                        {/* Sign Up */}
                        {this.state.user ?
                            null
                            :
                            <div>
                                {this.props.active === "Sign" ?
                                   <NavLink actived="active" name="Sign Up" goTo="/Sign" />
                                    :
                                    <NavLink name="Sign Up" goTo="/Sign" />
                                }
                            </div>
                        }

                        {/* New Post */}
                        {this.props.active === "Post" ?
                            <NavLink actived="active" name="New Post" goTo="/Post" />
                            :
                            <NavLink name="New Post" goTo="/Post" />
                        }

                        {/* New Post */}
                        {this.props.active === "Find Posts" ?
                            <NavLink actived="active" name="Find Posts" goTo="/Posts" />
                            :
                            <NavLink name="Find Posts" goTo="/Posts" />
                        }

                        {/* Find Users */}
                        {this.props.active === "Find Users" ?
                            <NavLink actived="active" name="Find Users" goTo="/User" />
                            :
                            <NavLink name="Find Users" goTo="/User" />
                        }

                        {/* Login Users/ Profile */}

                        {this.state.user ?
                            <div>
                                {this.props.active === "Login" ?
                                    <NavLink actived="active" name="Profile" goTo={"/Profile/" + this.state.user[0]._id} />
                                    :
                                    <NavLink name="Profile" goTo={"/Profile/" + this.state.user[0]._id} />
                                }
                            </div>
                            :
                            <div>
                                {this.props.active === "Login" ?
                                    <NavLink actived="active" name="Login" goTo="/Login" />
                                    :
                                    <NavLink name="Login" goTo="/Login" />
                                }
                            </div>
                        }

                    </ul>
                </div>
            </nav>
        )
    }
}