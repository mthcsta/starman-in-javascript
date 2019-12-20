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
    gotoxy(str, Math.round(50 - str.length/2), linha);
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
	var e = document.getElementsByTagName("canvas")[0]; // element
	(e.requestFullscreen && e.requestFullscreen())
	||
	(e.msRequestFullscreen && e.msRequestFullscreen())
	||
	(e.mozRequestFullScreen && e.mozRequestFullScreen())
	||
	(e.webkitRequestFullscreen && e.webkitRequestFullscreen());
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
function controleMenu(c, selecionado_indice){
    c = c.toLowerCase();
    switch(c){//o char eh convertido em minúsculo pra evitar erro de Capslock
        case 's': //se a entrada for um S (pra baixo)
            if(selecionado_indice<2) //verifica se está no ultimo item
                ponteiro.selecionado_indice+=1;//senão, leva o cursor pro prox item
          else ponteiro.selecionado_indice=0;//se sim, leva o cursor pro primeiro item
           
              break;
      case 'w'://se a entrada for um W (pra cima)
          if(selecionado_indice>0)//verifica se esta no primeiro item
            ponteiro.selecionado_indice-=1;//senão, leva o cursor pro item de cima
          else ponteiro.selecionado_indice=2;//se sim, leva o cursor para baixo
          break;
      case ' '://se a entrada for o espaço
      case 10://ou enter
          return selecionado_indice; //termina a função
          break;
      default: break;
  }

  return -1;
}

function controlePartida(c){

    c = c.toLowerCase(); //evita que o controle nao funcione caso o capslock esteja ativado

    switch(c){
        case 's': //se a entrada eh a tecla s
            if(!ehParede((jogador.x+ponteiro.posicao) % DEFINE.COLUNAS_MAPA, jogador.y+1)){//caso a prox pos pra baixo do jogador nao seja PAREDE
                jogador.y+=1;                                     //desloca a nave para baixo
            }
            break;
        case 'w': //se a entrada eh a tecla w
            if(!ehParede((jogador.x+ponteiro.posicao) % DEFINE.COLUNAS_MAPA, jogador.y-2) && !ehParede((jogador.x+ponteiro.posicao) % DEFINE.COLUNAS_MAPA, jogador.y-1)){//caso a prox pos pra cima do jogador nao seja PAREDE
                jogador.y-=1;                                   //desloca a nave para cima
            }
            break;
        case 'd'://se a entrada eh a tecla s
            if(jogador.velocidade < DEFINE.VEL_MAX){ //confere se a velocidade eh menor que a max
                jogador.velocidade++;               //antes de acelerar mais
            }
            break;
        case 'a'://se a entrada eh a tecla a
            if(jogador.velocidade > DEFINE.VEL_MIN){ //confere se a velocidade ainda eh maior que a min
                jogador.velocidade--;               //antes de desacelerar
            }
            break;
        case ' '://se a entrada eh um espaço
            if(ponteiro.intervalo==0){ //(cooldown) se o tiro nao foi dado recentemente
		    //gera o tiro a partir da posição do jogador, dentro dos limites da tela
		    //ex.:tela na pos 400, jogador na pos 19: pos do jogador=419
		    //sendo o limite da tela 414, %COLUNAS_MAPA garante que o tiro iniciará na pos verdadeira
		    //do jogador(x=4)
                geraTiro(1, (jogador.x + ponteiro.posicao) % DEFINE.COLUNAS_MAPA, jogador.y);
                ponteiro.intervalo = DEFINE.INTERVALO_TIRO;//e atribui um valor de espera para novo tiro
            }
            break;

        case 'g'://se a entrada eh um g
            //*salvar_estado = 1; //o estado do jogo é salvo
            break;

        default:
         break;
    }    
    return 0;
}
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
    "SALVE_ARQUIVO": "dados/salve.bin",
    "NIVEL_INEXISTENTE": -5,
    "NOME_MAPA_TAMANHO": 50,
    "MAPA_CAMINHO": "mapas/nivel%d.txt",
    "MUSICA_TEMA": 1,
    "BUFFER_TAMANHO": 6, // tamanho do buffer de som que sera pego para reproduzir do arquivo mp3

    "CLASSIFICADOS_ARQUIVO": "dados/classificados.bin",
    "LIMITE_CLASSIFICADOS": 3,
    "NOME_TAMANHO_MAXIMO": 12,


