import React, { useEffect, useState } from 'react';
import { CompoundButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

function LoginButton(props) {
    const[user, setUser] = useState(null);
    const[disabled, setIsDisabled] = useState('');
    const[popup, setPopup] = useState(null)

    const { socket, provider } = props;

    useEffect(() => {
        socket.on('connection', (passUser) => {
            popup.close();
            setUser({passUser});
        });
    });

    function CheckPopup() {
        const check = setInterval(() => {
            if(!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check);
                setIsDisabled('');
            }
        }, 1000);
    }

    function OpenPopup() {
        // HARD CODED FOR RIGHT NOW
        const url = `https://id.twitch.tv/oauth2/authorize?client_id=uqlrrqazyxx0nbi4oflum1lg5agy34&redirect_uri=https%3A%2F%2Fsingsbot.netlify.com%2f&response_type=token&scope=user:read:broadcast+user:read:email`;
        return window.open(url, '_blank'); 
    }

    function startAuth() {
        if(!disabled) {
            setPopup(OpenPopup());
            CheckPopup();
            setIsDisabled('disabled');
        }
    }

    return (
            <CompoundButton primary={true} secondaryText="Use your Twitch account to login to SingsBot" disabled={disabled} onClick={() => {startAuth()}}>
                Login
            </CompoundButton>
    );
}

export default LoginButton;