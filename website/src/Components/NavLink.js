import React from 'react'
import { Link } from 'react-router-dom'




function NavLink(props) {
        return(
            <li className={props.actived}>
            <Link className="nav-link" to={props.goTo}>{props.name}</Link>
            </li>
        )
}
export default NavLink;