// Tiro
    "MAX_TIROS": 15,
    "VEL_BALA": 2,
    "DURACAO_TIRO": 100,

// Jogador
    "DURACAO_ANIMACAO": 15,
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

boneco_t = function(x, y, nvidas, velocidade){ return {x, y, nvidas, velocidade} };

tiro_t = function(x, y, prop, duracao){ return {x, y, prop, duracao} };

/*********************** */

/** Canvas Game Box */

document.body.style.backgroundColor = "#1b1b1b";

canvas = document.createElement("canvas")
context = canvas.getContext('2d')

document.body.appendChild(canvas)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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
    tocandoTema: 0
};


/** Mapa Info. */

var i;
var coluna;
var linha;
var matriz;
var jpos = 0;
var delta = 0;
var mobile = false;
var espera = 10;



if(canvas.style.display == "none"){
    modeMobile();
    init();
    mobile = true;
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
            case "creditos":
                FIM_DE_JOGO();
            break;
        }
    }

    requestAnimationFrame(main);
}


document.onkeypress = function(e){
    e.preventDefault();

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
                    break;
                }
            }
        break;
        case "partida":
            controlePartida(e.key);
        break;
        default:
            return;
    }
}
document.addEventListener("DOMContentLoaded", main);



function atualizaInimigo(indice){
    var minimo = 1, maximo = 5;//variaveis para sorteio de movimento
    var andou_x=0;

    if(MinMax(1, 10)==5){//gera movimentos esporadicos direcionados ao jogador
        if(inimigo[indice].y > jogador.y){//se o inimigo esta abaixo do jogador
            minimo = maximo = 2;//direciona para o case 2(inimigo se move pra cima)
        }else{
            minimo = maximo = 1;//direciona para o case 1(o inimigo se move pra baixo)
        }
    }

    /**Gera os movimentos dos inimigos***/
    switch(MinMax(minimo, maximo)){//faz um sorteio com srand
        case 1://se a prox pos. do inimigo pra baixo nao eh parede
            if(!ehParede(inimigo[indice].x, inimigo[indice].y+1))
                inimigo[indice].y += 1;//o inimigo se move uma pos. pra baixo
            break;
        case 2://se nem a prox nem a seguinte posição acima do inimigo eh parede
            if(!ehParede(inimigo[indice].x, inimigo[indice].y-2) && !ehParede(inimigo[indice].x, inimigo[indice].y-1))
                inimigo[indice].y -= 1;//o inimigo se move para cima
            break;

        case 3://se as proximas posições do inimigo...
            if(!ehParede(inimigo[indice].x-1, inimigo[indice].y+1) &&//pra esq e pra baixo
	        !ehParede(inimigo[indice].x-1, inimigo[indice].y) && //pra esq
            !ehParede(inimigo[indice].x-1, inimigo[indice].y-2)){//pra esq e acima, nao sao parede
                inimigo[indice].x -= 1;//o inimigo se move pra esq e pra baixo
                inimigo[indice].y += 1;
                andou_x=1;//seu avanço na esq eh marcado(?????)
            }
            break;
        case 4://se a proxima posiçao do inimigo...
            if(!ehParede(inimigo[indice].x-1, inimigo[indice].y-2) &&//pra esq e pra cima
 	        !ehParede(inimigo[indice].x-1, inimigo[indice].y) &&//pra esq
            !ehParede(inimigo[indice].x-1, inimigo[indice].y-1)){//pra esq e pra cima, n eh parede
                inimigo[indice].x -= 1;//move o inimigo pra esq
                inimigo[indice].y -= 1;//e pra cima
                andou_x=1;//seu avanço na esq eh marcado
            }
            break;
        case 5://se a proxima posiçao do inimigo...
            if(!ehParede(inimigo[indice].x-1, inimigo[indice].y)){//pra esq nao eh parede
                inimigo[indice].x -= 1;//o inimigo se move pra esq
                andou_x=1;//seu avanço na esq eh marcado
            }
            break;
        default: break;
    }//caso o inimigo esteja fora da tela, eh reposicionado dentro do mapa
    if(inimigo[indice].y<=0 || inimigo[indice].y>35){
        inimigo[indice].y = DEFINE.LINHAS_MAPA / 2 + 1;
    }
    if(andou_x==1 && inimigo[indice].x<0){
        inimigo[indice].x = DEFINE.COLUNAS_MAPA - 1;
    }
    return;
}

