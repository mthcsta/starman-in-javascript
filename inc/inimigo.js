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