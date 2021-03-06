var TrucoGamePlay = {
    PLAY_CARD: 'PLAY_CARD'
};

var INITIAL_SIZE = 6;

TableScorerRenderer = function (container, obj) {
    var g = getG();
    var points = getG();

    var text = createText({x: 110, y: 12}, obj.teamName, 'yellow');
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.setAttributeNS(null, 'dominant-baseline', 'middle');


    var rec = getRect(0, 0, 200, 90, 'black');

    g.appendChild(rec);
    g.appendChild(text);
    g.appendChild(points);
    $(text).addClass('score');

    g.setAttribute('transform', ' translate(' + (obj.index * (H + 100) + 10) + ',' + 20 + ')');
    container.appendChild(g);


    function addLines(box, index) {
        var conf = [
            'M ' + '15 25 15 25',
            'M ' + '15 25 15 45',
            'M ' + '15 45 35 45',
            'M ' + '35 45 35 25',
            'M ' + '35 25 15 25',
            'M ' + '15 25 35 45',
        ]



        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttributeNS(null, "d", conf[index]);
        path.setAttribute('stroke', 'yellow');
        path.setAttribute('stroke-width', '2');
        box.appendChild(path);


    }
    function addBox(index, size) {
        var box = getG();
        for (var i=0; i<=size; i++){
            addLines(box, i);
        }
        box.setAttribute('transform', ' translate(' + 25*index + ',' + 0 + ')');
        $(box).addClass('scorer-box');
        g.appendChild(box);
    }
    this.update = function (points) {
        $(g).find('.scorer-box').remove();

        var count = parseInt(points / 5);
        var lines = points % 5;

        for (var i=0; i<count; i++){
            addBox(i, 5);
        }
        addBox(i, lines);


    };
    this.update();

    // box.setAttribute('transform',  ' translate('+(i*30+30)+','+0+')');


};
trucoTableRender = function (context, toluca) {
    console.log('creating trucoTableRender', [context, toluca]);
    var $this = this;
    $this.options = {};

    console.log('render table', context.table);

    var container = document.getElementById('table-screen');
    var tableContainer = $('.container-table');

    var tableScorer = [{
        teamName: 'Nos',
        renderer: null,
        index: 0
    }, {
        teamName: 'Ellos',
        renderer: null,
        index: 1
    }
    ];


    var table = context.table;
    this.showStartButton = table.owner.username == PRINCIPAL.username;


    this.getPlayer = function (playerId) {
        for (var i in $this.players) {
            if ($this.players[i].user.id == playerId) {
                return $this.players[i];
            }
        }
        return null;
    };


    this.getTable = function () {
        return table;
    };

    this.addComponent = function (comp) {
        $(container).append($(comp));
    };

    this.getContainer = function () {
        return container;
    };

    this.render = function (size, users, playerIndex) {


        if ($this.tableImage != null) {
            $($this.tableImage).remove();
        }
        $(container).find('.table').remove();
        $(container).find('.chair').remove();
        $(container).find('.player').remove();
        $(container).find('.card').remove();
        $(container).find('.path').remove();
        $(container).find('.player-circle').remove();

        var tableImage = {
            '2': function () {

                var circle = getCircle(H, K, 190, WOODEN);
                var circle2 = getCircle(H, K, 180, TABLE_COLOR);

                container.appendChild(circle);
                container.appendChild(circle2);
                return circle;
            },
            '4': function () {
                H = H + 100;
                var circle = getCircle(H, K, 190, WOODEN);
                var circle2 = getCircle(H, K, 180, TABLE_COLOR);

                container.appendChild(circle);
                container.appendChild(circle2);
                return circle;
            },
            '6': function () {
                H = H + 100;
                var circle = getCircle(H, K, 190, WOODEN);
                var circle2 = getCircle(H, K, 180, TABLE_COLOR);

                container.appendChild(circle);
                container.appendChild(circle2);
                return circle;
            }
        }
        var pos = {
            '2': [
                [0, -240, 0],
                [0, 240, 180],
            ],
            '4': [
                [100, -240, 0],
                [340, 0, 270],
                [100, 240, 180],
                [-140, 0, 90]
            ],
            '6': [
                [100, -240, 0],
                [340, -150, -65],
                [340, 150, -115],
                [100, 240, 180],
                [-140, 150, 115],
                [-140, -150, 65]
            ]
        };

        var dis = pos[size];
        var players = [];


        /*
                    <rect x="10" y="10"
                          width="200" height="50"
                          rx="15" ry="15" fill="gray">
                    </rect>
                    <text x="20" y="50">INICIAR</text>
                </g>*/

        // var text = addText('Iniciar');
        // text.setAttributeNS(null, 'x',10);
        // text.setAttributeNS(null, 'y',10);
        // text.setAttributeNS(null, 'width',200);
        // text.setAttributeNS(null, 'height',50);
        // text.setAttributeNS(null, 'rx',10);
        // text.setAttributeNS(null, 'ry',10);
        // text.setAttributeNS(null, 'ry',10);

        $this.players = [];
        $this.playRequestPlayer = null;

        $this.tableImage = tableImage[size]();

        tableScorer[0].renderer = new TableScorerRenderer(container, tableScorer[0]);
        tableScorer[1].renderer = new TableScorerRenderer(container, tableScorer[1]);

        $($this.tableImage).addClass('table');


        var textTable1 = createText({x: H - 150, y: K - 20}, '1. Seleccione una silla haciendo click', 'yellow');
        var textTable2 = createText({
            x: H - 150,
            y: K + 20
        }, '2. Los equipos deben tener la misma cantidad de Jugadores para ser Iniciado', 'yellow');

        container.appendChild(textTable1);
        container.appendChild(textTable2);

        $(textTable1).addClass('new-table-message');
        $(textTable2).addClass('new-table-message');

        for (var i = 0; i < dis.length; i++) {

            var point1 = {x: dis[i][0], y: dis[i][1]};
            var point2 = {x: 0, y: 0};


            var playerManager = new PlayerManager(this, i, point1, dis[i][2], users[i], playerIndex);
            $this.players[i] = playerManager;
            //container.appendChild(playerManager.getComponent());
            playerManager.paint();


            // path.setAttribute('transform',  ' translate('+H+','+K+')');


        }
        // paths
    };

    this.cleanCards = function () {
        for (i in $this.players) {
            $this.players[i].cleanCards();
        }
    };

    this.roomTableUserJoined = function (params) {
        console.log('roomTableUserJoined setting position ', params);
        console.log('reindex', $this.players)
        console.log('status', $this.status)
        if ($this.status != 'IN_PROGRESS') {
            for (var i in params.table.positions) {
                if ($this.players[i] != null) {
                    $this.players[i].setPlayer(params.table.positions[i], params.index == i);
                }
            }
        } else {
            console.log('dont do anything status is IN PROGRESS');
        }

    };

    this.tablePositionSetted = function (params) {
        console.log('setting position ', params);
        for (var i in params.table.positions) {
            $this.players[i].setPlayer(params.table.positions[i], params.index == i);
        }
        tolucaFx.positionSettedEffect();
    };

    this.playRequested = function (event) {
        $this.options = {};
        $this.playRequestPlayer = event.player;

        if (event.player.id == PRINCIPAL.id) {
            $this.setupButtons(event.options);
        } else {
            $this.setupButtons([]);
        }
        $this.getPlayer(event.player.id).playRequest(event);

        setTimeout(function () {
            tolucaFx.playRequestEffect();
        }, 2500);

    };

    this.playEvent = function (event) {
        if (event == null) {
            console.log('**** Error ****', event);
        }
        var player = $this.getPlayer(event.player.id)
        console.log('******** player [' + player.user + ' plays ', event);
        player.playEvent(event);

    };

    this.handEnded = function (event) {
        console.log('handended', event);
        //Hand ended and be ready ???
        // clean score
        // $(tableContainer).find('.score').find('p').remove();
        $(tableContainer).find('.messages').find('p').remove();

        // var $message = $('<p>' + event.game.team1.name + ': ' + event.game.team1.points + ' ' + event.game.team2.name + ': ' + event.game.team2.points + '</p>');
        // $(tableContainer).find('.score').append($message);

        console.log('update score', event);

        tableScorer[0].renderer.update(event.game.team1.points);
        tableScorer[1].renderer.update(event.game.team2.points);

        for (var i in event.messages) {
            var $message = $('<p>' + event.messages[i].text + '</p>');
            $(tableContainer).find('.messages').append($message);
        }
        $(container).find('.player-circle').addClass('waiting');
        $this.setupButtons([{
            type: 'COTINUAR_MANO',
            text: 'Continuar'
        }]);

    };

    this.gameEnded = function (event) {
        alert('Partido Finalizado');
        $this.setupButtons([]);
    };

    this.reconnectGame = function (event) {
        var text = null;
        var playRequest = null;

        for (var i in event.events) {
            var e = event.events[i];
            if (e.eventName == 'GAME_STARTED') {
                $this.gameStarted(e);
            }
            else if (e.eventName == 'HAND_STARTED') {
                $this.handStarted(e);
            }
            else if (e.eventName == 'GIVING_CARDS') {
                $this.receivingCards(e);
            }
            else if (e.eventName == 'PLAY_CARD') {
                $this.playEvent(e);
            }
            else if (e.eventName == 'PLAY_REQUEST') {
                playRequest = e;
            }
            else if (e.eventName == 'HAND_ENDED') {
                text = null;
                playRequest = null;
                $this.handEnded(e);
            }
            else {
                text = e;
            }
        }
        if (text != null)
            $this.playEvent(text);

        if (playRequest != null)
            $this.playRequested(playRequest);

    }

    this.gameStarted = function (event) {

        $this.size = event.game.size;
        // Rotate
        var move = 0;
        var len = event.game.positions.length;

        for (var i = 0; i < len; i++) {
            if (event.game.positions[i].id == PRINCIPAL.id) {
                move = i;
            }
        }
        if (move > 0) {
            event.game.positions = rotateArray(event.game.positions, move);
        }

        $this.render($this.size, event.game.positions, move);
        console.log('rotate [' + move + ']move [' + ((i + len - move) % len) + ' to [' + i + ']');
    };

    function rotateArray(array, move) {
        var array1 = array.slice(0, move);
        var arrat2 = array.slice(move);
        var result = arrat2.concat(array1);

        if (move % 2 == 1) {
            var teamName = tableScorer[0].teamName;
            tableScorer[0].teamName = tableScorer[1].teamName;
            tableScorer[1].teamName = teamName;
        }
        return result;
    }


    this.handStarted = function (event) {
        $(tableContainer).find('.messages').find('p').remove();
        // update score

        console.log('update score', event);
        tableScorer[0].renderer.update(event.game.team1.points);
        tableScorer[1].renderer.update(event.game.team2.points);
    };


    this.receivingCards = function (event) {
        if (event.player.id == PRINCIPAL.id) {
            $this.cleanCards();
            for (i in $this.players) {
                console.log('giving cards to user ', [i, event.cards])
                if ($this.players[i].user.id == PRINCIPAL.id) {
                    $this.players[i].receivingCards(event.player, event.cards);
                    tolucaFx.receivingCardsEffect();
                } else {
                    $this.players[i].receivingCards(event.player, [{}, {}, {}]);
                }

            }
        }
    };

    this.size = INITIAL_SIZE;
    this.players = [];
    this.render(this.size, [null, null, null, null, null, null], 0);


    this.setStatus = function (status) {
        $this.status = status;
        $(container).removeClass('table-status-new');
        $(container).addClass('table-status-' + ($this.status + '').toLowerCase());
    };

    this.setupButtons = function (options) {
        console.log('setup buttons', options);
        // Remove Buttons
        $('#buttons').find('.btn').remove();
        var index = 0;

        for (var i in options) {
            $this.options[options[i].type] = options[i];
            if (options[i].text != null) {
                new Button(index++, options[i].text + '', 'play-btn', function (param) {
                    $this.playOption(param)
                }, options[i]);
            }
        }

        if ($this.showStartButton && $this.status != 'IN_PROGRESS') {
            new Button(index++, 'Iniciar', 'play-btn', function (param) {
                if ($this.status != 'IN_PROGRESS')
                    $this.startGame();
            }, {});

            // new Button(index++, 'Cancelar', function (param) {
            //     render.gotoRoom();
            // }, {});
        }

        new Button(index++, 'Salir', 'exit-btn', function (param) {
            localStorage.removeItem('table-selected');
            render.gotoRoom();
            toluca.leaveRoomTable(context.table.roomId, context.table.id);
        }, {});

    }

    this.setupButtons([]);


    this.startGame = function () {
        console.log('request start game', [context.table.roomId, context.table.id]);
        toluca.startGame(context.table.roomId, context.table.id)

    };

    this.startHand = function () {
        console.log('request start hand', [context.table.roomId, context.table.id]);
        toluca.startHand(context.table.roomId, context.table.id);
    };

    this.playCard = function (user, data) {
        // Remove Buttons
        if ($this.options[TrucoGamePlay.PLAY_CARD] != null) {
            return $this.play({
                type: TrucoGamePlay.PLAY_CARD,
                card: {
                    type: data.type,
                    value: data.value
                }
            });
        }
        // Cant play now
        return false;

    };

    this.playOption = function (option) {
        console.log('play option', option);
        // Remove Buttons
        if (option.type == 'COTINUAR_MANO') {
            $this.setupButtons([]);
            $this.startHand();
        } else {
            $('#buttons').find('.btn').remove();
            $this.play({
                type: option.type,
                envido: option.envido
            });
        }
    };

    this.play = function (data) {
        try {
            tolucaFx.load();
        } catch (e) {
            console.log(e);
        }
        var playRequestPlayer = $this.playRequestPlayer;

        if (playRequestPlayer != null && playRequestPlayer.id == PRINCIPAL.id) {
            toluca.play(context.table.roomId, context.table.id, data);
            $('#buttons').find('.btn').remove();
            $(container).find('.player-circle').removeClass('waiting');
            $this.playRequestPlayer = null;
            return true;
        } else {
            alert('NO es tu Turno, aguarde un momento');
        }
        return false;
    };

};