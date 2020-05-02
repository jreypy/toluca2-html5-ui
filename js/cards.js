var getDorsoImage = function (point) {
    var dorsoImage = getImage('images/cards/dorso.gif', point);
    $(dorsoImage).addClass('card');
    return dorsoImage;
};
var getCardImage = function (type, value, points) {
    // Append image to SVG
    var cardImage = getImage('images/cards/' + (type + '').toLowerCase() + '/' + value + '.gif', points);
    $(cardImage).addClass('card');
    return cardImage;
};

var cardImageUrl = function (type, value) {
    return 'images/cards/' + (type + '').toLowerCase() + '/' + value + '.gif';
};

var setCardImage = function (svgimg, type, value) {
    // Append image to SVG
    svgimg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', cardImageUrl(type, value));
};

var getCardAnimation = function (index) {
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

    return animation;
}


var Card = function (playerManager, data) {
    var CARD_HEIGHT = 127;

    console.log('creating card', data);
    var $this = this;
    $this.data = data;
    $this.data.played = false;
    console.log('add card', data);
    var image = getDorsoImage({x: H + data.x, y: K - data.y});

    this.flip = function () {
        if (data.flipped) {
            setCardImage(image, data.type, data.value);
        }
    };

    this.play = function () {
        // Validate if can be played
        try {
            if (data.played == false && data.type != null && data.value != null) {
                data.played = true;
                if (playerManager.playCard({
                    type: data.type,
                    value: data.value
                })) {
                    // Start effect if can be played
                    console.log('starting effect playing card *******  ');
                    $this.repaint();
                    tolucaFx.playCardEffect();
                    $(animation).get(0).beginElement();
                    return;
                }
                data.played = false;
            }
        } catch (e) {
            data.played = false;
        }
        // Play Sound (Wrong)
    };

    this.repaint = function () {
        $(image).remove();
        playerManager.getTableManager().addComponent(image);
    };

    this.remove = function () {
        $(image).remove();
    };

    this.show = function (eventCard) {
        console.log('show card', eventCard);
        if (data.type == null && data.value == null && data.played == false) {
            $(image).addClass('played');
            image.setAttributeNS('http://www.w3.org/1999/xlink', 'href', cardImageUrl(eventCard.type, eventCard.value));
            data.flipped = true;
            data.played = true;
            data.type = eventCard.type;
            data.value = eventCard.value;
            $this.repaint();
            $(animation).get(0).beginElement();
        }
    };

    var $rot = data.num - 1;

    // Adding animation
    var animation = getCardAnimation(data.index);
    image.appendChild(animation);

    playerManager.getTableManager().addComponent(image);
    $(image).addClass('selectable');

    var translate = 'translate(' + (radious * -1) + ',' + (-1 * CARD_HEIGHT) + ') '
    var rotate = ' rotate(' + (data.rot + $rot * 20) + ',' + (H + data.x + radious) + ',' + (K - data.y + CARD_HEIGHT) + ')';
    var transform = translate + ' ' + rotate;

    image.setAttribute('transform', transform);

    $(image).addClass('card');

    image.addEventListener("click", function () {
        $this.play();
    });

    image.addEventListener("mouseover", function () {
        $this.repaint();
        playerManager.repaint();
    });

    this.flip();

};

var CardsManager = function (playerManager, index, circle, x, y, rotation) {
    console.log('creating cards manaager  ', [playerManager, circle, x, y, rotation]);

    var $this = this;
    this.cards = [];

    this.showCard = function (card) {
        console.log('show card', card);
        var index = -1;

        for (var i in $this.cards) {
            if ($this.cards[i].data.type == card.type && $this.cards[i].data.value == card.value) {
                $this.cards[i].data.type = null;
                $this.cards[i].data.value = null;
                console.log('showing card', JSON.stringify($this.cards[i].data));

                if ($this.cards[i].flipped) {
                    // Recheck...
                    return;
                }

                $this.cards[i].show(card);
                return;
            }
            if (!$this.cards[i].data.flipped) {
                // Show Card no played before
                index = i;
            }
        }
        if (index > -1) {
            console.log('showing card', JSON.stringify($this.cards[index].data));
            $this.cards[index].show(card);
        } else {
            console.log('WARN Card doent have showed ', card);
        }
    };


    this.addCard = function (playerManager, num, type, value, flipped) {
        // var card = getCardImage('basto', '1', {x:x, y:y});
        console.log('creating card', [playerManager, num, type, value, flipped, rotation]);
        $this.cards.push(new Card(playerManager, {
            x: x,
            y: y,
            rot: rotation,
            type: type,
            value: value,
            flipped: flipped,
            index: index,
            num: num
        }));

        if ($this.cards.length > 3) {
            throw {
                name: 'Invalid Cards Quantity',
                message: 'The player has more than 3 cards'
            }
        }

    };


    this.cleanCards = function () {
        console.log('remove cards from user');
        for (i in $this.cards) {
            $this.cards[i].remove();
        }
        $this.cards = [];
    };

};