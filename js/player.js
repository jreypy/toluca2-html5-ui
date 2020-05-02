var SpeechBallon = function (point, rotation) {

    var g = getG();

    var ballon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    ballon.setAttribute('id', 'speech_ballon');
    //var d = 'M 20 20 -50 -100 100 0Z';
    var d = 'M ' + (radious) + ' ' + (radious) + ' -15 -200 ' + (radious + (radious + 15)) + ' -200Z';
    ballon.setAttributeNS(null, "d", d);
    ballon.setAttributeNS(null, "fill", "yellow");
    ballon.setAttributeNS(null, "fill-rule", "evenodd");
    ballon.setAttributeNS(null, "clip-rule", "evenodd");

    //translate('+(point.x-297)+','+(point.y-H+277)+')

    $(g).append(ballon);
    var circle = getCircle(40, -220, 180, 'yellow');
    $(g).append(circle);

    var rotationText = rotation;

    // var translate = 'translate(' + (radious * -1) + ',' + (-1*CARD_HEIGHT) + ') '
    // var rotate = ' rotate(' + (data.rot + $rot * 20) + ',' + (H + data.x + radious) + ',' + (K - data.y + CARD_HEIGHT) + ')';
    // var transform = translate + ' ' + rotate;
    // // console.log('rotation', [data.index,transform]);
    // card.setAttribute('transform', transform);


    var text = createText({x: 40, y: -220}, 'Hola!', 'blue');

    g.setAttributeNS(null, "transform", "rotate (" + (rotation) + ", " + radious + ", " + radious + ")");
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

var PlayerManager = function (tableManager, index, point, rotation, user, playerIndex) {
    console.log('playermanager', [tableManager, index, point, rotation, user]);
    var table = tableManager.getTable();
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
    var playerName = 'LIBRE ';

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
        //$this.speechBallon.show('Hola!');
        circle.setAttributeNS(null, 'fill', 'gray');

        if (table.status == 'NEW') {
            toluca.setTablePosition(table.roomId, table.id, index);
        } else {
            console.log('position no selected', [index, table]);
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
        cardsManager.cleanCards();
        for (var i in cards) {
            cardsManager.addCard(this, i, cards[i].type, cards[i].value, PRINCIPAL.id == $this.user.id, rotation);
        }
        tableManager.addComponent(g);
    };

    this.playRequest = function (event) {
        console.log('play requested');
        $(tableManager.getContainer()).find('.waiting').removeClass('waiting');
        $(circle).addClass('waiting');
    };

    this.playEvent = function (event) {
        console.log('== play event', event);


        if (event.eventName == TrucoGamePlay.PLAY_CARD) {
            tolucaFx.playCardEffect();
            cardsManager.showCard(event.card);
        }
        else if (event.eventName == 'PLAYER_READY'){
            $(circle).removeClass('waiting');
        }
        else if (event.eventName == '') {

        }
        else if (event.text != null) {
            //alert($this.user.username + ' dice: ' + event.text);
            var speech = event.eventName;

            if (event.eventName == 'SAY_ENVIDO_VALUE') {
                speech = event.text;
            }
            console.log('request play speech', [event, speech]);

            var speecher = 'm';
            if (index % 2 == 1) {
                speecher = 'f';
            }

            tolucaFx.playSpeech({
                name: speecher
            }, speech);

            $this.speechBallon.show(event.text);
        } else {
            console.log('another play', event);
        }
    };

    this.playCard = function (data) {
        console.log('playing card', [$this.user.id, PRINCIPAL.id])

        if ($this.user.id == PRINCIPAL.id){
            if (tableManager.playCard($this.user, data)){
                $(circle).removeClass('waiting');
                return true;
            }
        }

        return false;
    };

    this.repaint = function () {
        tableManager.addComponent(g);
    };

    var cardsManager = new CardsManager($this, index, {}, point.x, point.y, rotation);

    // Speech
    this.speechBallon = new SpeechBallon(point, rotation);
    $(g).append(this.speechBallon.g);

    g.appendChild(circle);
    g.appendChild(circle2);
    g.appendChild(text);


    $(g).addClass('player');
    $(circle).addClass('player-circle');



    if (user != null) {
        $(text).html(user.username);
    }

    this.getComponent = function(){
        return g;
    };

    this.getTableManager = function(){
        return tableManager;
    };

    return this;
};