function listaClassificados(linha){
	var i;

    var classificado;
    var classificados;

    var classificados = buscaClassificados();


    centralize("#  | Jogador       | Pontuacao", linha);
    linha+=2;
	for(i=0; i<DEFINE.LIMITE_CLASSIFICADOS; i++){
        classificado = classificados[i];
        centralize(crimp(i, 3)+" "+crimp(classificado.nome, 15)+" "+crimp(classificado.pontuacao, 10), linha);
		linha+=1.5;
	}
	return;
}


function insereClassificado(posicao, pontuacao, nome){
	var i;
    var j;
    
    var classificados = buscaClassificados();
    var novo_classificados = [];
    var novo_classificado = class_t(nome, pontuacao);
    

	for(i=0, j=0; i<DEFINE.LIMITE_CLASSIFICADOS; i++){
		if(posicao==i){
            novo_classificados.push(novo_classificado);
		}else{
            novo_classificados.push(classificados[j]);
			j++;
		}
    }
    if(localStorage){
        localStorage.setItem(DEFINE.CLASSIFICADOS_ARQUIVO, JSON.stringify(novo_classificados));
    }
    return;
}

function classifica(pontuacao){
	var buscando = 1;
	var posicao=0;

    var classificados = buscaClassificados();

	// verifica se o jogador se encaixa em alguma das classificacoes de acordo com sua pontuacao
	do{
		if(classificados[posicao].pontuacao < pontuacao){
			buscando = 0; // caso o usuario se encaixe, a é interrompida
		}else
			posicao++; // caso não se encaixe, pula pra proxima posição
    } while(posicao<DEFINE.LIMITE_CLASSIFICADOS && buscando==1);
    
    if(buscando==0){ // se a busca foi interrompida, então ele foi classificado naquela posição;
        _classificado.posicao = posicao;
        _classificado.pontuacao = pontuacao;
        TELA = "classificado";
        ponteiro.pontuacao = 1;
        return 1;
    }

    TELA = "creditos";

	return 0;
}

function buscaClassificados(){
    if(localStorage){
        if(localStorage.getItem(DEFINE.CLASSIFICADOS_ARQUIVO) != null){
            return JSON.parse(localStorage.getItem(DEFINE.CLASSIFICADOS_ARQUIVO));
        }else{
            geraClassificados();
            return buscaClassificados();
        }
    }
    return;
}

function geraClassificados(){
    var dados;
    if(localStorage){
        dados = [class_t("DAVIDBOWIE69", 500), class_t("MAJORTOM", 200), class_t("DENRITCHIE", 30)];
        localStorage.setItem(DEFINE.CLASSIFICADOS_ARQUIVO, JSON.stringify(dados));
    }
	return;
}
