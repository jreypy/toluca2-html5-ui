var efectoFinalizado = function (index, event) {
    console.log('efector finalizado [', index);
    console.log(event);
};

trucoTableRender = function (context, toluca) {
    console.log('creating trucoTableRender', [context, toluca]);
    var $this = this;

    console.log('render table', context.table);
    var svgns = "http://www.w3.org/2000/svg";
    var container = document.getElementById('table-screen');

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
    }
    var addText = function (text) {
        var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        element.setAttributeNS(null, 'x', 1);
        element.setAttributeNS(null, 'y', RADIO);
        element.setAttributeNS(null, 'fill', 'yellow');
        // element.setAttributeNS(null, 'dominant-baseline', 'middle');
        // element.setAttributeNS(null, 'text-anchor', 'middle');
        var txt = document.createTextNode(text);
        element.appendChild(txt);
        $(element).addClass('table-text');
        return element;
    };

    var Button = function (index, text, action) {
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


        var translate = 'translate(' + (index * 110 + 10) + ',0)'
        g.setAttribute('transform', translate)

        $('#buttons').get(0).appendChild(g);


        g.addEventListener("click", function () {
            action();
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
        return getImage('images/cards/' + type + '/' + value + '.gif', points);
    };
    var setCardImage = function (svgimg, type, value) {
        // Append image to SVG
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', 'images/cards/' + type + '/' + value + '.gif');
    };


    var CardsManager = function (index, circle, x, y, rotation) {
        var $this = this;
        this.cards = [];
        this.rotation = rotation;

        this.path = function () {


        };

        this.card = function (data) {

            var $this = this;
            $this.data = data;

            console.log('add card', data);

            this.flip = function () {
                if (data.flipped) {
                    setCardImage(card, data.type, data.value);
                }
            };

            this.play = function () {
                // console.log('play!'+index);
                //"rotate("+(data.rotation) +", "+data.x+ ", "+ data.y+")"
                // data.el.setAttribute("transform",  + ' translate('+(-1*x)+','+(-1*y)+' )');
                $(animation).get(0).beginElement();
            }

            var card = getDorsoImage({x: H + data.x, y: K - data.y});
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
            animation.setAttribute('begin', 'click');
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

            this.flip();

        };


        this.addCard = function (num, type, value, flipped) {
            // var card = getCardImage('basto', '1', {x:x, y:y});
            console.log('creating card', [num, type, value, flipped]);

            $this.cards.push(new $this.card({
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


    };

    var PlayerManager = function (index, point, rotation, user) {
        var $this = this;
        this.user = user;

        var circle = getCircle(radious, radious, radious);
        $(circle).addClass('free');
        if (index % 2 == 0) {
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

        this.receivingCards = function (user, cards) {
            console.log('playermanger receiving cards', [$this.user.id, cards])
            for (var i in cards) {
                cardsManager.addCard(i, cards[i].type, cards[i].value, PRINCIPAL.id == $this.user.id);
            }
            container.appendChild(g);
        };
        this.playRequest = function(event){
            console.log('play requested');
            $(circle).addClass('waiting');
        };

        var cardsManager = new CardsManager(index, {}, point.x, point.y, rotation);


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


    this.getPlayer = function(playerId){
        for (var i in $this.players){
            if ($this.players[i].user.id == playerId){
                return $this.players[i];
            }
        }
        return null;
    }


    if (table.status == 'NEW') {
        // Render Table
    }


    this.render = function (size, users) {
        $(container).find('.player').remove();
        $(container).find('.card').remove();
        $(container).find('.path').remove();
        var pos = {
            '2': [
                [0, -240, 180],
                [0, 240, 0],
            ],
            '4': [
                [0, -200],
                [200, 0],
                [0, 200],
                [-200, 0]
            ],
            '6': [
                [0, -250, 180],
                [340, -150, 180 - 65],
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
        for (var i = 0; i < dis.length; i++) {

            var point1 = {x: dis[i][0], y: dis[i][1]};
            var point2 = {x: 0, y: 0};


            $this.players[i] = new PlayerManager(i, point1, dis[i][2], users[i]);

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
    this.tablePositionSetted = function (params) {
        console.log('setting position ', params);
        for (var i in params.table.positions) {

            $this.players[i].setPlayer(params.table.positions[i], params.index == i);
        }
    };

    this.playRequested = function(event){
        $this.getPlayer(event.player.id).playRequest(event);
    };

    this.gameStarted = function (event) {
        $this.size = event.game.size;
        $this.render($this.size, event.game.positions);
    };

    this.receivingCards = function (event) {
        if (event.player.id == PRINCIPAL.id) {
            for (i in $this.players) {
                console.log('giving cards to user ', [i, event.cards])
                if ($this.players[i].user.id == PRINCIPAL.id) {
                    $this.players[i].receivingCards(event.player, event.cards);
                } else {
                    $this.players[i].receivingCards(event.player, [{}, {}, {}]);
                }
            }
        }
    };

    this.size = 6;
    this.players = [];
    this.render(this.size, [null, null, null, null, null, null]);


    this.setupButtons = function () {
        var index = 0;
        if ($this.showStartButton) {
            new Button(index++, 'Iniciar', function () {
                $this.startGame();
            });
            new Button(index++, 'Cancelar', function () {
            });
        }
        new Button(index++, 'Salir');
    }
    this.setupButtons();


    this.startGame = function () {
        console.log('request start game', [context.table.roomId, context.table.id]);
        toluca.startGame(context.table.roomId, context.table.id)

    };

};