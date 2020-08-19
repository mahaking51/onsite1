const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const mySheet=document.getElementById('canvas');
let x=0;
let y=0;
let lineWidth=1;
var draw;
var drawCond=false;
var eraseCond=false;
var rectCond=false;
var ellipCond=false;
var lineCond=false;
var offsetX = canvas.left;
var offsetY = canvas.top;

let colorDraw="#000000"

document.getElementById('draw').addEventListener('click',function(){
    draw='draw'
    document.getElementById('draw').style.backgroundColor='grey'
    document.getElementById('erase').style.backgroundColor='#ececec'
    document.getElementById('rect').style.backgroundColor='#ececec'
    document.getElementById('ellipse').style.backgroundColor='#ececec'


})
document.getElementById('erase').addEventListener('click',function(){
    draw='erase'
    document.getElementById('erase').style.backgroundColor='grey'
    document.getElementById('draw').style.backgroundColor='#ececec'
    document.getElementById('rect').style.backgroundColor='#ececec'
    document.getElementById('ellipse').style.backgroundColor='#ececec'
    document.getElementById('lines').style.backgroundColor='#ececec'


})
document.getElementById('color').addEventListener('input',function(){
    colorDraw=document.getElementById('color').value;

})
document.getElementById('rect').addEventListener('click',function(){
    draw='rect';
    document.getElementById('rect').style.backgroundColor='grey'
    document.getElementById('draw').style.backgroundColor='#ececec'
    document.getElementById('erase').style.backgroundColor='#ececec'
    document.getElementById('ellipse').style.backgroundColor='#ececec'
    document.getElementById('lines').style.backgroundColor='#ececec'

})
document.getElementById('ellipse').addEventListener('click',function(){
    draw='ellipse'
    document.getElementById('ellipse').style.backgroundColor='grey'
    document.getElementById('draw').style.backgroundColor='#ececec'
    document.getElementById('rect').style.backgroundColor='#ececec'
    document.getElementById('erase').style.backgroundColor='#ececec'
    document.getElementById('lines').style.backgroundColor='#ececec'

})
document.getElementById('lines').addEventListener('click',function(){
    draw='line';
    document.getElementById('lines').style.backgroundColor='grey'
    document.getElementById('draw').style.backgroundColor='#ececec'
    document.getElementById('rect').style.backgroundColor='#ececec'
    document.getElementById('erase').style.backgroundColor='#ececec'
    document.getElementById('ellipse').style.backgroundColor='#ececec'

})
document.getElementById('width').addEventListener('change',function(){
    lineWidth=document.getElementById('width').value;
})
document.getElementById('clear').addEventListener('click',function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})


function drawLine(x1,y1,x2,y2,color,lineWidth){
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}
function eraseLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 20;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
function drawRect(x1,y1,x2,y2,color,lineWidth){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1, y2);
    ctx.lineTo(x2,y2);
    ctx.lineTo(x2,y1);
    ctx.lineTo(x1,y1);
    ctx.stroke();
    ctx.closePath();
}
function drawLine(x1,y1,x2,y2,color,lineWidth){
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}
function drawOval(x, y,lineWidth) {
    ctx.beginPath();
    ctx.moveTo(startX, startY + (y - startY) / 2);
    ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
    ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
    ctx.lineWidth = lineWidth;
    ctx.closePath();
    ctx.stroke();
}
mySheet.addEventListener('mousedown',function(e){
x=e.offsetX;
y=e.offsetY;
startX=e.offsetX;
startY=e.offsetY;
if(draw==="draw"){
drawCond=true
eraseCond=false;
rectCond=false;

}
if(draw==='erase'){
eraseCond=true
rectCond=false;
drawCond=false

}
if(draw==='rect'){
    rectCond=true;
    eraseCond=false;
    drawCond=false

}
if(draw==='ellipse'){
    ellipCond=true;
}
if(draw==='line'){
    lineCond=true;
}
})
mySheet.addEventListener('mousemove',function(e){
    if(drawCond){
        drawLine(x,y,e.offsetX,e.offsetY,colorDraw,lineWidth)
        x=e.offsetX;
        y=e.offsetY;
    }
    if(eraseCond){
        eraseLine(x,y,e.offsetX,e.offsetY);
        x=e.offsetX;
        y=e.offsetY;
    }
})
window.addEventListener('mouseup',function(e){
    if(drawCond){
        drawLine(x,y,e.offsetX,e.offsetY,colorDraw,lineWidth)
        x=0;
        y=0;
        drawCond=false;
    }
    if(eraseCond){
        eraseLine(x,y,e.offsetX,e.offsetY);
        x=0
        y=0
        eraseCond=false
    }
    if(rectCond){
        drawRect(x,y,e.offsetX,e.offsetY,colorDraw,lineWidth)
        x=0;
        y=0;
        rectCond=false;
    }
    if(ellipCond){
        drawOval(e.offsetX,e.offsetY,lineWidth);
        ellipCond=false;
    }
    if(lineCond){
        drawLine(x,y,e.offsetX,e.offsetY,colorDraw,lineWidth);
        x=0;
        y=0;
        lineCond=false;
    }
})
