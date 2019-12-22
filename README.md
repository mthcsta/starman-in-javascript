# STARMAN

__Jogo:__ STARMAN (baseado no defender)
__Data de criação:__ Dezembro de 2019

__Descrição detalhada:__
Este jogo foi feito como um trabalho final para a cadeira de Algoritmos e Programação na linguagem C da faculdade. Como tenho um grande amor ao javascript, passei para a linguagem, refazendo algumas funções e modificações que fossem necessárias. 
Este jogo funciona tanto em computador como em smartphones.

## Controles
### Computador
#### Movimentos
__W__: mover a nave para cima

__S__: mover a nave para baixo

__A__: diminuir velocidade da nave

__D__: aumentar velocidade da nave

#### Ações
__ESPAÇO__: atira 

__G__: salva estado


### Smartphone
#### Movimentos
Para fazer os movimentos da nave você precisa arrastar o dedo na tela, cada direção é um movimento

__cima__: mover a nave para cima

__baixo__: mover a nave para baixo

__esquerda__: diminuir velocidade da nave

__direita__: aumentar velocidade da nave

#### Ações
__TOQUE NA TELA__: atira



## Para Desenvolvedores
Para compilar o jogo você precisará ter em sua maquina o node, npm e Grunt instalados.

Ao baixar o jogo, na pasta do projeto, rode o comando:

``npm i``

_para que as dependencias sejam instaladas_



Para compilar os arquivos javascript, na pasta do projeto, rode o comando:


``grunt concat``

_este comando irá fazer uma compilação de todos os arquivos .js contidos na pasta __inc__ para o arquivo main.js_