function deletaInimigo(indice){
    inimigo[indice] = inimigo[ponteiro.inimigos_existentes-1];
    ponteiro.inimigos_existentes--;
}

function geraInimigo(x, y){
    inimigo.push(boneco_t(x, y, 1, 1));
}
function geraMapa(indice){
    fopen(DEFINE.MAPA_CAMINHO.replace("%d",indice), 
          function(mapa){
            ponteiro.posicao = 0;
            ponteiro.inimigos_existentes = 0;
            i=0;
            coluna = 0;
            linha = 0;
            matriz = [];
            matriz[0] = [];
            inimigo = [];
            tiro = [];            
            while(c = mapa.charAt(i)){
                if(c != "\n"){
                    
                    if(c == 'C')
                        matriz[linha][coluna++] = DEFINE.PAREDE;
                    else if(c == '@'){
                        jogador.y = linha;
                        jogador.x = coluna;
                        matriz[linha][coluna++] = ' ';
                    }else if(c == 'X'){
                        geraInimigo(coluna, linha);
                        matriz[linha][coluna++] = ' ';
                        ponteiro.inimigos_existentes++;
                    }else 
                        matriz[linha][coluna++] = ' ';
                }else{
                    linha++;
                    matriz[linha] = [];
                    coluna = 0;
                }
                i++;
            }
            ponteiro.partidaStatus = "ativa";
          }, 
          function(){
            TELA = "creditos";
          });
}

function ehParede(x, y){
    return matriz[y] && matriz[y][x] == DEFINE.PAREDE;
}
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

function reproduzir(){
    ponteiro.tocandoTema = 1;
    audio = new Audio('musica/tema.mp3');
    audio.play();

}
function geraPosicao(x, posicao){
    var reposicao = x - posicao;
    if(posicao <= (DEFINE.COLUNAS_MAPA - DEFINE.COLUNAS_TELA) && reposicao>0 && x<DEFINE.COLUNAS_TELA+posicao-1){
        return reposicao;
    }else if(posicao>(DEFINE.COLUNAS_MAPA - DEFINE.COLUNAS_TELA)){
        reposicao = x - posicao;
        if(x<(DEFINE.COLUNAS_MAPA - DEFINE.COLUNAS_TELA)) reposicao += DEFINE.COLUNAS_MAPA;
        if(reposicao>0 && reposicao<(DEFINE.COLUNAS_TELA-1)){
            return reposicao;
        }
    }
    return 0;
}

