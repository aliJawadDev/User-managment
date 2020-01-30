import React, { Component } from 'react';
import axios from 'axios'
import Nav from './Components/Nav'
import { Link } from 'react-router-dom'



export default class User extends Component {

    componentDidMount() {
        setTimeout(() => {
            axios.get(`http://localhost:1000/getUser`)
            .then(res => {
                this.setState({ Users: res.data })
            })
        }, 1000);
    }

    constructor(Prop) {
        super(Prop)
        this.state = {
            Users: null
        }
    }
    
    render() {
        return (
            <div>
                <Nav active="Find Users" />
                <div className="container" style={{ marginTop: 100 }}>
                    <div className="row">
                        <div className="col-sm"></div>
                        <div className="col-sm">
                            {this.state.Users ? <div>
                                {this.state.Users.map(user => <div className="container">
                                    <div className="card" style={style.card}>
                                        <div className="card-body">
                                            <h5 className="card-title" >{user.username}</h5>
                                            <h6 class="card-subtitle mb-2 text-muted">{user.email}</h6>
                                            <p className="card-text">Description here</p>
                                            <Link to={"Profile/" + user._id} className="card-link">Go to profile</Link>
                                        </div>
                                    </div>
                                </div>)}
                            </div>
                                :
                                <h3>No Users</h3>
                            }
                        </div>
                        <div className="col-sm"></div>
                    </div>
                </div>
            </div>
        )
    }
}

const style = {
    card: {
        width: 18 + 'rem',
        marginBottom: 30 + 'px',
        borderRadius: 20 + 'px',
    }
}