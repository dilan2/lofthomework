/**
 * Created by sergejglebko on 29.11.16.
 */
var Cookie = {
    update: function() {
        if (document.cookie) {
            var mas = document.cookie.replace(/^\s+/g, '').split("; ");
            for(var i = 0; i < mas.length; i++) {
                temp.cookie[mas[i].split("=")[0]] = mas[i].split("=")[1] + "";
            }
        } else {
            temp.cookie = {};
        }
    },
    set: function(name, val, path, expires) {
        if(expires) {
            var date = new Date;
            date.setDate(date.getDate() + (+expires) );
            expires = date.toUTCString();
        } else {
            expires = '';
        }
        document.cookie = name + "=" + val + "; path=" + path + ";expires = " + expires;
        this.update();
    }
};
var temp = {
    cookie: {},
}
Cookie.update();
var masCook = [];

if(temp.cookie.blocks) {
    var res = JSON.parse(temp.cookie.blocks);
    console.log(res);
    for(var i = 0; i < res.length - 1; i++) {
        var bl = document.createElement('div');
        var place = document.getElementById('blocks');
        place.appendChild(bl);
        bl.style.width = '100px';
        bl.style.height = '100px';
        bl.style.backgroundColor = res[i].color;
        bl.addEventListener('mousedown', mousedownhandler);
        bl.style.position = 'absolute';
        bl.style.zIndex = 1000;
        // console.log(res[i].top);
        bl.style.top = +res[i].top + 'px';
        bl.style.left = +res[i].left+ 'px';
        masCook.push(res[i]);
    }
}

var bu = document.getElementById('bu');
bu.addEventListener('click', clickhandler);
function clickhandler(e) {
    var body = document.getElementsByTagName('body')[0];
    var place = document.getElementById('blocks');
    var div = document.createElement('div');
    place.appendChild(div);
    div.style.width = '100px';
    div.style.height = '100px';
    div.style.backgroundColor = 'red';
    div.addEventListener('mousedown', mousedownhandler);
}
function mousedownhandler(e) {
    e.target.style.position = 'absolute';
    var place = document.getElementById('blocks');
    place.appendChild(e.target);
    e.target.style.zIndex = 1000;
    var coords = getCoords(e.target);
    var shiftX = e.pageX - coords.left;
    console.log(shiftX);
    var shiftY = e.pageY - coords.top;
    console.log(shiftY);
    moveAt(e);
    function moveAt(e) {
        e.target.style.left = e.pageX - shiftX + 'px';
        e.target.style.top = e.pageY - shiftY + 'px';
    }
    document.addEventListener('mousemove', mousemovehandler);

    function mousemovehandler(e) {
        // console.log(e);
        moveAt(e);
    }
    e.target.addEventListener('mouseup', mouseuphandler);
    function mouseuphandler() {
        document.removeEventListener('mousemove', mousemovehandler);
        e.target.removeEventListener('mouseup', mouseuphandler);
        console.log(getCoords(e.target));
        setter(getCoords(e.target), e.target.style.backgroundColor );


    }
    function getCoords(elem) { // кроме IE8-
        var box = elem.getBoundingClientRect();
        // console.log(box);
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

function setter(arg, color) {
    var obj = {};
    obj.top = arg.top + '';
    obj.left = arg.left+ '';
    // str.count = blocks.children.length;
    obj.color = color;
    masCook.push(obj);
}

function save() {
    var count = blocks.children.length + '';
    // console.log(count);
    masCook.push(count);
    var str = JSON.stringify(masCook);
    console.log(str);
    Cookie.set('blocks', str, '/', 100);
}

var saveBu = document.getElementById('saveBu');
saveBu.addEventListener('click', save);
