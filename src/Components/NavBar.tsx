import React from 'react';

function NavBar() {
    return (
        <nav className="navbar is-dark" role="navigation" aria-label="main-navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src="/images/icon.png" />
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
                    <a className="navbar-item is-dark sb-login-item" 
                        href="https://id.twitch.tv/oauth2/authorize?client_id=uqlrrqazyxx0nbi4oflum1lg5agy34&redirect_uri=https%3A%2F%2Fsingsbot.netlify.com%2f&response_type=token&scope=user:read:broadcast+user:read:email">
                        Login with Twitch
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;