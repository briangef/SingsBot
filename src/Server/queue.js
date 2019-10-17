class Queue {
    constructor(channel, server) {
        this.channel = channel;
        this.server = server;

        this.userList = [];

        this.isOpen = false;

        this.isPond = false;
        
        this.QueueName = 'Queue';
    }

    OpenQueue(pond) {
        this.isOpen = true;
        this.isPond = pond;
        if(this.isPond) {
            this.QueueName = 'Pond';
        }
        this.server.say(this.channel, this.QueueName + ' is now open!');
    }

    CloseQueue() {
        this.isOpen = false;
        this.server.say(this.channel, this.QueueName + ' is now closed. Remember to !clear when you are done with it.');
    }

    ClearQueue() {
        this.userList = [];
        this.server.say(this.channel, this.QueueName + ' has been cleared.');
    }


    AddUser(username, message) {
        let userInQueue = false;
        for(let x = 0; x < this.userList.length; x++) {
            if(this.userList[x].username === username) {
                userInQueue = true;              
                this.server.say(this.channel, '@' + username + ', you are already in the ' + this.QueueName.toLowerCase() + '.');
            }
        }
        if( !userInQueue ) {
            this.userList.push({
                username: username,
                request:  message
             });

             this.server.say(this.channel, '@' + username + ' has joined the ' + this.QueueName.toLowerCase() + ' at position ' + this.userList.length);
             console.log(this.userList);
        }
    }

    RemoveUser(username) {
        let userInQueue = false;
        for(let x = 0; x < this.userList.length; x++) {
            if(this.userList[x].username === username) {
                userInQueue = true;
                this.userList.splice(x, 1);
                x--;

                this.server.say(this.channel, '@' + username + ' has left the ' + this.QueueName.toLowerCase() + '.');
            }
        }

        if( !userInQueue ) {
            this.server.say(this.channel, '@' + username + ', you are not in the ' + this.QueueName.toLowerCase() + '.');
        }
        console.log(this.userList);
    }

    GetPosition(username) {
        let userInQueue = false;
        for(let x = 0; x < this.userList.length; x++) {
            if(this.userList[x].username === username) {   
                userInQueue = true;     
                let pos = x+1;    
                this.server.say(this.channel, '@' + username + ', you are #' + pos + ' in the ' + this.QueueName.toLowerCase() + '.');
            }
        }

        if( !userInQueue ) {
            this.server.say(this.channel, '@' + username + ', you are not in the ' + this.QueueName.toLowerCase() + '.');
        }
    }

    ListQueue(names) {
        if (this.userList.length == 1) {
            this.server.say(this.channel, 'There is 1 person in the ' + this.QueueName.toLowerCase() + '.');
        } else {
            this.server.say(this.channel, 'There are ' + this.userList.length + ' people in the ' + this.QueueName.toLowerCase() + '.');
        }
        if(names) {
            let nameList = '';
            for(let x = 0; x < this.userList.length; x++) {
                nameList += '#' + (x+1) + ': @' + this.userList[x].username;
                if(x < (this.userList.length - 1)) {
                    nameList += ', ';
                }
            }

            this.server.say(this.channel, nameList);
        }
    }

}

module.exports = Queue;