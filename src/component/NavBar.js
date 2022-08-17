import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const logout = () => {
        sessionStorage.clear();
    }

    return (

        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
                <li>
                    Demo
                </li>
                <li className="nav-item">
                    <Link to={"/home"} className="nav-link">
                        Home
                    </Link>
                </li>
                {
                    !user ? null :
                        <>
                            {
                                user.isVerified === false ? null :
                                    <>
                                        <li className="nav-item">
                                            <Link to={"/dashboard"} className="nav-link">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={"/mystore"} className="nav-link">
                                                My Store
                                            </Link>
                                        </li>
                                    </>
                            }
                            <li className="nav-item">
                                <Link onClick={logout} to={"/home"} className="nav-link">
                                    Logout
                                </Link>
                            </li>
                        </>
                }
            </div>
        </nav>

    );
}

export default NavBar; 