var efectoFinalizado = function(index){
    console.log('efector finalizado [' , index);
};

trucoTableRender = function (table) {
    console.log('render table', table);
    var svgns = "http://www.w3.org/2000/svg";
    var container = document.getElementById('table-screen');
    var radious = 40;

    var H = 400;
    var K = 300;



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
        svgimg.setAttributeNS(null,'x', H+point.x);
        svgimg.setAttributeNS(null,'y', K-point.y);
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


    var cardManager = function (index, circle, x, y, rotation) {
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
                console.log('play!'+index);
                // setCardImage(card, data.type, data.value);
                //"rotate("+(data.rotation) +", "+data.x+ ", "+ data.y+")"
                // data.el.setAttribute("transform",  + ' translate('+(-1*x)+','+(-1*y)+' )');
                $(animation).get(0).beginElement();
            }

            // var card = getDorsoImage({x:data.x, y:data.y});
            var card = getCircle(H+data.x, K-data.y, 20);
            var $rot = index-1;
            $(card).addClass('selectable');
            // Important! Align
            //+  '
            //
            //+ ' rotate(' + rotation + $rot*30+ ")"
            // + ' rotate(' + rotation + ")" + ' translate('+ (radious * -1 )+','+0+')')
            // card.setAttribute('transform',  ' translate('+ (x)+','+y+')');

            var animation = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion');
            animation.setAttribute('dur', '3s');
            animation.setAttribute('begin', 'click');
            animation.setAttribute('repeatCount', '1');
            animation.setAttribute('fill', 'freeze');

            var mpath = document.createElementNS('http://www.w3.org/2000/svg', 'mpath');
            mpath.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#path_"+index);

            animation.setAttributeNS(null,"onend", "efectoFinalizado("+index+")");

            animation.appendChild(mpath);
            card.appendChild(animation);
            container.append(card);
            console.log('data', data);
            //' translate('+H+','+K+')  '
            var translate  = 'translate('+(radious)+','+0+') '
            var rotate = ' rotate('+0+ ',' + ((H+data.x))+',' + ((K+data.y))+  ')';
            var transform = translate + ' ' + rotate;
            console.log('rotation', [data.index,rotate]);
            // card.setAttribute('transform',   translate);

            card.addEventListener("click", function () {
                console.log('flip card');
                $this.play();
            });

        };



        this.addCard = function(){
            // var card = getCardImage('basto', '1', {x:x, y:y});
            console.log('adding card', rotation);
            $this.cards.push(new $this.card({
                x : x,
                y : y,
                rot : rotation,
                type : null,
                value: null,
                flipped : false,
                index : index
            }));

        };




    }

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



    if (table.status == 'NEW') {
        // Render Table
    }


    this.init = function () {
        var size = '6';
        var dis = pos[size];
        var colors = ['red', 'blue', 'yellow', 'gray', 'cyan', 'magenta'];

        var cards = [];

        for (var i in dis) {
            var point1 = {x: dis[i][0], y: dis[i][1]};
            var point2 = {x: 0, y: 0};

            var rotation = dis[i][2];

            // User Circle
            var circle = getCircle(H + point1.x, K - point1.y, radious, colors[i]);
            container.appendChild(circle);

            cards[i] = new cardManager(i, circle, point1.x, point1.y, rotation);
            cards[i].addCard(0, {});
            // cards[i].addCard(1, {});
            // cards[i].addCard(2, {});

            // User Path
            var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('id', 'path_'+i);
            var d = 'M ' +'0 , 0'+ ' L ' + (point2.x-point1.x) + ' ' + (point2.y + point1.y);
            console.log('d', d);
            path.setAttributeNS(null, "d", d);
            // // newLine.setAttribute('c', );
            path.setAttribute('stroke-width', '1');
            path.setAttribute('stroke', 'cyan');
            // path.setAttribute('transform',  ' translate('+H+','+K+')');
            $(container).append(path);
        }
        // paths
    };
    this.init();

};