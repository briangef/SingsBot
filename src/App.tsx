import React, { useState } from 'react';
import NavBar from './Components/NavBar';
import SBIntro from './Components/SBIntro';
import HelixAPI from './HelixAPI';

function App() {
  const Helix = new HelixAPI();
  const [ IsLoggedIn, setLoginStatus ] = useState(false);
  const [ SingsPlayerCount, setSingsPlayerCount ] = useState(0);
  const [ SingsPlayerData, setSingsPlayerData ] = useState<any[]>([]);

  // Get Sings Player List
  Helix.GetSingsPlayers()
  .then(response => {
    setSingsPlayerCount(response.data.length);
    response.data.forEach((player: object) => {
      setSingsPlayerData([...SingsPlayerData, 
        {
          id: SingsPlayerData.length,
          value: player
        }
      ]);
    });
    setLoginStatus(false);
  });

  return (
    <div id="SingsBotApp">
      <NavBar />
      <div className="container">
        <SBIntro IsLoggedIn={IsLoggedIn} />
        <section className="hero sb-singstats">
          <div className="hero-body">
            <h1 className="title">
              {SingsPlayerCount} People are playing Twitch Sings online right now
            </h1>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
