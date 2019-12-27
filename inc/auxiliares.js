function limpaQuadro(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function MinMax(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function crimp(str, size){
    add = Math.floor((size - str.length) / 2);
    return ' '.repeat(add) + str + ' '.repeat(add);
}
function centralize(str, linha){
    gotoxy(str, Math.floor(50 - str.length/2), linha);
}
function logo(){
    centralize(".dP\"Y8 888888    db    88\"\"Yb 8b    d8    db    88b 88 ", 5);
    centralize(" `Ybo.\"   88     dPYb   88__dP 88b  d88   dPYb   88Yb88 ", 6);
    centralize("o. `Y8b   88    dP__Yb  88\"Yb  88YbdP88  dP__Yb  88 Y88 ", 7);
    centralize("8bodP'   88   dP\"\"\"\"Yb 88  Yb 88 YY 88 dP\"\"\"\"Yb 88  Y8 ", 8);
}
function gotoxy(letter, x, y, color='white', bold=false){
    if(mobile == true){
        size = canvas.height * 0.0337;
    }else{
        size = canvas.width*0.017;
    }
	context.font = (bold ? "900 " : "") + size +"px Courier New";
	//context.fontFamily = "DontSpot, sheepsans"; 
    context.fillStyle = color;
	var ctext = letter;
    context.fillText(ctext, x*(canvas.width/104), (y+2)*(canvas.height/37));
}




  
/* Fullscreen */
function fullscreen(){
	var e = document.body; // element
	(e.requestFullscreen && e.requestFullscreen())
	||
	(e.msRequestFullscreen && e.msRequestFullscreen())
	||
	(e.mozRequestFullScreen && e.mozRequestFullScreen())
	||
    (e.webkitRequestFullscreen && e.webkitRequestFullscreen());
    
    screen.orientation.lock("landscape");
}
function isFullscreen(){
	return Boolean(document.fullscreen || document.webkitFullscreen || document.mozFullScreen || document.msFullscreen);
}


function fopen(file, callback1, callback2){
    var oXHR = new XMLHttpRequest();
    oXHR.open("GET", file, true);
    oXHR.onreadystatechange = function (oEvent) {  
        if (oXHR.readyState === 4) {  
            if (oXHR.status === 200){  
              callback1(oXHR.responseText);
            } else {  
               callback2();  
            }  
        }  
    }; 
    oXHR.send(null);  
}