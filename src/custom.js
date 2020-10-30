
var globalID;
var count = 200;
function repeatOften() {
  //$("<div />").appendTo("body");
  count--;
  if(count != 0){
  console.log("in Hello");
  globalID = requestAnimationFrame(repeatOften);
  }
}

 // globalID = requestAnimationFrame(repeatOften);

function stop() {
     console.log("in stop");
  cancelAnimationFrame(globalID);
}
function start() {
    console.log("in start");
  globalID = requestAnimationFrame(repeatOften);
}

/*
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x,this.y,30, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
        //console.log("asdasd");
    }
}
var cir = new Circle(60, 60, 20,20, 20);
cir.draw();
cir.draw();
*/
const writeEvent = (text) => {
    const parent = document.querySelector('#events');

    const el = document.createElement('li');
    el.innerHTML = text;
    parent.appendChild(el);

};

writeEvent('Dhaayam');

/*alert('java');
(function hello() {
    alert('Hello!!!');
})()
*/
/*(function check_box() {
    var c = document.getElementById("row1myCanva") as HTMLCanvasElement;
    var ctx = c.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(40,40);
    
    ctx.stroke();
    ctx.moveTo(40,0);
    ctx.lineTo(0,40);
    ctx.stroke();
})()*/

//module.exports = Circle;