function atualizaQuadro(){
    var i; // iterador

	// busca todos os tiros existentes no jogo e faz uma checagem
	// se está na mesma posição que um jogador ou inimigo
	// caso esteja, tira a vida dele.
    buscaTiro();

	// Contagens regressivas:
    if(ponteiro.animacao>0) ponteiro.animacao -= 1; // enquanto animação for maior que 0, o jogador fica piscando
    if(ponteiro.intervalo>0) ponteiro.intervalo -= 1; // enquanto intervalo for maior que zero, o jogador nao pode atirar
    if(ponteiro.salvar_estado_mensagem>0) ponteiro.salvar_estado_mensagem -= 1; // enquanto salvar_estado_mensagem for maior que zero, uma mensagem "Estado Salvo" é exibida

	// Checagem se o jogador está encostando em uma parede:
	//  0 indica o primeiro caractere da nave(parte traseira),
	//  3 o ultimo(parte frontal)
    if( ehParede(jogador.x+ponteiro.posicao+0, jogador.y) || //se a pos x do jogador é igual a da parede de trás OU
        ehParede(jogador.x+ponteiro.posicao+1, jogador.y) || //se as partes internas
		ehParede(jogador.x+ponteiro.posicao+2, jogador.y) || // da nave estão numa parede.
        ehParede(jogador.x+ponteiro.posicao+3, jogador.y) ||
        ehParede(jogador.x+ponteiro.posicao+0, jogador.y-1)
	  ){ //se a pos x do jogador é igual a da parede da frente

		if(ponteiro.animacao==0){ // e se o jogador deixou de piscar
			jogador.nvidas--; //o jogador perde uma vida
	        ponteiro.animacao = DEFINE.DURACAO_ANIMACAO; //a perda da vida é sinalizada por animação
		}
        jogador.y = 15; //buscaParede(mapa, jogador.x+posicao+4, 0, 1, 0) + 2; // a posição do jogador é redefinida para um lugar aberto sem parede.
        jogador.velocidade = DEFINE.VEL_MIN; // o jogador volta para a velocidade minima
    }

	// Checando os inimigos existentes:
    for(i=0; i<ponteiro.inimigos_existentes; i++){
		// Checando se o inimigo está encostando no jogador:
        //
        if(typeof inimigo[i] == "object"){

            if( ponteiro.animacao==0 &&
            jogador.x+ponteiro.posicao+0 <= inimigo[i].x+1 && jogador.x+ponteiro.posicao+3 >= inimigo[i].x && //verifica se o jogador e inimigo estão na mesma pos x
                (Math.abs(jogador.y - inimigo[i].y) <= 1)){ //verifica o modulo da distancia vertical entre inimigo e jogador
                jogador.nvidas--; // se o jogador estiver dentro da parte visual do inimigo, jogador perde uma vida.
                ponteiro.animacao = DEFINE.DURACAO_ANIMACAO; //perda da vida sinalizada por animação
            }

            if(MinMax(1, 10) == 5)
                atualizaInimigo(i);

            if(MinMax(0,DEFINE.CHANCE_DE_TIRO)==DEFINE.CHANCE_DE_TIRO){
                geraTiro(2, inimigo[i].x, inimigo[i].y);
            }

        }
    }
    for(i=0; i<tiro.length; i++){
        if(typeof tiro[i] == "object"){
            if(tiro[i].prop==1){ // tiro do jogador
                tiro[i].x += DEFINE.VEL_BALA * jogador.velocidade;
                if(tiro[i].x>=DEFINE.COLUNAS_MAPA) tiro[i].x = 0;
            }else{ // tiro do inimigo
                tiro[i].x -= DEFINE.VEL_BALA;
                if(tiro[i].x<0) tiro[i].x=DEFINE.COLUNAS_MAPA-1;
            }
            // remove tiro após o fim da duração
            if(tiro[i].duracao==0){
                tiro[i].prop = 0;
            }else tiro[i].duracao--;
        }
    }
    return;
}

