/// VARIÁVEIS

var n_rodadas;

var preenchimento = 0;

var id_rodada = 0;

var cont_rodada = 1;

var vitoria_J1 = 0;

var vitoria_J2 = 0;

var J1_venceu = false;

var J2_venceu = false;

var resultado = "...";

var rodadas = document.getElementById("rodadas");

var verifica = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var contador = 0

var janela = document.getElementsByClassName("janela")[0];

/// FUNÇÕES

// MANIPULAÇÃO DA TELA DO JOGO

function criarTijolos() {
    for (let x=0; x<9; x++) {
        let div = document.createElement("div");
        div.classList.add("tile");
        janela.appendChild(div);
        var tile = janela.getElementsByClassName("tile")[x];
        let img = document.createElement("img");
        img.classList.add("imagem");
        img.src = "blank2.png";
        tile.appendChild(img);
    }
}

criarTijolos();

function adicionarFuncoes() {
    for(i = 0; i < 9; i++){
        document.getElementsByClassName("imagem")[i].addEventListener("click", alternarImagens);
    }
}

function tirarFuncoes() {
    for(i = 0; i < 9; i++){
        document.getElementsByClassName("imagem")[i].removeEventListener("click", alternarImagens);
    }
}

function alternarImagens() {
    contador++;
    if((contador%2) != 0){
        this.src = "x5.png";
        preenchimento++;
        this.removeEventListener("click", alternarImagens);
    }
    else{
        this.src = "o3.png";
        preenchimento++;
        this.removeEventListener("click", alternarImagens);
    }
}

function reiniciarImagens(){
    for(let x = 0; x < 9; x++){
        document.getElementsByClassName("imagem")[x].src = "blank2.png";
    }
}

function criarRodadas(){
    for(i = 1; i <= n_rodadas; i++){
        let h3 = document.createElement("h3");
        h3.classList.add("rodada");
        h3.innerHTML = "Rodada "+ i + ": ";
        rodadas.appendChild(h3);

        let outroh3 = document.createElement("h3");
        outroh3.classList.add("status_rodada");
        rodadas.appendChild(outroh3);

        let br = document.createElement("br");
        br.classList.add("espaco");
        rodadas.appendChild(br);
    }
}

function definirRodadas(){
    for(let x = 0; x < n_rodadas; x++){
        if(x == 0){
            document.getElementsByClassName("status_rodada")[x].innerHTML = "jogando";
        }
        else{
            document.getElementsByClassName("status_rodada")[x].innerHTML = "...";
        }
    }  
    document.getElementById("resultado").innerHTML = resultado;
}

function removerRodadas(){
    for(let x=0; x < n_rodadas; x++){
         document.getElementsByClassName("rodada")[0].remove();
         document.getElementsByClassName("status_rodada")[0].remove();
 
         document.getElementsByClassName("espaco")[0].remove();
    }
 }

// MANIPULAÇÃO DAS RODADAS

function iniciarRodada(){
    if(J1_venceu == true){
        vitoria_J1++;
        J1_venceu = false;
    }
    else if(J2_venceu == true){
        vitoria_J2++;
        J2_venceu = false;
    }
    id_rodada++;
    cont_rodada++;
    contador = 0;
    preenchimento = 0;
    document.getElementsByClassName("status_rodada")[id_rodada].innerHTML = "jogando";
    document.getElementById("proxima_rodada").type = "hidden";
    reiniciarImagens();
    adicionarFuncoes();
}

function encerrarRodada(){
    document.getElementById("proxima_rodada").type = "button";
    tirarFuncoes();
}

// MANIPULAÇÃO DA PARTIDA

function verificarNum(){
    window.campo = document.getElementsByName("inNumRod")[0];
    window.opt = campo.options[campo.selectedIndex];
    window.num = opt.value;
    n_rodadas = num;

    if(num == ""){
        document.getElementById("msg").style.visibility = "visible";
    }
    else{
        document.getElementById("configuracoes").style.visibility = "hidden";
        document.getElementById("partida").style.visibility = "visible";
        iniciarPartida();
    }
}

