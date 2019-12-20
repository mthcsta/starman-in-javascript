//  Sample refactored by David Rousset - Microsoft France - http://blogs.msdn.com/davrous 
//  Using Hand.js to support all platforms

//  Based on https://github.com/sebleedelisle/JSTouchController/blob/master/Touches.html 

//  Copyright (c)2010-2011, Seb Lee-Delisle, sebleedelisle.com. All rights reserved.

//  Redistribution and use in source and binary forms, with or without modification, are permitted provided 
//  that the following conditions are met:

//    * Redistributions of source code must retain the above copyright notice, 
//      this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above copyright notice, 
//      this list of conditions and the following disclaimer in the documentation 
//      and/or other materials provided with the distribution.

//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS 
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
//  AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR 
//  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
//  OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
//  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
//  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY 
//  OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 

"use strict";

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

var touches; // collections of pointers

var c; // c is the canvas' context 2D

// meus edits
var holding = [];

var lastUpdate = {y:{pos:0,id:0},x:{pos:0,id:0}};

//document.addEventListener("DOMContentLoaded", init);

window.onorientationchange = resetCanvas;
window.onresize = resetCanvas;

function init() {
    setupCanvas();
    touches = new Collection();
    canvas.addEventListener('pointerdown', onPointerDown, false);
    canvas.addEventListener('pointermove', onPointerMove, false);
    canvas.addEventListener('pointerup', onPointerUp, false);
    canvas.addEventListener('pointerout', onPointerUp, false);
    //requestAnimFrame(draw);
}

function resetCanvas(e) {
    // resize the canvas - but remember - this clears the canvas too.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //make sure we scroll to the top left.
    window.scrollTo(0, 0);
}

function createPointerObject(event) {
    var type;
    var color;
    switch (event.pointerType) {
        case event.POINTER_TYPE_MOUSE:
            type = "MOUSE";
            color = "red";
            break;
        case event.POINTER_TYPE_PEN:
            type = "PEN";
            color = "lime";
            break;
        case event.POINTER_TYPE_TOUCH:
            type = "TOUCH";
            color = "cyan";
            break;
    }
    return { identifier: event.pointerId, x: event.clientX, y: event.clientY, type: type, color: color };
}


function onPointerDown(e) {
    holding[e.pointerId] = Date.now()+300;
    if(lastUpdate.y.id == 0){
        lastUpdate.y.id = e.pointerId;
        lastUpdate.y.pos = e.clientY;
    }
    if(lastUpdate.x.id == 0){
        lastUpdate.x.id = e.pointerId;
        lastUpdate.x.pos = e.clientX;
    }
    
    touches.add(e.pointerId, createPointerObject(e));
}


function onPointerMove(e) {
    if (touches.item(e.pointerId)) {
        if((lastUpdate.y.id == e.pointerId || lastUpdate.y.id == 0) && Math.abs(lastUpdate.y.pos - e.clientY) > 20){
            lastUpdate.y.pos = e.clientY;
            lastUpdate.y.id = e.pointerId;
            holding[e.pointerId] = 0;
            if(touches.item(e.pointerId).y > e.clientY){
                document.onkeypress({key:'W',preventDefault:function(){}})
            }else document.onkeypress({key:'S',preventDefault:function(){}})
        }
        if((lastUpdate.x.id == e.pointerId || lastUpdate.x.id == 0) && Math.abs(lastUpdate.x.pos - e.clientX) > 60){
            lastUpdate.x.pos = e.clientX;
            lastUpdate.x.id = e.pointerId;
            holding[e.pointerId] = 0;
            if(touches.item(e.pointerId).x > e.clientX){
                document.onkeypress({key:'A',preventDefault:function(){}})
            }else document.onkeypress({key:'D',preventDefault:function(){}})
        }
        

        touches.item(e.pointerId).x = e.clientX;
        touches.item(e.pointerId).y = e.clientY;
    }
}

function onPointerUp(e) {
    if(holding[e.pointerId]!=0 && holding[e.pointerId]>Date.now()){ 
        document.onkeypress({key:' ',preventDefault:function(){}});
        holding[e.pointerId] = 0;
    }
    if(lastUpdate.y.id == e.pointerId){
        lastUpdate.y.id = 0;
    }
    if(lastUpdate.x.id == e.pointerId){
        lastUpdate.x.id = 0;
    }
    touches.remove(e.pointerId);
}

function setupCanvas() {
//    canvas = document.getElementsByTagName("canvas")[0]; //document.getElementById('canvasSurface');
    c = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    c.strokeStyle = "#ffffff";
    c.lineWidth = 2;
}