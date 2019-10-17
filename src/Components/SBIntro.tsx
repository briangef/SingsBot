import React from 'react';

function SBIntro(props: any) {
    if(props.IsLoggedIn) {
        return (
            <section className="hero sb-intro">
            <div className="hero-body">
                <h1 className="title">
                    Logged In
                </h1>
            </div>
          </section>
        );
    } else {
        return (
            <section className="hero sb-intro">
                <div className="hero-body">
                    <div className="container columns">
                        <div className="column sb-intro-textcol">
                        <h1 className="title">
                            If you play Twitch Sings, <span className="sb-sings-text">SingsBot</span> is your Best Friend
                        </h1>
                        <h2 className="subtitle">
                            Manage your queues, track completed duets and who you've sung with, and see what your friends and
                            favorite streamers are singing - all in one place.
                        </h2>
                        </div>
                        <div className="column has-text-centered">
                        <img src="images/screenshot_1.png" />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default SBIntro;