function iniciarPartida(){
    document.getElementById("nova_partida").type = "hidden";
    document.getElementById("jogar_novamente").type = "hidden";
    document.getElementById("finalizar_partida").type = "hidden";
    reiniciarImagens();
    adicionarFuncoes();
    resultado = "...";
    vitoria_J1 = 0;
    vitoria_J2 = 0;
    id_rodada = 0;
    cont_rodada = 1;
    J1_venceu = false;
    J2_venceu = false;
    contador = 0;
    preenchimento = 0;
    criarRodadas();
    definirRodadas();
}

function verificarStatus(){
    for(let i=0; i<8; i++){
        if(document.getElementsByClassName("imagem")[verifica[i][0]].getAttribute("src") == "x5.png" && document.getElementsByClassName("imagem")[verifica[i][1]].getAttribute("src") == "x5.png" && document.getElementsByClassName("imagem")[verifica[i][2]].getAttribute("src") == "x5.png"){
            document.getElementsByClassName("status_rodada")[id_rodada].innerHTML = "J1 venceu";
            J1_venceu = true;
            verificarJogo();
        }
        else if(document.getElementsByClassName("imagem")[verifica[i][0]].getAttribute("src") == "o3.png" && document.getElementsByClassName("imagem")[verifica[i][1]].getAttribute("src") == "o3.png" && document.getElementsByClassName("imagem")[verifica[i][2]].getAttribute("src") == "o3.png"){
            document.getElementsByClassName("status_rodada")[id_rodada].innerHTML = "J2 venceu";
            J2_venceu = true;
            verificarJogo();
        }
        
        if(preenchimento == 9 && J1_venceu == false && J2_venceu == false){
            document.getElementsByClassName("status_rodada")[id_rodada].innerHTML = "empate";
            verificarJogo();
        }
    }
}

function verificarJogo(){
    if(cont_rodada < n_rodadas){
        encerrarRodada();
    }
    else{
        encerrarPartida();
    }
}

function encerrarPartida(){
    document.getElementById("finalizar_partida").type = "button";
    tirarFuncoes();
    preenchimento = 0;
}

function finalizarPartida(){
    reiniciarImagens();
    document.getElementById("finalizar_partida").type = "hidden";
    if(J1_venceu == true){
        vitoria_J1++;
        J1_venceu = false;
    }
    else if(J2_venceu == true){
        vitoria_J2++;
        J2_venceu = false;
    }
    mostrarResultado();
}

function mostrarResultado(){
    if(vitoria_J1 > vitoria_J2){
        document.getElementById("resultado").innerHTML = "J1 venceu";
    }
    else if(vitoria_J2 > vitoria_J1){
        document.getElementById("resultado").innerHTML = "J2 venceu";
    }
    else if (vitoria_J1 == vitoria_J2){
        document.getElementById("resultado").innerHTML = "empate";
    }
    document.getElementById("nova_partida").type = "button";
    document.getElementById("jogar_novamente").type = "button";
}

function novaPartida(){
    removerRodadas();
    document.getElementById("configuracoes").style.visibility = "visible";
    document.getElementById("partida").style.visibility = "hidden";
}

function jogarNovamente(){
    document.getElementById("jogar_novamente").type = "hidden";
    document.getElementById("nova_partida").type = "hidden";
    reiniciarImagens();
    adicionarFuncoes();
    resultado = "...";
    vitoria_J1 = 0;
    vitoria_J2 = 0;
    id_rodada = 0;
    cont_rodada = 1;
    J1_venceu = false;
    J2_venceu = false;
    contador = 0;
    preenchimento = 0;
    definirRodadas();
}

// MANIPULAÇÃO DO JOGO

var principal = function(){
    verificarStatus();
    window.requestAnimationFrame(principal);
}

principal();