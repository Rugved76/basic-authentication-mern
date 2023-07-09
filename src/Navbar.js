import React from 'react'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <a className="navbar-brand" href="#">Navbar</a>
        
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home</a>
                    </li>
                    {props.isloggedin &&
                        <li className="nav-item active">
                            <a className='nav-link' href='#'>Welcome {props.username}</a>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Navbar   