function geraQuadro(){
    var i, linha=0, coluna_tela=0, coluna_mapa=0, posicao_inimigo;

    /*** Gerando Jogador ***/
    if(ponteiro.animacao%3==0){

        gotoxy("@", jogador.x, jogador.y-1);
        gotoxy("@@@@", jogador.x, jogador.y);

    }

    /*** Gerando Inimigos ***/
    for(i=0; i<ponteiro.inimigos_existentes; i++){
        if(typeof inimigo[i]=="object"){
            posicao_inimigo = geraPosicao(inimigo[i].x, ponteiro.posicao);
            //console.log(posicao_inimigo);
            if(posicao_inimigo>0){
                gotoxy("XX", posicao_inimigo, inimigo[i].y-1);
                gotoxy("XX", posicao_inimigo, inimigo[i].y);
            }
        }
    }

    /*** Gerando Tiros ***/
    for(i=0; i<tiro.length; i++){
        if(typeof tiro[i] == "object"){
            posicao_inimigo = geraPosicao(tiro[i].x, ponteiro.posicao);
            if(posicao_inimigo>0){
                letter = (tiro[i].prop==1) ? "--" :".";
                gotoxy(letter, posicao_inimigo, tiro[i].y);
            }
        }
    }


    /*** Gerando Paredes ***/

	if(DEFINE.COLUNAS_MAPA - ponteiro.posicao >= DEFINE.COLUNAS_TELA){ // checa se o mapa precisa ser lido o seu inicio
		for(linha=0; linha<DEFINE.LINHAS_MAPA; linha++){ // percorre as linhas
			coluna_tela = 0; // coluna da tela atual(37x105) eh zero
			for(coluna_mapa=ponteiro.posicao; coluna_tela<DEFINE.COLUNAS_TELA; coluna_mapa++, coluna_tela++){ // percorre a coluna
				if(ehParede(coluna_mapa, linha)){ // se encontrar uma parede
                    gotoxy(DEFINE.PAREDE, coluna_tela, linha);
				}
			}
		}
	}else{ // caso precise escrever o inicio da matriz do mapa junto do seu fim...
		for(linha=0; linha<DEFINE.LINHAS_MAPA; linha++){ // percorre as linhas
			coluna_tela = 0; // coluna da tela atual(37x105) eh zero
			for(coluna_mapa=ponteiro.posicao; coluna_mapa<DEFINE.COLUNAS_MAPA; coluna_mapa++, coluna_tela++){ // percorre a coluna
				if(ehParede(coluna_mapa, linha)){ // se encontrar uma parede
					gotoxy(DEFINE.PAREDE, coluna_tela, linha);
				}
			}
			for(coluna_mapa=0; coluna_tela<DEFINE.COLUNAS_TELA; coluna_mapa++, coluna_tela++){ // percorre o resto da coluna
				if(ehParede(coluna_mapa, linha)){ // se encontrar uma parede
                    gotoxy(DEFINE.PAREDE, coluna_tela, linha);
				}
			}
		}
    }
    
    gotoxy("| Fase: "+ponteiro.nivel+" |  Vidas: "+jogador.nvidas+" |  Pontos: "+ponteiro.pontuacao+" | "+ponteiro.posicao, 0, -1, 'red', true);


}
function MENU_INICIAL(){
    var continua = 0;
	var i; // iterador
    var menu=["Novo Jogo", "Carregar Jogo", "Sair"];
    var opcao_menu;

    limpaQuadro();//limpa a tela para escrever um novo quadro
		
	// codigo para as estrelinhas:
	for(i=0; i<5; i++){
        gotoxy("*", MinMax(1, 105), MinMax(1, 35));
	}


    logo();

	// codigo para a lista de opções do menu:
    for(i=0; i<3; i++){
        if(ponteiro.selecionado_indice==i){//verifica onde esta a opção do cursor
            opcao_menu = crimp("> "+menu[i]+" <", 20);
        }else{//para as opcoes nao selecionadas pelo cursor
            opcao_menu = crimp(menu[i], 20);
        }
        gotoxy(opcao_menu, Math.round(50 - opcao_menu.length/2), 12+i);
    }

}

