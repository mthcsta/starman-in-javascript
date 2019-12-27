/* Defines */
//Menu
var DEFINE = {
    "NOVO_JOGO": 0,
    "CONTINUAR_JOGO": 1,
    "SAIR": 2,

// Jogo
    "PAREDE": '█',
    "LINHAS_MAPA": 35,
    "COLUNAS_MAPA": 415,
    "COLUNAS_TELA": 105,
    "SALVE_ARQUIVO": "salve.bin",
    "DURACAO_SALVE_MENSAGEM": 40,
    "NIVEL_INEXISTENTE": -5,
    "MAPA_CAMINHO": "mapas/nivel%d.txt",

    "CLASSIFICADOS_ARQUIVO": "classificados.bin",
    "LIMITE_CLASSIFICADOS": 3,
    "NOME_TAMANHO_MAXIMO": 12,



// Tiro
    "MAX_TIROS": 15,
    "VEL_BALA": 2,
    "DURACAO_TIRO": 100,

// Jogador
    "DURACAO_ANIMACAO": 40,
    "INTERVALO_TIRO": 6,
    "VEL_MIN": 1,
    "VEL_MAX": 3,
    "JOGADOR_NVIDAS": 8,

// Inimigo
    "TOTAL_INIMIGO": 20, //numero máximo de inimigos em cada nivel
    "INIMIGO_MORTO": -5,
    "CHANCE_DE_TIRO": 60 // a chance de o inimigo dar um tiro, de 1 ao definido
}
/*********************** */

/** Structs */

boneco_t = function(x, y, nvidas, velocidade){ return {x:x, y:y, nvidas:nvidas, velocidade:velocidade} };

tiro_t = function(x, y, prop, duracao){ return {x:x, y:y, prop:prop, duracao:duracao} };


class_t = function(nome, pontuacao){ return {nome:nome, pontuacao:pontuacao}; }

/*********************** */

/** Canvas Game Box */

document.body.style.backgroundColor = "#1b1b1b";

canvas = document.createElement("canvas")
context = canvas.getContext('2d')

document.body.appendChild(canvas)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.innerHTML = "Seu navegador não suporta a tag canvas do HTML5";

canvas.style.backgroundColor = "black"
canvas.style.border = "0px solid orangered";
canvas.style.margin = "auto";
canvas.style.display = canvas.width < 700 ? "none" : "block";

/** Game Data */

TELA = "menu";

jogador = boneco_t(0, 0, DEFINE.JOGADOR_NVIDAS, DEFINE.VEL_MIN);

inimigo = [];

tiro = [];

ponteiro = {
    selecionado_indice:0, 
    nivel: 0,
    pontuacao: 0,
    posicao: 0,
    animacao: 0,
    intervalo: 0,
    inimigos_existentes: 0,
    partidaStatus: "requisitar",
    tocandoTema: 0,
    salvar_estado: 0,
    salvar_estado_mensagem: ""
};

_classificado = {posicao:DEFINE.LIMITE_CLASSIFICADOS*2, nome: "", pontuacao: 0};


var tecladoAberto = false;
var mobile = false;
var butao;


/** Mapa Info. */

var i;
var coluna;
var linha;
var matriz;
var jpos = 0;
var delta = 0;
var espera = 10;




if(canvas.style.display == "none"){
    modeMobile();
    init();
    mobile = true;
}
if(window.location.hash != ""){
    startMobile();
}

function main(){

    if(delta<Date.now()){

        delta = Date.now() + espera;

        switch(TELA){
            case "menu":
                MENU_INICIAL();
            break;
            case "partida":
                partida();
            break;
            case "classificado":
                CLASSIFICADO();
            break;
            case "creditos":
                FIM_DE_JOGO();
            break;
        }
    }

    requestAnimFrame(main);
}



function kbhit(e, type){

    e.preventDefault();

    if( TELA == "classificado" && type=="press" || 
        TELA != "classificado" && typeof document.onkeypress != "undefined" && type=="up") return;

    if(ponteiro.tocandoTema==0)
        reproduzir();
    
    switch(TELA){
        case "menu":
            if((ponteiro.selecionado = controleMenu(e.key, ponteiro.selecionado_indice))!=-1){
                switch(ponteiro.selecionado){
                    case 0:
                        TELA = "partida";
                    break;
                    case 1:
                        TELA = "partida";
                        ponteiro.salve = 1;
                    break;
                        case 2:
                        TELA = "creditos";
                        ponteiro.pontuacao = 1;
                    break;
                }
            }
        break;
        case "partida":
            controlePartida(e.key);
        break;
        case "classificado":
            if(tecladoAberto) return;
            controleClassificado(e.key);
        break;
        default:
            return;
    }
}


if(document.onkeypress==null){
    document.onkeypress = function(e){ return kbhit(e, 'press'); }
}
document.onkeyup = function(e){ return kbhit(e, 'up'); }

document.addEventListener("DOMContentLoaded", main);
