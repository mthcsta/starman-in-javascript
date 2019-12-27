async function listaClassificados(linha){
	var i;

    var classificado;

    var classificados = await buscaClassificados();

    centralize(crimp("#", 3)+" "+crimp("JOGADOR",16)+" "+crimp("PONTUAÇÃO",14), linha);
    linha+=2;
	for(i=0; i<DEFINE.LIMITE_CLASSIFICADOS; i++){
        classificado = classificados[i];
        centralize(crimp((i+1).toString(), 3)+" "+crimp(classificado.nome, 16)+" "+crimp((classificado.pontuacao).toString(), 13), linha);
		linha+=1.5;
	}
	return;
}


async function insereClassificado(posicao, pontuacao, nome){
    return db.collection("classificados").add({
        nome: nome,
        pontuacao: pontuacao
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        alert("Infelizmente ocorreu um erro na inserção da sua pontuação.\nErro: "+error);
    });
}

async function classifica(pontuacao){
	var buscando = 1;
	var posicao=0;

    var classificados = await buscaClassificados();

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

        criaButao();
        return 1;
    }

    TELA = "creditos";

	return 0;
}

function buscaClassificados(){
    var dados = [];
    return db.collection("classificados").orderBy("pontuacao", "desc").limit(DEFINE.LIMITE_CLASSIFICADOS).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dados.push(doc.data());
            });
            return (dados);
        }).catch(r=>reject(r));
}