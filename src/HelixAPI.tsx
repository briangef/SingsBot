import 'whatwg-fetch';

class HelixAPI {

    private ClientID = 'uqlrrqazyxx0nbi4oflum1lg5agy34';
    private API_URL = 'https://api.twitch.tv/helix/';

    public async GetSingsPlayers() {
        const response = await window.fetch(this.API_URL + 'streams?game_id=509481&first=100', {
            cache: "no-cache",
            headers: {
                'Client-ID': this.ClientID
            },
            method: "GET"
        });
        return await response.json();
    }

}

export default HelixAPI;