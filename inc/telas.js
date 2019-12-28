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
            carregarNivelEstado();
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
            classifica(ponteiro.pontuacao);
        }else{
            ponteiro.nivel+=1;
            ponteiro.partidaStatus = "requisitar";
        }
    }
}

function CLASSIFICADO(){
    limpaQuadro();

    if(_classificado.posicao == 0){
        centralize("Você  obteve  a maior pontuação! Parabéns.",5);
    }else{
        centralize("Você alcançou uma pontuação considerável para entrar nas 3 classificações, Parabéns!",5);
    }
    centralize("Digite seu nome para ser inserido na lista:", 8);
    centralize(_classificado.nome,10);
}





function FIM_DE_JOGO(){
    limpaQuadro();    

    centralize("FIM DE JOGO", 8);

    if(ponteiro.pontuacao == 1){
        delta = Date.now() * 2;
        listaClassificados(10);
    }else if(ponteiro.pontuacao >= 0){
        centralize("Pontuação: "+ ponteiro.pontuacao, 10);
        setTimeout(function(){ ponteiro.pontuacao = 1; }, 2000);
    }
    
    centralize("CRÉDITOS", 18);

	centralize("Programação && Design", 21);
    centralize("Matheus Costa", 23);
	
    centralize("Musica", 26);
	centralize("David Bowie - Starman (8bits)", 28);    

}