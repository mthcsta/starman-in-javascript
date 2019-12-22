function salvarEstado(){
    // ponteiro contem:
    // Nivel, Posicao, Pontuacao, inimigos_existentes,
    // Animacao, Intervalo
    // -----------------------------------------------------
    // jogador contem a estrutura boneco_t do jogador 
    // tiro contem a estrutura tiro_t dos tiros(de jogador e inimigo)
    // inimigo contem a estrutura boneco_t dos inimigos
    if(localStorage){
        dados = {ponteiro: ponteiro, 
                jogador: jogador, 
                tiro: tiro, 
                inimigo: inimigo};

        localStorage.setItem(DEFINE.SALVE_ARQUIVO, JSON.stringify(dados));
        return true;
    }
    return false;
}

function carregarNivelEstado(){
    if(localStorage){
        if(localStorage.getItem(DEFINE.SALVE_ARQUIVO) != null){
            ponteiro.nivel = JSON.parse(localStorage.getItem(DEFINE.SALVE_ARQUIVO)).ponteiro.nivel;
            return;
        }
    }
    ponteiro.salve = 0;
	return;
}


function carregarEstado(){
    if(localStorage){
        if(localStorage.getItem(DEFINE.SALVE_ARQUIVO) != null){
            dados = JSON.parse(localStorage.getItem(DEFINE.SALVE_ARQUIVO));
            ponteiro = dados.ponteiro;
            jogador = dados.jogador;
            tiro = dados.tiro;
            inimigo = dados.inimigo;
        }
    }
    ponteiro.salve = 0;
    return;
}