function partida(){
    limpaQuadro();

    if(ponteiro.partidaStatus == "requisitar"){
        ponteiro.partidaStatus = "requisitando";
        if(ponteiro.salve == 1){
            ponteiro.salve = 0;
        }
        geraMapa(ponteiro.nivel);
    }else if(ponteiro.partidaStatus == "ativa"){
        if(ponteiro.inimigos_existentes > 0 && jogador.nvidas > 0){
            ponteiro.posicao+=jogador.velocidade;
            
            if(ponteiro.posicao>=DEFINE.COLUNAS_MAPA){
                ponteiro.posicao = 0;
            }
            if(ponteiro.posicao<0){
                ponteiro.posicao = DEFINE.COLUNAS_MAPA;
            }

            atualizaQuadro();

            geraQuadro();
        }else if(jogador.nvidas <= 0){
            TELA = "creditos";
        }else{
            ponteiro.nivel+=1;
            ponteiro.partidaStatus = "requisitar";
        }
    }
}

function FIM_DE_JOGO(){
    limpaQuadro();
    
    centralize("FIM DE JOGO", 10);
    centralize("Pontuação: "+ ponteiro.pontuacao, 12);
    
    centralize("CRÉDITOS", 18);

	centralize("Programação && Design", 21);
    centralize("Matheus Costa", 23);
	
    centralize("Musica", 26);
	centralize("David Bowie - Starman (8bits)", 28);    

}
function buscaTiro(){
    var i, j; // iteradores

    for(i=0; i<tiro.length; i++){
        if(typeof tiro[i]=="object"){ //se o tiro existe, verifica sua posição em relação ao boneco
             /*****************************/
            /**** Matando os Inimigos ****/
           /*****************************/
            if(tiro[i].prop==1){    //se o tiro é do jogador...
                j = 0;//usamos o indice do inimigo
                while(j<ponteiro.inimigos_existentes){ //enquanto o indice do inimigo for menor q o n de inimigos existentes
                    if(typeof inimigo[j] == "object"){
                        if(Math.abs(tiro[i].x - inimigo[j].x) < (DEFINE.VEL_BALA * 4) &&//confere as coordenandas do inimigo com as do tiro
                            (tiro[i].y==inimigo[j].y || tiro[i].y==inimigo[j].y-1) ){   //se as coordenadas x e y do tiro == as do inimigo
                            inimigo[j].nvidas--;            //o inimigo perde a vida
                            if (inimigo[j].nvidas == 0){    //se o inimigo estiver morto
                                deletaInimigo(j);  //chamamos a funcao pra deleta-lo do vetor
                            }
                            tiro[i].prop=0;  //e o tiro deixa de existir
                            ponteiro.pontuacao+=10; //o jogador ganha 10 pontos
                            console.log("MATOU");
                            j = DEFINE.TOTAL_INIMIGO; //finaliza o laco desse tiro pois n precisa percorrer todos os outros se ja achou o inimigo
                            //printf("\a"); //emite sinal sonoro
                        }
                        //console.log( tiro[i].y, inimigo[j].y, tiro[i].y==inimigo[j].y || tiro[i].y==inimigo[j].y-1 );
                    }
                    j++;
                }
            }



	         /***********************************/
            /*** Matando o Jogador por tiros ***/
	       /***********************************/

            //Se o prop do tiro eh o inimigo e as coordenadas x e y do tiro coincidem com as do jogador, o jogador perde uma vida
            else if(ponteiro.animacao==0 && tiro[i].prop==2 && tiro[i].x>=jogador.x+ponteiro.posicao && tiro[i].x-DEFINE.VEL_BALA<=jogador.x+ponteiro.posicao &&
                    (tiro[i].y==jogador.y || tiro[i].y==jogador.y-1)){
                ponteiro.animacao = DEFINE.DURACAO_ANIMACAO;//o jogador pisca na tela
                jogador.nvidas--;//o jogador perde uma vida
                tiro[i].prop=0; //o tiro deixa de existir
                //printf("\a"); //emite sinal sonoro
            }

        }
    }
    //console.log(tiro);
    tiro = tiro.filter(e=>e.duracao>0);    
    return;    
}

function geraTiro(prop, x, y){
    tiro.push(tiro_t(x, y, prop, DEFINE.DURACAO_TIRO));
}
