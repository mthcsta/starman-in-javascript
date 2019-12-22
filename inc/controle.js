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
            console.log("SALVO");
            if(salvarEstado()){
                ponteiro.salvar_estado_mensagem = "Estado Salvo";
            }else{
                ponteiro.salvar_estado_mensagem = "Erro ao Salvar Estado";
            }
            ponteiro.salvar_estado = DEFINE.DURACAO_SALVE_MENSAGEM;
            break;

        default:
         break;
    }    
    return 0;
}

function controleClassificado(c){
    c = c.toLowerCase();
    BotoesPermitidos = ['backspace','enter'];
    if((c.match(/[^ a-z0-9]/g) || c.length>1) && BotoesPermitidos.indexOf(c) == -1) return;
    switch(c){
        case 'enter':
            insereClassificado(_classificado.posicao, _classificado.pontuacao, _classificado.nome);
            TELA = "creditos";
        break;
        case 'backspace':
            _classificado.nome = _classificado.nome.slice(0, -1);
        break;
        case ' ':
        break;
        default:
            _classificado.nome = _classificado.nome.substring(0, 11) +  c.toUpperCase();
        break;
    }
}