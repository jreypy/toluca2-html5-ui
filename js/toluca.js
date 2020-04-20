function TolucaWS(handler){
    var connection = null;

    var readyStateConstants = {
        'CONNECTING': 0,
        'OPEN': 1,
        'CLOSING': 2,
        'CLOSED': 3,
        'RECONNECT_ABORTED': 4
    };

    this.connect = function(){
        connection = new WebSocket('ws://localhost:8050/ws?amigo');
        console.log('connection=',connection);

        connection.onopen = function(event){
            PRINCIPAL = {username:'amigo', id: 'amigo'};
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
function TolucaClient(render){
    var $this = this;
    var ws = new TolucaWS(this);

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
        else if (data.eventName == 'ROOM_USER_JOINED'){
            $this.roomUserJoined(data.user);
        }else if (data.eventName == 'TABLE_POSITION_SETTED'){
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
        else {
            console.log('trucoTableEvent not implemented', data);
        }
    };
    this.trucoGameEvent = function(event){
        if (event.eventName == 'GAME_STARTED'){
            $this.gameStarted(event);
        }
        else if (event.eventName == 'GIVING_CARDS'){
            $this.receivingCards(event);
        }
        else {
            console.log('trucoTableEvent not implemented', event);
        }
    };
    this.roomsFound = function(rooms){
        render.updateRooms(rooms);
    };
    this.roomFound = function(rooms){
        render.updateRoom(rooms);
    };
    this.tableCreated = function(table){
        render.tableCreated(table);
    };
    this.roomUserJoined = function(user){
        render.roomUserJoined(user);
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

    this.gameStarted = function(data){
        render.gameStarted(data);
    };

    this.receivingCards = function(event){
        render.receivingCards(event);
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


    this.startGame = function(roomId, tableId,position){
        ws.sendMessage({
            "command":"start_game",
            "data" : {
                "roomId" : roomId,
                "tableId" : tableId
            }
        });
    };


    ws.connect();


}