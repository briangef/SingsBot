import React from 'react';

function NavBar() {

    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main-navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="/images/Logo.png" />
                </a>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarMain">
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                    <span aria-hidden="true" />
                </a>
            </div>
            <div id="navbarMain" className="navbar-menu">
                <div className="navbar-end">
                    <a className="navbar-item">Home</a>
                    <a className="navbar-item">Song List</a>
                    <a className="navbar-item">Singers</a>
                    <a className="navbar-item has-text-weight-bold sb-login-item">Login with Twitch</a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;