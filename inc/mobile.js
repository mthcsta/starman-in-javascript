function startMobile(){
    canvas.style.display = "block";
}
function modeMobile(){
    div = document.createElement("div");
    div.innerHTML = "Gire a tela na vertical e dê fullscreen para rodar o jogo";
    div.style.color = "white";
    div.style.padding = "10px";
    botao = document.createElement("button");
    botao.innerHTML = "Abrir FullScreen";
    botao.style.display="block";
    botao.style.margin = "auto";
    botao.addEventListener("click", function(){
        div.style.display="none";
        fullscreen();
    });
    div.appendChild(botao);
    document.body.appendChild(div);
}


document.onfullscreenchange = window.onresize = function(){ 
    if(typeof document.onfullscreenchange == "undefined" || isFullscreen() && window.innerWidth > window.innerHeight){
        startMobile(); 
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
