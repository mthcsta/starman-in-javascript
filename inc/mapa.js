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