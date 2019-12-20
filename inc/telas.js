/*****************************************/
/****** * * * MENU INICIAL * * * ********/
/***************************************/

function usleep(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

function limpaQuadro(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function MinMax(min, max){
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function MENU_INICIAL(){
    var continua = 1;
	var i; // iterador
    var selecionado_indice = 0;
    var menu=["Novo Jogo", "Carregar Jogo", "Sair"];
    var opcao_menu;

    while(continua){ //enquanto a opção do índice nao foi selecionada
        /*
        if(kbhit()){//verifica se um botão foi pressionado
			// se sim, passa pro controleMenu e espera uma resposta...
			if(controleMenu(getchar(), &selecionado_indice)!=-1){ // se o retorno de controleMenu() for diferente de -1, o botão press. foi ENTER/ESPAÇO
				return selecionado_indice; // retorna o indice do botão selecionado na hora que apertou ENTER/ESPAÇO
			}
        }
		*/

        limpaQuadro();//limpa a tela para escrever um novo quadro
		
		// codigo para as estrelinhas:
		for(i=0; i<5; i++){
            gotoxy("*", MinMax(1, 105), MinMax(1, 35));
            //printf("\u2726");//gera estrelinhas na tela
		}

		// codigo para a logo do game:
        //logo();//escreve o logo


		// codigo para a lista de opções do menu:
        for(i=0; i<3; i++){
            if(selecionado_indice==i){//verifica onde esta a opção do cursor
                opcao_menu = "> "+menu[i]+" <";
            }else{//para as opcoes nao selecionadas pelo cursor
                opcao_menu = menu[i];
             }
            gotoxy(opcao_menu, 10, 10+i);
        }

		usleep(50000);
        console.log(1);
    }

	return 0;
}
