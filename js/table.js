var efectoFinalizado = function(index, event){
    console.log('efector finalizado [' , index);
    console.log(event);
};

trucoTableRender = function (context, toluca) {
    console.log('creating trucoTableRender', [context, toluca]);
    var $this = this;
    console.log('render table', context.table);
    var svgns = "http://www.w3.org/2000/svg";
    var container = document.getElementById('table-screen');
    var radious = 40;
    var table = context.table;

    var H = 400;
    var K = 300;



    var getG = function(){
        var g = document.createElementNS(svgns, 'g');
        //circle.setAttribute('transform',  ' translate(400,250)');
        return g;
    };

    var getCircle = function(x, y, r, color ){
        var circle = document.createElementNS(svgns, 'circle');
        circle.setAttributeNS(null, 'cx', x);
        circle.setAttributeNS(null, 'cy', y);
        circle.setAttributeNS(null, 'r', r);
        circle.setAttributeNS(null, 'fill', color);
        //circle.setAttribute('transform',  ' translate(400,250)');
        return circle;
    };
    var getImage = function(imageName, point){
        var svgimg = document.createElementNS('http://www.w3.org/2000/svg','image');
        // svgimg.setAttributeNS(null,'height','200');
        // svgimg.setAttributeNS(null,'width','200');
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', imageName);
        svgimg.setAttributeNS(null,'x', point.x);
        svgimg.setAttributeNS(null,'y', point.y);
        //svgimg.setAttribute('transform',  ' translate('+point.x+','+point.y+')');
        // svgimg.setAttributeNS(null,'height','100');
        // svgimg.setAttribute('transform',  ' translate('+H+','+K+')');
        svgimg.setAttributeNS(null, 'visibility', 'visible');
        $('svg').append(svgimg);
        return svgimg;
    }
    var getDorsoImage = function(point){
        return getImage('images/cards/dorso.gif', point);
    };
    var getCardImage = function(type, value, points){
        // Append image to SVG
        return getImage('images/cards/'+type + '/' + value + '.gif', points);
    };
    var setCardImage = function(svgimg, type, value){
        // Append image to SVG
        svgimg.setAttributeNS('http://www.w3.org/1999/xlink','href', 'images/cards/'+type + '/' + value + '.gif');
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
            data.type = 'basto';
            data.value = 1;


            this.flip = function(){

            };

            this.play = function(){
                // console.log('play!'+index);
                setCardImage(card, data.type, data.value);
                //"rotate("+(data.rotation) +", "+data.x+ ", "+ data.y+")"
                // data.el.setAttribute("transform",  + ' translate('+(-1*x)+','+(-1*y)+' )');
                $(animation).get(0).beginElement();
            }

            var card = getDorsoImage({x:H+data.x, y:K-data.y});
            // var card = getCircle(H+data.x, K-data.y, 20);
            var $rot = data.num-1;
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
            mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#path_"+index);

            animation.setAttributeNS(null,"onend", "efectoFinalizado("+index+")");

            animation.appendChild(mpath);
            card.appendChild(animation);
            container.append(card);
            // console.log('data', data);
            //' translate('+H+','+K+')  '
            var translate  = 'translate('+(radious*-1)+','+0+') '
            var rotate = ' rotate('+(data.rot+$rot*20) + ','+(H+data.x+radious)+ ','+(K-data.y)+')';
            var transform = translate + ' ' + rotate;
            // console.log('rotation', [data.index,transform]);
            card.setAttribute('transform',   transform);

            card.addEventListener("click", function () {
                console.log('flip card');
                $this.play();
            });

        };



        this.addCard = function(num){
            // var card = getCardImage('basto', '1', {x:x, y:y});
            $this.cards.push(new $this.card({
                x : x,
                y : y,
                rot : rotation,
                type : null,
                value: null,
                flipped : false,
                index : index,
                num : num
            }));

        };




    };

    var PlayerManager = function(index, point, circle, rotation){
        var $this = this;




        $(circle).click(function () {
            // unselect / select
            circle.setAttributeNS(null, 'fill', 'gray');
            if (table.status == 'NEW'){
                toluca.setTablePosition(table.roomId, context.table.id, index);
            }else{
                console.log('position no selected', [index, context.table]);
            }
        });


        this.setPlayer = function(player, fire){
            $this.player = player;
            if (player == null){
                circle.setAttributeNS(null, 'fill', 'gray');
            }
            else if (fire){
                circle.setAttributeNS(null, 'fill', 'red');
            }else{
                circle.setAttributeNS(null, 'fill', 'blue');
            }

        };

        var cardsManager = new CardsManager(index, {}, point.x, point.y, rotation);
        cardsManager.addCard(0, {});
        cardsManager.addCard(1, {});
        cardsManager.addCard(2, {});



    };





    if (table.status == 'NEW') {
        // Render Table
    }


    this.render = function (size) {

        var pos = {
            '2': [
                [0, -240],
                [0, 240],
            ],
            '4': [
                [0, -200],
                [200, 0],
                [0, 200],
                [-200, 0]
            ],
            '6': [
                [0, -250, 180],
                [340, -150, 180-65],
                [340, 150, 65],
                [0, 250, 0],
                [-340, 150, -65],
                [-340, -150, -115]
            ]
        };

        var dis = pos[size];

        var cards = [];

        for (var i in dis) {
            var point1 = {x: dis[i][0], y: dis[i][1]};
            var point2 = {x: 0, y: 0};


            var circle = getCircle(H + point1.x, K - point1.y, radious, 'white');
            $(circle).addClass('selectable');
            container.appendChild(circle);

            $this.players[i] = new PlayerManager(i, point1, circle, dis[i][2]);



            // User Path
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('id', 'path_'+i);
            var d = 'M ' +'0 , 0'+ ' L ' + (point2.x-point1.x-100) + ' ' + (point2.y + point1.y);
            // console.log('d', d);
            path.setAttributeNS(null, "d", d);
            // // newLine.setAttribute('c', );
            path.setAttribute('stroke-width', '0');
            path.setAttribute('stroke', 'transparent');
            // path.setAttribute('transform',  ' translate('+H+','+K+')');
            $(container).append(path);
        }
        // paths
    };
    this.setPlayerPosition = function(params){
        console.log('setting position ', params);
        for (var i in params.table.positions){

            $this.players[i].setPlayer(params.table.positions[i], params.index==i);
        }
    };
    this.size = 6;
    this.players = [];
    this.render(this.size);

};