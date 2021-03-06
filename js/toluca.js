
function TolucaFX (){
    this.queue = [];
    var fx = this;

    this.next = function(){
        var target = fx.queue.shift();
        if (target != null){
            console.log('play from queue', [sound.src]);
            target.sound.play();
        }
    };
    this.enqueueAndPlay = function(sound){
        try{
            if (fx.queue.length == 0){
                console.log('play', [sound.src]);
                sound.play();
            }else{
                fx.queue.push({target: sound});
            }
        }catch (e) {
            console.log('error playing', e);
        }
    };

    function sound(src) {
        var $this = this;
        // this.sound = document.createElement("audio");
        // this.sound.src = src;
        $this.sound = new Audio();
        $this.sound.addEventListener('ended', function(e){
            fx.next();
        });
        // this.sound.setAttribute("preload", "auto");
        // this.sound.setAttribute("controls", "none");
        // this.sound.style.display = "none";
        // document.body.appendChild(this.sound);

        this.load = function(){
            $this.sound.play();
            $this.sound.src = src;
        }

        this.play = function(){
            try{
                fx.enqueueAndPlay($this.sound);
            }
            catch (e) {
            }
        };

        this.stop = function(){
            try{
                $this.sound.pause();
            }
            catch (e) {
            }
        };
    }

    var tableCreated = new sound("audio/checkin.wav");
    var positionSetted = new sound("audio/checkin.wav");
    var playRequest = new sound("audio/next-request.wav");
    var playCard = new sound("audio/sliding-card.wav");
    var receivingCards = new sound("audio/receiving-cards.wav");
    var loaded = false;

    var audios= [
        tableCreated,
        positionSetted,
        playRequest,
        playCard,
        receivingCards
    ];


    var speechers = {
        'm' : {
            'SAY_TRUCO' : {
                audio : ['truco.wav']
            },
            'SAY_RETRUCO' : {
                audio : ['quiero-retruco.wav']
            },
            'SAY_VALECUATRO' : {
                audio : ['quiero-vale-cuatro.wav']
            },
            'SAY_QUIERO' : {
                audio : ['quiero.wav']
            },
            'SAY_NO_QUIERO' : {
                audio : ['no-quiero2.wav']
            },
            'SAY_ENVIDO' : {
                audio : ['envido.wav']
            },
            'SAY_REAL_ENVIDO' : {
                audio : ['real-envido.wav']
            },
            'SAY_FALTA_ENVIDO' : {
                audio : ['falta-envido.wav']
            },
            'SAY_PASO_ENVIDO' : {
                audio : ['paso.wav']
            },
            'SAY_FLOR' : {
                audio : ['flor.wav']
            },
            'SAY_PASO_FLOR' : {
                audio : ['paso.wav']
            },
            '1' : {
                audio : ['uno.wav']
            },
            '2' : {
                audio : ['dos.wav']
            },
            '3' : {
                audio : ['tres.wav']
            },
            '4' : {
                audio : ['cuatro.wav']
            },
            '5' : {
                audio : ['cinco.wav']
            },
            '6' : {
                audio : ['seis.wav']
            },
            '7' : {
                audio : ['siete.wav']
            },
            '20' : {
                audio : ['veinte.wav']
            },
            '21' : {
                audio : ['veintiuno.wav']
            },
            '22' : {
                audio : ['veintidos.wav']
            },
            '23' : {
                audio : ['veintitres.wav']
            },
            '24' : {
                audio : ['veinticuatro.wav']
            },
            '25' : {
                audio : ['veinticinco.wav']
            },
            '26' : {
                audio : ['veintiseis.wav']
            },
            '27' : {
                audio : ['veintisiete.wav']
            },
            '28' : {
                audio : ['veintiocho.wav']
            },
            '29' : {
                audio : ['veintinueve.wav']
            },
            '30' : {
                audio : ['treinta.wav']
            },
            '31' : {
                audio : ['31.wav']
            },
            '32' : {
                audio : ['32.wav']
            },
            '33' : {
                audio : ['33.wav']
            }
        },
        'f' : {
            'SAY_TRUCO' : {
                audio : ['truco.wav']
            },
            'SAY_RETRUCO' : {
                audio : ['quiero-retruco.wav']
            },
            'SAY_VALECUATRO' : {
                audio : ['quiero-vale-cuatro.wav']
            },
            'SAY_QUIERO' : {
                audio : ['quiero.wav']
            },
            'SAY_NO_QUIERO' : {
                audio : ['no-quiero2.wav']
            },
            'SAY_ENVIDO' : {
                audio : ['envido.wav']
            },
            'SAY_REAL_ENVIDO' : {
                audio : ['real-envido.wav']
            },
            'SAY_FALTA_ENVIDO' : {
                audio : ['falta-envido.wav']
            },
            'SAY_PASO_ENVIDO' : {
                audio : ['paso.wav']
            },
            'SAY_FLOR' : {
                audio : ['flor.wav']
            },
            'SAY_PASO_FLOR' : {
                audio : ['paso.wav']
            },
            '1' : {
                audio : ['uno.wav']
            },
            '2' : {
                audio : ['dos.wav']
            },
            '3' : {
                audio : ['tres.wav']
            },
            '4' : {
                audio : ['cuatro.wav']
            },
            '5' : {
                audio : ['cinco.wav']
            },
            '6' : {
                audio : ['seis.wav']
            },
            '7' : {
                audio : ['siete.wav']
            },
            '20' : {
                audio : ['veinte.wav']
            },
            '21' : {
                audio : ['veintiuno.wav']
            },
            '22' : {
                audio : ['veintidos.wav']
            },
            '23' : {
                audio : ['veintitres.wav']
            },
            '24' : {
                audio : ['veinticuatro.wav']
            },
            '25' : {
                audio : ['veinticinco.wav']
            },
            '26' : {
                audio : ['veintiseis.wav']
            },
            '27' : {
                audio : ['veintisiete.wav']
            },
            '28' : {
                audio : ['veintiocho.wav']
            },
            '29' : {
                audio : ['veintinueve.wav']
            },
            '30' : {
                audio : ['treinta.wav']
            },
            '31' : {
                audio : ['31.wav']
            },
            '32' : {
                audio : ['32.wav']
            },
            '33' : {
                audio : ['33.wav']
            }

        }
    };

    this.tableCreatedEffect = function(){
        tableCreated.play();
    };
    this.positionSettedEffect = function(){
        positionSetted.play();
    };
    this.playRequestEffect = function(){
        playRequest.play();
    };
    this.playCardEffect = function(){
        playCard.play();
    };
    this.receivingCardsEffect = function(){
        receivingCards.play();
    };

    this.playSpeech = function(params, value){
        try{
            console.log('play ', [params, value]);
            var speecher = speechers[params.name];
            if (speecher != null){
                var speech = speecher[value];
                if (speech != null){
                    if (speech.sound != null){
                        speech.sound.play();
                    }
                }
            }
        }catch (e) {
            console.log('speech cannot be played', e);
        }
    };

    this.load = function(){
        if (!loaded){
            for (var i in audios){
                audios[i].load();
            }
            for (var i in speechers){
                for (var j in speechers[i]){
                    speechers[i][j].sound = new sound('audio/' + i + '/'+speechers[i][j].audio);
                    speechers[i][j].sound.load();
                }
            }
            loaded = true;
            console.log('speechers loaded', speechers);
        }
    }

}
function TolucaWS(handler, username){
    var connection = null;

    var readyStateConstants = {
        'CONNECTING': 0,
        'OPEN': 1,
        'CLOSING': 2,
        'CLOSED': 3,
        'RECONNECT_ABORTED': 4
    };

    var statusCode = {
        '1001': 'WEB_APP_IS_CLOSING'
    };


    this.connect = function(){
        connection = new WebSocket(URL + '?' + username);
        console.log('connection=',connection);

        connection.onopen = function(event){
            PRINCIPAL = {username:username, id: username};
            console.log('connection opened', event);
            //connection.send(JSON.stringify(obj));
            handler.ready();
        };
        connection.onmessage = function(event) {
            try{
                handler.onmessage(JSON.parse(event.data));
            }catch (e) {
                console.log('error reading message', e);
            }
        };
        connection.onerror = function(event){
            console.log('onerror', event);
        };
        connection.onclose = function(event){
            console.log('status', statusCode[event.code]);
            handler.onerror(event);
        };

        this.sendMessage = function(event){
            connection.send(JSON.stringify(event));
        };
        console.log('connection is ok');
    }
}
function TolucaClient(render, username){
    var $this = this;
    var ws = new TolucaWS(this, username);

    this.ready = function(){
        $this.getRooms();
    };

    //Events

    this.onmessage = function(obj){
        if (obj.type == "COMMAND_RESPONSE"){
            $this.commandResponse(obj.data);
        }
        else if (obj.type == "TRUCO_ROOM_EVENT"){
            $this.trucoRoomEvent(obj.data);
        }
        else if (obj.type == "TRUCO_TABLE_EVENT"){
            $this.trucoTableEvent(obj.data);
        }
        else if (obj.type == "TRUCO_GAME_EVENT"){
            $this.trucoGameEvent(obj.data);
        }
        else{
            console.log('message not implemented', obj);
        }
    };
    this.onerror = function(event){
        // Request Reconnect
        $this.connectionClosed(event);
    }

    this.commandResponse = function(data){
        if (data.eventName == 'ROOMS_FOUND'){
            $this.roomsFound(data.rooms);
        }
        else if (data.eventName == 'ROOM_USER_JOINED'){
            $this.roomFound(data.room);
        }
        else if (data.eventName == 'USER_LEFT_TABLE'){
            $this.currentUserLeftTable(data.table);
        }
        else {
            console.log('command not implemented', data);
        }
    };
    this.trucoRoomEvent = function(data){
        if (data.eventName == 'ROOM_TABLE_USER_JOINED'){
            $this.roomTableUserJoined(data);
        }
        else if (data.eventName == 'ROOM_TABLE_CREATED'){
            $this.tableCreated(data.table);
        }
        else if (data.eventName == 'ROOM_TABLE_DESTROYED'){
            $this.tableDestroyed(data.table);
        }
        else if (data.eventName == 'ROOM_USER_JOINED') {
            $this.roomUserJoined(data.roomId, data.user);
        }
        else if (data.eventName == 'USER_LEFT_ROOM'){
                $this.userLeftRoom(data);
        }
        else if (data.eventName == 'TABLE_POSITION_SETTED'){
            $this.tablePositionSetted({user: data.user, table: data.table});
        }
        else {
            console.log('trucoRoomEvent not implemented', data);
        }
    };
    this.trucoTableEvent = function(data){
        if (data.eventName == 'TABLE_POSITION_SETTED'){
            $this.tablePositionSetted(data);
        }
        else if (data.eventName == 'ROOM_TABLE_STATUS_UPDATED'){
            $this.tableStatusUpdated(data);
        }
        else {
            console.log('trucoTableEvent not implemented', data);
        }
    };
    this.trucoGameEvent = function(event){
        if (event.eventName == 'PLAY_REQUEST'){
            $this.playRequested(event);
        }
        else if (event.eventName == 'HAND_ENDED'){
            $this.handEnded(event);
        }
        else if (event.eventName == 'GAME_STARTED'){
            $this.gameStarted(event);
        }
        else if (event.eventName == 'GIVING_CARDS'){
            $this.receivingCards(event);
        }
        else if (event.eventName == 'HAND_STARTED'){
            $this.handStarted(event);
        }
        else if (event.eventName == 'GAME_ENDED'){
            $this.gameEnded(event);
        }
        else if (event.eventName == 'RECONNECT_GAME'){
            $this.reconnectGame(event);
        }
        else {
            $this.playEvent(event);
        }
    };

    this.connectionClosed = function(event){
        render.connectionClosed(event);
    };

    this.roomsFound = function(rooms){
        render.updateRooms(rooms);
    };
    this.roomFound = function(rooms){
        render.updateRoom(rooms);
    };

    this.currentUserLeftTable = function(table){
        render.currentUserLeftTable(table);
    };

    this.tableCreated = function(table){
        render.tableCreated(table);
    };

    this.tableDestroyed = function(table){
        render.tableDestroyed(table);
    };

    this.roomUserJoined = function(roomId, user){
        render.roomUserJoined(roomId, user);
    };

    this.userLeftRoom = function(data){
        render.userLeftRoom(data.room.id, data.user);
    };

    this.roomTableUserJoined = function(data){
        render.roomTableUserJoined(data);
    };
    // this.roomTableUserJoined = function(data){
    //     render.roomTableUserJoined(data);
    // };

    // Table Events
    this.tablePositionSetted = function(data){
        render.tablePositionSetted(data);
    };

    this.tableStatusUpdated = function(data){
        render.tableStatusUpdated(data.table.roomId, data.table);
    };

    // Game Event
    this.playRequested = function(event){
        render.playRequested(event);
    };

    this.playEvent = function(event){
        render.playEvent(event);
    };

    this.handEnded = function(data){
        render.handEnded(data);
    };

    this.gameEnded = function(data){
        render.gameEnded(data);
    };

    this.reconnectGame = function(data){
        render.reconnectGame(data);
    };

    this.gameStarted = function(data){
        render.gameStarted(data);
    };

    this.receivingCards = function(event){
        render.receivingCards(event);
    };

    this.handStarted = function(event){
        render.handStarted(event);
    };






    //Commans;
    this.getRooms = function(){
        ws.sendMessage({
            "command":"get_rooms"
        });
    };

    this.joinRoom = function(roomId){
        ws.sendMessage({
            "command":"join_room",
            "data" : {
                "roomId" : roomId
            }
        });
    };

    this.createTable = function(roomId){
        ws.sendMessage({
            "command":"create_room_table",
            "data" : {
                "roomId" : roomId,
                "points" : 30
            }
        });

    };

    this.joinRoomTable = function(roomId, tableId){
        ws.sendMessage({
            "command":"join_room_table",
            "data" : {
                "roomId" : roomId,
                "tableId" : tableId,
            }
        });
    };

    this.leaveRoomTable = function(roomId, tableId){
        ws.sendMessage({
            "command":"leave_room_table",
            "data" : {
                "roomId" : roomId,
                "tableId" : tableId,
            }
        });
    };



    this.setTablePosition = function(roomId, tableId,position){
        ws.sendMessage({
            "command":"set_table_position",
            "data" : {
                "roomId" : roomId,
                "tableId" : tableId,
                "position" : position,
            }
        });
    };


    this.startGame = function(roomId, tableId){
        ws.sendMessage({
            "command":"start_game",
            "data" : {
                "roomId" : roomId,
                "tableId" : tableId
            }
        });
    };

    this.startHand = function(roomId, tableId){
        ws.sendMessage({
            "command":"start_hand",
            "data" : {
                "roomId" : roomId,
                "tableId" : tableId
            }
        });
    };

    this.play = function(roomId, tableId, data){
        ws.sendMessage({
            "command":"play",
            "data" : {
                "roomId" : roomId,
                "tableId" : tableId,
                "type" : data.type,
                "card" : data.card,
                "envido" : data.envido
            }
        });

    };


    ws.connect();


}