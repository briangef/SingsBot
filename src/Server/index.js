const TwitchJS = require('twitch-js');
const Queue = require('./queue');

const options = {
    channels: ['dadjokecinema', 'telear', 'yourstarling', 'tygir', 'infuzeyou'],
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        password: process.env.OKEY,
        username: 'SingsBot',
    },
    options: {
        debug: true,
    },
};

const SBServer = new TwitchJS.client(options);

let QueueList = [];

options.channels.forEach(channel => {
    QueueList[channel] = new Queue(channel, SBServer);
});

// COMMAND LIST
const SBCommands = {
    'open' : 'Opens the queue',
    'close' : 'Closes the queue',
    'clear' : 'Empties the queue',
    'queue' : 'Display the queue',
    'next' : 'Gets the next person in the queue',
    'random' : 'Gets a random person from the queue',
    'join [REQUEST]' : 'Joins the queue, with an optional request message',
    'leave' : 'Removes yourself from the queue',
    'position' : "Gets your current position in the queue",
    'sbhelp [COMMAND]' : 'Displays help text about commands'
}

// Reply to chat
SBServer.on('chat', (channel, userstate, message, self) => {
    if (self) {
        return;
    }

    // STANDARD COMMANDS

    if(QueueList[channel] == null) {
        GeneralError(channel, "Channel does not exist in QueueList");
    }

    // HELP Dialog
    if (message.startsWith('!sbhelp')) {
        if(message.length > 8) {
            let commandName = message.substring(8);
            console.log(commandName);
            let commandMatch = false;
            // get matching command from list
            for(key in SBCommands) {
                if(commandName === key || commandName === '!' + key) {
                    commandMatch = true;
                    SBServer.say(channel, 'HELP: !' + key + ' - ' + SBCommands[key]);
                } 
            };

            if(!commandMatch) {
                SBServer.say(channel, 'There is no SingsBot command by that name. Type !sbhelp for a list of commands');
            }
        } else {
            let helpString = 'SingsBots Commands: ';
            let commandCount = 0;
            const commandList = Object.keys(SBCommands);
            commandList.forEach(key => {
                helpString += '!' + key;

                commandCount++;
                if(commandCount < commandList.length) {
                    helpString += ', ';
                }
            });

            SBServer.say(channel, helpString);
        }
    }

    // Open Queue
    if (message === '!open' || message === '!open pond') {
        if( userstate.badges.broadcaster === '1'  || userstate.mod)
        {
            if( QueueList[channel].isOpen )
            {
                console.log("Queue already open on channel: " + channel);
                SBServer.say(channel, "Can't open. Queue is already open.");
            } else {
                QueueList[channel].OpenQueue(message.includes('pond'));
            }
        } else {
            PermissionError(channel, userstate.username);
        }
    }

    // Close Queue
    if (message == '!close') {
        if( userstate.badges.broadcaster === '1' || userstate.mod)
        {
            if( QueueList[channel].isOpen )
            {
                QueueList[channel].CloseQueue();
            } else {
                console.log("Queue not open on channel: " + channel);
                SBServer.say(channel, "Can't close. Queue is not currently open.");
            }
        } else {
            PermissionError(channel, userstate.username);
        }
    }

    // Get next item in Queue
    if (message == '!next') {
        if( userstate.badges.broadcaster === '1' || userstate.mod)
        {

            const queue = QueueList[channel];
            if(queue.userList.length > 0) {
                const nextUser = queue.userList.shift();
                SBServer.say(channel, 'Next in the queue is @' + nextUser.username + '.');
                if(nextUser.request != '') {
                    SBServer.say(channel, '@' + nextUser.username + ' requested ' + nextUser.request + '.');
                }
            } else {
                SBServer.say(channel, 'No one currently in queue.');
            }
                
        } else {
            PermissionError(channel, userstate.username);
        }
    }

    // Get a random person from the Queue
    if (message == '!random' || message == '!harpoon') {
        if( userstate.badges.broadcaster === '1' || userstate.mod)
        {
            const queue = QueueList[channel];
            if(queue.userList.length > 0) {
                const userIndex = Math.floor(Math.random() * queue.userList.length); 
                const nextUser = queue.userList[userIndex];
                SBServer.say(channel, '@' + nextUser.username + ' has been randomly selected from the queue.');
                if(nextUser.request != '') {
                    SBServer.say(channel, '@' + nextUser.username + ' requested ' + nextUser.request + '.');
                }
                queue.userList.splice(userIndex, 1);
            } else {
                SBServer.say(channel, 'No one currently in queue.');
            }
        } else {
            PermissionError(channel, userstate.username);
        }
    }

    // Clear the queue
    if (message == '!clear') {
        if( userstate.badges.broadcaster === '1' || userstate.mod)
        {
            const queue = QueueList[channel];
            if(queue.userList.length > 0) {
                queue.ClearQueue();
            } else {
                SBServer.say(channel, 'No one currently in queue.');
            }                
        } else {
            PermissionError(channel, userstate.username);
        }
    }

    // Display the Queue
    if (message == '!queue' || message == '!queue list') {
        if( userstate.badges.broadcaster === '1' || userstate.mod)
        {

            const queue = QueueList[channel];
            if(queue.userList.length > 0) {
                queue.ListQueue(message.includes('list'));
            } else {
                SBServer.say(channel, 'No one currently in queue.');
            }
                
        } else {
            PermissionError(channel, userstate.username);
        }
    }

    // Join Queue
    if(message.startsWith("!join")) {
        if( QueueList[channel].isOpen )
        {
            let requestMessage = '';
            // Channel exists 
            if (message.length > 5) {
                requestMessage = message.substring(5);
            }
            QueueList[channel].AddUser(userstate.username, requestMessage);
        } else {
            console.log("Queue not open on channel: " + channel);
            SBServer.say(channel, "Can't join. Queue is not currently open.");
        }
    }

    // Leave Queue
    if(message.startsWith("!leave")) {
        if( QueueList[channel].isOpen )
        {
            QueueList[channel].RemoveUser(userstate.username);
        } else {
            console.log("Queue not open on channel: " + channel);
            SBServer.say(channel, "Can't leave. Queue is not currently open.");
        }
    }

    // Get position of Queue
    if(message.startsWith("!position")) {
        QueueList[channel].GetPosition(userstate.username);
    }

});

function PermissionError(channel, username){
    SBServer.say(channel, "@" + username + " - you don't have permission to do this command");
}

function GeneralError(channel, message) {
    SBServer.say(channel, 'There is an error with the queue - please report to @DadJokeCinema:');
    SBServer.say(channel, message);
}

// Connect to channels
SBServer.connect()
    .then((data) => {
        // log connection
    })
    .catch((err) => {
        // log connection
    });
