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
