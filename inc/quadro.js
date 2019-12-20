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