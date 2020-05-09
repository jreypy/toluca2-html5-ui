var H = 200;
var K = 280;
var RADIO = 40;
var radious = RADIO;
var WOODEN = '#855E42'
var svgns = "http://www.w3.org/2000/svg";

var createG = function (w, h) {
    var g = document.createElementNS(svgns, 'g');
    g.setAttributeNS(null, 'width', w);
    g.setAttributeNS(null, 'height', g);
    return g;
};

var getG = function () {
    return createG(radious * 2, radious * 2);
};


var getRect = function (x, y, w, h, color) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    element.setAttributeNS(null, 'x', x);
    element.setAttributeNS(null, 'y', y);
    element.setAttributeNS(null, 'width', w);
    element.setAttributeNS(null, 'height', h);
    element.setAttributeNS(null, 'rx', 10);
    element.setAttributeNS(null, 'ry', 10);
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

    var h = parseInt((index%4) ) * 110 + 10;
    var k = parseInt((index/4)) * 60 ;

    var translate = 'translate(' + h + ','+ k +')'
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
};


var getChair = function (x, y) {
    var g = createG(radious, radious);
    // g.appendChild(getCircle(x,y,radious, 'yellow'));
    g.appendChild(getRect(0,0, radious*2, radious*2-25, WOODEN));
    g.appendChild(getRect(0,radious*2-20, radious*2, 20, WOODEN));
    var pillow = getRect(5,5, radious*2-10, radious*2-35, 'yellow');
    $(pillow).addClass('pillow');
    g.appendChild(pillow);
    return g;
};