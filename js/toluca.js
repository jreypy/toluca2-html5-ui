function TolucaWS(handler, username){
    var connection = null;

    var readyStateConstants = {
        'CONNECTING': 0,
        'OPEN': 1,
        'CLOSING': 2,
        'CLOSED': 3,
        'RECONNECT_ABORTED': 4
    };

    this.connect = function(){
        connection = new WebSocket('ws://localhost:8050/ws?' + username);
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
        else {
            $this.playEvent(event);
        }
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
    }
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