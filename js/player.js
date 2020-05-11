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

    //g.setAttributeNS(null, "transform", "rotate (" + (rotation) + ", " + radious + ", " + radious + ")");
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
    var playerName = 'LIBRE ';

    console.log('playermanager', [tableManager, index, point, rotation, user]);
    var table = tableManager.getTable();
    var $this = this;
    this.user = user;

    var circle = getCircle(H, K+230, radious*0.5, 'yellow');
    var innerCircle = getCircle(H, K+230, radious*0.4, 'yellow');

    var text = addText(playerName);

    text.setAttributeNS(null, 'x', H);
    text.setAttributeNS(null, 'y', (K + 230 + radious));
    text.setAttributeNS(null, 'text-anchor', 'middle');
    text.setAttributeNS(null, 'dominant-baseline', 'middle');

    var textRotation = ' rotate (' + (360-rotation) + ',' +  H + ',' + (K + 230) + ')';
    text.setAttribute('transform', textRotation)



    $(innerCircle).addClass('inner-circle');


    console.log('playerIndex', playerIndex);

    var chair = getChair(H, K+200);


    var playerContainer = getG();


    $(playerContainer).addClass('selectable');


    var playerG = getG();
    // $(playerG).addClass('free');


    if (index%2 == 0){
        $(chair).addClass('team1');
        $(playerG).addClass('team1');
    }else{
        $(chair).addClass('team2');
        $(playerG).addClass('team2');
    }
    $(chair).addClass('player-'+index);






//    var translate = 'translate(' + (H + point.x - radious) + ',' + (K - point.y - radious) + ') '
    var newTranslate = ' rotate (' + (rotation) + ',' + H + ',' + K + ')';

    playerContainer.setAttribute('transform', newTranslate)
    playerG.setAttribute('transform', newTranslate)


    // playerG.setAttribute('transform', translate);



    $(playerContainer).click(function () {
        // unselect / select
        //$(circle).removeClass('free');
        if (table.status == 'NEW') {
            toluca.setTablePosition(table.roomId, table.id, index);
        } else {
            console.log('position no selected', [table.status, index, table]);
        }
    });


    this.setPlayer = function (player, fire) {
        $this.player = player;
        // $(g).find('text').remove();
        // $(circle).addClass('free');
        // $this.speechBallon.show('Hola!');
        $(playerG).remove();

        if (player == null) {
            //circle.setAttributeNS(null, 'fill', 'green');
            // var text = addText('Player ' + (index + 1));
            // text.innerText = 'Player '+ (index+1);
            $(playerG).addClass('free');
            $(text).html('Libre');
            // g.appendChild(text);
        }
        else if (fire) {
            // var text = addText(player.username);
            $(playerG).removeClass('free');
            $(text).html(player.username);
            // g.appendChild(text);
        } else {
            // var text = addText(player.username);
            // text.innerText = player.username;
            $(playerG).removeClass('free');
            $(text).html(player.username);
            // g.appendChild(text);
        }
        tableManager.addComponent(playerG);

    };
    this.cleanCards = function () {
        console.log('remove cards from user [' + $this.user.id + ']');
        cardsManager.cleanCards();
    };

    this.receivingCards = function (user, cards) {
        console.log('playermanger receiving cards', [$this.user.id, cards, rotation])

        cardsManager.cleanCards();
        tableManager.addComponent(playerContainer);

        for (var i in cards) {
            cardsManager.addCard(this, i, cards[i].type, cards[i].value, PRINCIPAL.id == $this.user.id, rotation);
        }
        //
    };


    this.playRequest = function (event) {
        console.log('play requested');
        $(tableManager.getContainer()).find('.waiting').removeClass('waiting');
        $(playerG).addClass('waiting');
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



    var cardsManager = new CardsManager($this, index, {}, point.x, point.y, rotation);

    // Speech
    this.speechBallon = new SpeechBallon(point, rotation);
    $(playerContainer).append(this.speechBallon.g);


    playerContainer.appendChild(chair);

    playerG.appendChild(circle);
    playerG.appendChild(innerCircle);
    playerG.appendChild(text);


    $(playerContainer).addClass('player');
    $(playerG).addClass('player-circle');



    if (user != null) {
        $(text).html(user.username);
        $(playerG).removeClass('free');
    }

    this.getComponent = function(){
        return playerContainer;
    };
    this.addComponent = function(image){
        $(playerG).remove();
        $(playerContainer).append(image);
        tableManager.addComponent(playerG);

    }
    this.getTableManager = function(){
        return tableManager;
    };

    this.paint = function () {
        tableManager.addComponent(playerContainer);
        tableManager.addComponent(playerG);
    };

    this.repaint = function () {
        $(playerContainer).remove();
        $(playerG).remove();
        $this.paint();
    };

    return this;
};