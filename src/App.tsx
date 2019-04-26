import { IPersonaProps, IPersonaSharedProps, Persona, PersonaPresence, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import React from 'react';
import NavBar from './NavBar';

function onRenderCoin(props: IPersonaProps){
  const { coinSize, imageAlt, imageUrl } = props;
  return (
    <div className="TwitchIconCoin">
      <img src={imageUrl} alt={imageAlt} width={coinSize} height={coinSize} />
    </div>
  );
};

function App() {

  const userPersona : IPersonaSharedProps = {
    imageInitials : 'DJC',
    imageUrl : 'https://static-cdn.jtvnw.net/jtv_user_pictures/726a063a-bb31-4802-af62-f5174fbed30a-profile_image-70x70.png',
    secondaryText : 'Singing "TRIBUTE by Tenacious D"',
    tertiaryText : '399 Followers',
    text : 'DadJokeCinema'
  }

  return (
    <div id="SingsBotApp">
      <NavBar />
      <div className="container">
        <Persona
          {...userPersona}
          coinSize={72}
          size={PersonaSize.size72}
          onRenderCoin={onRenderCoin}
          presence={PersonaPresence.online}
        />
      </div>
    </div>
  );
}

export default App;
