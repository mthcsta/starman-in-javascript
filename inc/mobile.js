function startMobile(){
    canvas.style.display = "block";
}
function modeMobile(){
    div = document.createElement("div");
    div.style.color = "white";
    div.style.padding = "1em";
    
    image = document.createElement('img');
    image.src = "assets/starman.png";
    image.style.display = "block";
    image.style.margin = "auto";


    botao = document.createElement("button");
    botao.innerHTML = "Iniciar Jogo";
    botao.style.display="block";
    botao.style.margin = "auto";
    botao.style.border = "none";
    botao.style.width = "160px";
    botao.style.padding = "0.5em 1em";
    botao.style.backgroundColor = "teal";
    botao.style.color = "white";

    botao.addEventListener("click", function(){
        div.style.display="none";
        fullscreen();
    });
    div.appendChild(image);
    div.appendChild(botao);
    document.body.appendChild(div);
}


/** Hack para classificados */
function criaButao(){

    butao = document.createElement('input');
    butao.type = 'text';
    butao.className = "butao invisivel";
    butao.maxLength = DEFINE.NOME_TAMANHO_MAXIMO;
    
    
    butao.onkeyup = function(e){
        if(e.keyCode == 13){
            controleClassificado('enter');
            butao.blur();
            return;
        }
        _classificado.nome = butao.value;
    }
    butao.onblur = function(){
        butao.classList.add("invisivel");
        document.getElementsByTagName("canvas")[0].classList.remove("invisivel");
    }
    butao.show = function(){
        butao.classList.remove("invisivel");
        document.getElementsByTagName("canvas")[0].classList.add("invisivel");
        butao.focus();
        setTimeout(function(){ 
            tecladoAberto = true;
        },300);
    }

    document.body.appendChild(butao);
}



document.onfullscreenchange = window.onresize = function(){ 
    if(typeof document.onfullscreenchange == "undefined" || isFullscreen() && window.innerWidth > window.innerHeight){
        startMobile(); 
    }
    if(mobile==true && tecladoAberto == true){
        tecladoAberto = false;
        butao.blur();
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
