var TrucoGamePlay = {
    PLAY_CARD: 'PLAY_CARD'
};

var efectoFinalizado = function (index, event) {
    console.log('efector finalizado [', index);
    console.log(event);
};

trucoTableRender = function (context, toluca) {
    console.log('creating trucoTableRender', [context, toluca]);
    var $this = this;
    $this.options = {};

    console.log('render table', context.table);
    var svgns = "http://www.w3.org/2000/svg";
    var container = document.getElementById('table-screen');
    var tableContainer = $('.container-table');

    var table = context.table;
    this.showStartButton = table.owner.username == PRINCIPAL.username;


    var H = 400;
    var K = 300;
    var RADIO = 40;


    var radious = RADIO;


    var getG = function () {
        var g = document.createElementNS(svgns, 'g');
        g.setAttributeNS(null, 'width', radious * 2);
        g.setAttributeNS(null, 'height', radious * 2);
        // width="200" height="100"
        //circle.setAttribute('transform',  ' translate(400,250)');
        return g;
    };


    var getRect = function (x, y, w, h, color) {

        var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        element.setAttributeNS(null, 'x', x);
        element.setAttributeNS(null, 'y', y);
        element.setAttributeNS(null, 'width', w);
        element.setAttributeNS(null, 'height', h);
        element.setAttributeNS(null, 'rx', 15);
        element.setAttributeNS(null, 'ry', 15);
        element.setAttributeNS(null, 'fill', color);


        return element;
    };


    var createText = function (position, text, color) {
        var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        element.setAttributeNS(null, 'x', position.x);
        element.setAttributeNS(null, 'y', position.y);
        element.setAttributeNS(null, 'fill', color);
        // element.setAttributeNS(null, 'dominant-baseline', 'middle');
        // element.setAttributeNS(null, 'text-anchor', 'middle');
        var txt = document.createTextNode(text);
        element.appendChild(txt);
        $(element).addClass('table-text');
        return element;
    };
    var addText = function (text) {
        return createText({x: 1, y: RADIO}, text, 'yellow');
    };

    var Button = function (index, text, clazz, action, param) {
        var rect = getRect(0, 0, 100, 50, 'blue');
        var g = getG();
        var txt = addText(text);
        txt.setAttributeNS(null, 'x', 50);
        txt.setAttributeNS(null, 'y', 25);
        txt.setAttributeNS(null, 'text-anchor', 'middle');
        txt.setAttributeNS(null, 'dominant-baseline', 'middle');


        g.setAttributeNS(null, 'width', 200);
        g.setAttributeNS(null, 'height', 50);


        g.appendChild(rect);
        g.appendChild(txt);

        $(rect).addClass('selectable');
        $(g).addClass('selectable');
        $(g).addClass(clazz);
        $(g).addClass('btn');


        var translate = 'translate(' + (index * 110 + 10) + ',0)'
        g.setAttribute('transform', translate)

        $('#buttons').get(0).appendChild(g);


        g.addEventListener("click", function () {
            console.log('execute action', action);
            action(param);
        });


    };

    var getCircle = function (x, y, r, color) {
        var circle = document.createElementNS(svgns, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', r);
        if (color != null) {
            circle.setAttributeNS(null, 'fill', color);
        }
        //circle.setAttribute('transform',  ' translate(400,250)');
        return circle;
    };
    var getImage = function (imageName, point) {
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        // svgimg.setAttributeNS(null,'height','200');
        // svgimg.setAttributeNS(null,'width','200');
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', imageName);
        svgimg.setAttributeNS(null, 'x', point.x);
        svgimg.setAttributeNS(null, 'y', point.y);
        //svgimg.setAttribute('transform',  ' translate('+point.x+','+point.y+')');
        // svgimg.setAttributeNS(null,'height','100');
        // svgimg.setAttribute('transform',  ' translate('+H+','+K+')');
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        $('svg').append(svgimg);
        return svgimg;
    }
    var getDorsoImage = function (point) {
        return getImage('images/cards/dorso.gif', point);
    };
    var getCardImage = function (type, value, points) {
        // Append image to SVG
        return getImage('images/cards/' + (type + '').toLowerCase() + '/' + value + '.gif', points);
    };

    var SpeechBallon = function (point, rotation) {

        var g = getG();

        var ballon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        ballon.setAttribute('id', 'speech_ballon');
        //var d = 'M 20 20 -50 -100 100 0Z';
        var d = 'M 40 20 -30 -200 30 -200Z';
        ballon.setAttributeNS(null, "d", d);
        ballon.setAttributeNS(null, "fill", "blue");
        ballon.setAttributeNS(null, "fill-rule", "evenodd");
        ballon.setAttributeNS(null, "clip-rule", "evenodd");

        //translate('+(point.x-297)+','+(point.y-H+277)+')

        $(g).append(ballon);
        var circle = getCircle(40, -220, 180, 'blue');
        $(g).append(circle);

        var rotationText = 180 - rotation;


        var text = createText({x: 40, y: -220}, 'Hola!', 'yellow');

        g.setAttributeNS(null, "transform", "rotate (" + (rotation - 180) + ", 20, 20)");
        text.setAttributeNS(null, "transform", "rotate (" + (rotationText) + ", 40, -220)");

        $(g).append(text);
        $(g).addClass('speech-ballon');

        this.show = function (message) {
            $(text).text(message);
            $(g).addClass('show');
            setTimeout(function () {
                $(g).removeClass('show');
            }, 2000)
        }
        this.g = g;

        return this;
    };

    var cardImageUrl = function (type, value) {
        return 'images/cards/' + (type + '').toLowerCase() + '/' + value + '.gif';
    };

    var setCardImage = function (svgimg, type, value) {
        // Append image to SVG
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', cardImageUrl(type, value));
    };


    var CardsManager = function (playerManager, index, circle, x, y, rotation) {
        console.log('creating cards manaager  ', [playerManager, circle, x, y, rotation]);

        var $this = this;
        this.cards = [];
        this.rotation = rotation;

        this.path = function () {


        };
        this.showCard = function (card) {
            console.log('show card', card);
            var index = 0;
            for (var i in $this.cards) {
                if ($this.cards[i].data.type == card.type && $this.cards[i].data.value == card.value) {
                    $this.cards[i].data.type = null;
                    $this.cards[i].data.value = null;
                    $this.cards[i].show(card);
                    return;
                }
                if (!$this.cards[i].data.flipped) {
                    // Show Card no played before
                    index = i;
                }

            }
            console.log('show card', JSON.stringify($this.cards[index].data));
            $this.cards[index].show(card);

        };
        this.card = function (data) {
            console.log('creating card', data);
            var $this = this;
            $this.data = data;
            console.log('add card', data);
            var card = getDorsoImage({x: H + data.x, y: K - data.y});

            this.flip = function () {
                if (data.flipped) {
                    setCardImage(card, data.type, data.value);
                }
            };

            this.play = function () {
                console.log('playing card?', data);
                if (data.type != null && data.value != null) {
                    if (playerManager.playCard({
                        type: data.type,
                        value: data.value
                    })) {
                        console.log('start effect');
                        $this.repaint();
                        tolucaFx.playCardEffect();
                        $(animation).get(0).beginElement();
                    }
                }
                // Play Sound (Wrong)
            };

            this.repaint = function () {
                $(card).remove();
                container.append(card);
            };
            this.remove = function () {
                $(card).remove();
            };

            this.show = function (eventCard) {
                console.log('show card', eventCard);
                if (data.type == null && data.value == null) {
                    card.setAttributeNS('http://www.w3.org/1999/xlink', 'href', cardImageUrl(eventCard.type, eventCard.value));
                    data.flipped = true;
                    data.type = eventCard.type;
                    data.value = eventCard.value;
                    $this.repaint();
                    $(animation).get(0).beginElement();
                }

            };

            // var card = getCircle(H+data.x, K-data.y, 20);
            var $rot = data.num - 1;
            $(card).addClass('selectable');
            // Important! Align
            //+  '
            //
            //+ ' rotate(' + rotation + $rot*30+ ")"
            // + ' rotate(' + rotation + ")" + ' translate('+ (radious * -1 )+','+0+')')
            // card.setAttribute('transform',  ' translate('+ (x)+','+y+')');

            var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
            animation.setAttribute('dur', '1s');
            //animation.setAttribute('begin', 'click');
            animation.setAttribute('begin', 'indefinite');
            animation.setAttribute('repeatCount', '1');
            animation.setAttribute('fill', 'freeze');

            var mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
            mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#path_" + index);

            animation.setAttributeNS(null, "onend", "efectoFinalizado(" + index + ")");

            animation.appendChild(mpath);
            card.appendChild(animation);
            container.append(card);
            // console.log('data', data);
            //' translate('+H+','+K+')  '
            var translate = 'translate(' + (radious * -1) + ',' + 0 + ') '
            var rotate = ' rotate(' + (data.rot + $rot * 20) + ',' + (H + data.x + radious) + ',' + (K - data.y) + ')';
            var transform = translate + ' ' + rotate;
            // console.log('rotation', [data.index,transform]);
            card.setAttribute('transform', transform);

            $(card).addClass('card');

            card.addEventListener("click", function () {
                console.log('flip card');
                $this.play();
            });
            card.addEventListener("mouseover", function () {
                $this.repaint();
                playerManager.repaint();
            });

            this.flip();

        };


        this.addCard = function (playerManager, num, type, value, flipped) {
            // var card = getCardImage('basto', '1', {x:x, y:y});
            console.log('creating card', [playerManager, num, type, value, flipped, rotation]);

            $this.cards.push(new $this.card({
                playerManager: playerManager,
                x: x,
                y: y,
                rot: rotation,
                type: type,
                value: value,
                flipped: flipped,
                index: index,
                num: num
            }));

        };


        this.cleanCards = function () {
            console.log('remove cards from user');
            for (i in $this.cards) {
                $this.cards[i].remove();
            }
        };


    };

    var PlayerManager = function (tableManager, index, point, rotation, user, playerIndex) {
        console.log('playermanager', [tableManager, index, point, rotation, user]);
        var $this = this;
        this.user = user;

        var circle = getCircle(radious, radious, radious);
        $(circle).addClass('free');

        console.log('playerIndex', playerIndex);

        if (index % 2 == playerIndex % 2) {
            $(circle).addClass('team1');
        } else {
            $(circle).addClass('team2');
        }

        var circle2 = getCircle(radious, radious, radious - 8, 'white');

        var g = getG();
        var playerName = 'Player ' + (index + 1);

        var text = addText(playerName);

        text.setAttributeNS(null, 'x', radious);
        text.setAttributeNS(null, 'y', radious);
        text.setAttributeNS(null, 'text-anchor', 'middle');
        text.setAttributeNS(null, 'dominant-baseline', 'middle');


        var translate = 'translate(' + (H + point.x - radious) + ',' + (K - point.y - radious) + ') '
        g.setAttribute('transform', translate)


        this.speechBallon = new SpeechBallon(point, rotation);
        $(g).append(this.speechBallon.g);

        $(g).addClass('selectable');

        $(g).click(function () {
            // unselect / select


            circle.setAttributeNS(null, 'fill', 'gray');
            if (table.status == 'NEW') {
                toluca.setTablePosition(table.roomId, context.table.id, index);
            } else {
                console.log('position no selected', [index, context.table]);
            }
        });


        this.setPlayer = function (player, fire) {
            $this.player = player;
            // $(g).find('text').remove();
            $(circle).addClass('free');

            if (player == null) {
                circle.setAttributeNS(null, 'fill', 'gray');
                // var text = addText('Player ' + (index + 1));
                // text.innerText = 'Player '+ (index+1);
                $(text).html('Libre');
                // g.appendChild(text);
            }
            else if (fire) {
                // var text = addText(player.username);
                $(text).html(player.username);
                // g.appendChild(text);
            } else {
                // var text = addText(player.username);
                // text.innerText = player.username;
                $(text).html(player.username);
                // g.appendChild(text);
            }

        };
        this.cleanCards = function () {
            console.log('remove cards from user [' + $this.user.id + ']');
            cardsManager.cleanCards();
        };
        this.receivingCards = function (user, cards) {
            console.log('playermanger receiving cards', [$this.user.id, cards, rotation])

            for (var i in cards) {
                cardsManager.addCard(this, i, cards[i].type, cards[i].value, PRINCIPAL.id == $this.user.id, rotation);
            }

            container.appendChild(g);
        };

        this.playRequest = function (event) {
            console.log('play requested');
            $(container).find('.waiting').removeClass('waiting');
            $(circle).addClass('waiting');
        };

        this.playEvent = function (event) {
            console.log('== play event', event);
            if (event.eventName == TrucoGamePlay.PLAY_CARD) {
                tolucaFx.playCardEffect();
                cardsManager.showCard(event.card);
            }
            else if (event.eventName == '') {

            }
            else if (event.text != null) {
                //alert($this.user.username + ' dice: ' + event.text);
                $this.speechBallon.show(event.text);
            } else {
                console.log('another play', event);
            }
        };

        this.playCard = function (data) {
            console.log('playing card', [$this.user.id, PRINCIPAL.id])
            if ($this.user.id == PRINCIPAL.id)
                return tableManager.playCard($this.user, data);
            return false;
        };

        this.repaint = function () {
            container.appendChild(g);
        };

        var cardsManager = new CardsManager($this, index, {}, point.x, point.y, rotation);


        g.appendChild(circle);
        g.appendChild(circle2);
        g.appendChild(text);


        $(g).addClass('player');
        $(circle).addClass('player-circle');


        container.appendChild(g);

        if (user != null) {
            $(text).html(user.username);
        }

        return this;

    };


    this.getPlayer = function (playerId) {
        for (var i in $this.players) {
            if ($this.players[i].user.id == playerId) {
                return $this.players[i];
            }
        }
        return null;
    }


    if (table.status == 'NEW') {
        // Render Table
    }


    this.render = function (size, users, playerIndex) {
        $(container).find('.player').remove();
        $(container).find('.card').remove();
        $(container).find('.path').remove();
        var pos = {
            '2': [
                [0, -240, 180],
                [0, 240, 0],
            ],
            '4': [
                [0, -200, 180],
                [200, 0, 90],
                [0, 200, 0],
                [-200, 0, 270]
            ],
            '6': [
                [0, -250, 180],
                [340, -150, 115],
                [340, 150, 65],
                [0, 250, 0],
                [-340, 150, -65],
                [-340, -150, -115]
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

        for (var i = 0; i < dis.length; i++) {

            var point1 = {x: dis[i][0], y: dis[i][1]};
            var point2 = {x: 0, y: 0};


            $this.players[i] = new PlayerManager(this, i, point1, dis[i][2], users[i], playerIndex);

            // User Path
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('id', 'path_' + i);
            var d = 'M ' + '0 , 0' + ' L ' + (point2.x - point1.x - 100) + ' ' + (point2.y + point1.y);
            // console.log('d', d);
            path.setAttributeNS(null, "d", d);
            // // newLine.setAttribute('c', );

            // path.setAttribute('stroke', 'red');
            // path.setAttribute('stroke-width', '2');

            // path.setAttribute('transform',  ' translate('+H+','+K+')');
            $(path).addClass('path');
            $(container).append(path);
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
        tolucaFx.playRequestEffect();
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
        $(tableContainer).find('.messages').find('p').remove();
        var $message = $('<p>' + event.game.team1.name + ': ' + event.game.team1.points + ' ' + event.game.team2.name + ': ' + event.game.team2.points + '</p>');
        $(tableContainer).find('.messages').append($message);

        for (var i in event.messages) {
            var $message = $('<p>' + event.messages[i].text + '</p>');
            $(tableContainer).find('.messages').append($message);
        }

        $this.setupButtons([{
            type:'COTINUAR_MANO',
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
        return result;
    }


    this.handStarted = function (event) {
        $this.cleanCards();
    };


    this.receivingCards = function (event) {
        if (event.player.id == PRINCIPAL.id) {
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

    this.size = 6;
    this.players = [];
    this.render(this.size, [null, null, null, null, null, null], 0);


    this.setStatus = function (status) {
        $this.status = status;
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
        if (option.type == 'COTINUAR_MANO'){
            $this.setupButtons([]);
            $this.startHand();
        }else{
            $('#buttons').find('.btn').remove();
            $this.play({
                type: option.type,
                envido: option.envido
            });
        }


    };

    this.play = function (data) {
        var playRequestPlayer = $this.playRequestPlayer;
        if (playRequestPlayer != null && playRequestPlayer.id == PRINCIPAL.id) {
            toluca.play(context.table.roomId, context.table.id, data);
            $('#buttons').find('.btn').remove();
            $this.playRequestPlayer = null;
            return true;
        } else {
            alert('NO es tu Turno, aguarde un momento');
        }
        return false;
    };

};