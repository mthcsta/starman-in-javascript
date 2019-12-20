function startMobile(){
    canvas.style.display = "block";
}
function modeMobile(){
    botao = document.createElement("button");
    botao.innerHTML = "Abrir FullScreen";
    botao.style.display="block";
    botao.style.margin = "auto";
    botao.addEventListener("click", function(){
        botao.style.display="none";
        fullscreen();
    });
    document.body.appendChild(botao);
}


document.onfullscreenchange = window.onresize = function(){ 
    if(typeof document.onfullscreenchange == "undefined" || isFullscreen()){
        console.log("a");
        startMobile(); 
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
