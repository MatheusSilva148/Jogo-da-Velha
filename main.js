/// VARIÁVEIS

var n_rodadas;

var n_jogadores;

var jogando = false;

var indice_jogador = 0;

var classificado = 0;

var tipo_jogo;

var jogadores = [];

var preenchimento = 0;

var id_rodada = 0;

var cont_rodada = 1;

var vitoria_J1 = 0;

var vitoria_J2 = 0;

var J1_venceu = false;

var J2_venceu = false;

var resultado = "...";

var rodadas = document.getElementById("rodadas");

var class_jog = document.getElementById("class_jog");

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

 function gerarJogadores(){
    for(i = 0; i < n_jogadores; i++){
        let h3 = document.createElement("h3");
        h3.classList.add("nome_jogador");
        h3.innerHTML = jogadores[i].name+": ";
        class_jog.appendChild(h3);

        let outroh3 = document.createElement("h3");
        outroh3.classList.add("status_jogador");
        outroh3.innerHTML = jogadores[i].status;
        class_jog.appendChild(outroh3);

        let br = document.createElement("br");
        br.classList.add("espaco2");
        class_jog.appendChild(br);
    }
}

function atualizar(){
    if(jogando == true){
        for(let x = 0; x < n_jogadores; x++){
            document.getElementsByClassName("status_jogador")[x].innerHTML = jogadores[x].status;
        }
    }
}

function removerJogadores(){
    for(let x=1; x <= n_jogadores; x++){
        document.getElementsByClassName("nome_jogador")[0].remove();
        document.getElementsByClassName("status_jogador")[0].remove();
        document.getElementsByClassName("espaco2")[0].remove();
   }
   jogadores = [];
}

function reiniciarJogadores(){
    for(let x=0; x < n_jogadores; x++){
        jogadores[x].status = "classificado";
    }
    definirJogadores();
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

function verificarRodadas(){
    window.campo = document.getElementsByName("inNumRod")[0];
    window.opt = campo.options[campo.selectedIndex];
    window.num = opt.value;
    n_rodadas = num;

    if(num == ""){
        document.getElementById("msg").innerHTML = "Por favor, selecione o número de rodadas";
    }
    else{
        document.getElementById("msg").innerHTML = "";
        document.getElementById("configuracoes").style.visibility = "hidden";
        document.getElementById("partida").style.visibility = "visible";
        iniciarPartida();
    }
}

function ativarPartida(){
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
}

function iniciarPartida(){
    document.getElementById("nova_partida").type = "hidden";
    document.getElementById("jogar_novamente").type = "hidden";
    document.getElementById("finalizar_partida").type = "hidden";
    ativarPartida();
    criarRodadas();
    definirRodadas();
    if(tipo_jogo == "torneio"){
        jogando = true;
        document.getElementsByClassName("resultado_torneio")[1].innerHTML = "...";
        document.getElementById("novo_torneio").type = "hidden";
        document.getElementById("reiniciar_torneio").type = "hidden";
        classificado = 0;
        criarJogadores();
        definirJogadores();
        gerarJogadores();
    }   
}

function verificarStatus(){
    for(let i=0; i<8; i++){
        if(document.getElementsByClassName("imagem")[verifica[i][0]].getAttribute("src") == "x5.png" && document.getElementsByClassName("imagem")[verifica[i][1]].getAttribute("src") == "x5.png" && document.getElementsByClassName("imagem")[verifica[i][2]].getAttribute("src") == "x5.png"){
            if(tipo_jogo == "partida"){
                document.getElementsByClassName("status_rodada")[id_rodada].innerHTML = "J1 venceu";
            }
            else if(tipo_jogo == "torneio"){
                document.getElementsByClassName("status_rodada")[id_rodada].innerHTML = jogadores[jogador1].name+" venceu";
            }
            J1_venceu = true;
            verificarJogo();
        }
        else if(document.getElementsByClassName("imagem")[verifica[i][0]].getAttribute("src") == "o3.png" && document.getElementsByClassName("imagem")[verifica[i][1]].getAttribute("src") == "o3.png" && document.getElementsByClassName("imagem")[verifica[i][2]].getAttribute("src") == "o3.png"){
            if(tipo_jogo == "partida"){
                document.getElementsByClassName("status_rodada")[id_rodada].innerHTML = "J2 venceu";
            }
            else if(tipo_jogo == "torneio"){
                document.getElementsByClassName("status_rodada")[id_rodada].innerHTML = jogadores[jogador2].name+" venceu";
            }
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
    tirarFuncoes();
    preenchimento = 0;
    document.getElementById("finalizar_partida").type = "button";
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
        if(tipo_jogo == "torneio"){
            document.getElementById("resultado").innerHTML = jogadores[jogador1].name+" venceu";
            jogadores[jogador2].status = "desclassificado";
        }
    }
    else if(vitoria_J2 > vitoria_J1){
        document.getElementById("resultado").innerHTML = "J2 venceu";
        if(tipo_jogo == "torneio"){
            document.getElementById("resultado").innerHTML = jogadores[jogador2].name+" venceu";
            jogadores[jogador1].status = "desclassificado";
        }
    }
    else if (vitoria_J1 == vitoria_J2){
        document.getElementById("resultado").innerHTML = "empate";
    }

    if(tipo_jogo == "partida"){
        document.getElementById("nova_partida").type = "button";
        document.getElementById("jogar_novamente").type = "button";
    }
    else if(tipo_jogo == "torneio"){
        verificarTorneio();
    }
}

function novaPartida(){
    jogando = false;
    removerRodadas();
    document.getElementById("configuracoes").style.visibility = "visible";
    document.getElementById("partida").style.visibility = "hidden";
}

function jogarNovamente(){
    document.getElementById("jogar_novamente").type = "hidden";
    document.getElementById("nova_partida").type = "hidden";
    ativarPartida();
    definirRodadas();
    if(tipo_jogo == "torneio"){
        document.getElementById("proxima_partida").type = "hidden";
        definirJogadores();
    }
}

// MANIPULAÇÃO DO TORNEIO

function verificarConfig(){
    window.campo = document.getElementsByName("inNumJog")[0];
    window.opt = campo.options[campo.selectedIndex];
    window.num = opt.value;

    window.campo2 = document.getElementsByName("inNumRod")[0];
    window.opt2 = campo2.options[campo2.selectedIndex];
    window.num2 = opt2.value;

    if(num == "" && num2 != ""){
        document.getElementById("msg").innerHTML = "Por favor, selecione o número de jogadores";
    }
    else if(num2 == "" && num != ""){
        document.getElementById("msg").innerHTML = "Por favor, selecione o número de rodadas";
    }
    else if(num == "" && num2 == ""){
        document.getElementById("msg").innerHTML = "Por favor, selecione o número de jogadores e rodadas";
    }
    else{
        document.getElementById("msg").innerHTML = "";
        n_jogadores = num;
        n_rodadas = num2;
        document.getElementById("configuracoes").style.visibility = "hidden";
        document.getElementById("partida").style.visibility = "visible";
        iniciarPartida();
    }
}

function criarJogadores(){
    for(let x = 1; x <= n_jogadores; x++){
        let jogador = {
            "name": "Jogador"+x,
            "status": "classificado"
        } 
        jogadores.push(jogador);
    }
}

function definirJogadores(){
    jogador1 = (Math.floor(Math.random() * (n_jogadores - 1 + 1)) + 1) - 1;
    jogador2 = (Math.floor(Math.random() * (n_jogadores - 1 + 1)) + 1) - 1;
    if(jogadores[jogador1].status == "classificado" && jogadores[jogador2].status == "classificado" && jogador1 != jogador2){
        document.getElementById("jogadores").innerHTML = jogadores[jogador1].name+" x "+jogadores[jogador2].name;
    }
    else{
        definirJogadores();
    }
}

function verificarTorneio(){
    classificado = 0;
    for(let x = 0; x < n_jogadores; x++){
        if(jogadores[x].status == "classificado"){
            classificado++;
            indice_jogador = x;
        }
    }
    if(classificado == 1){
        document.getElementsByClassName("resultado_torneio")[1].innerHTML = jogadores[indice_jogador].name+" venceu";
        document.getElementById("novo_torneio").type = "button";
        document.getElementById("reiniciar_torneio").type = "button";
    }
    else{
        document.getElementById("proxima_partida").type = "button";
    }
}

function reiniciarTorneio(){
    document.getElementById("novo_torneio").type = "hidden";
    document.getElementById("reiniciar_torneio").type = "hidden";
    ativarPartida();
    definirRodadas();
    reiniciarJogadores();
    document.getElementsByClassName("resultado_torneio")[1].innerHTML = "...";
}

function novoTorneio(){
    jogando = false;
    removerRodadas();
    removerJogadores();
    document.getElementById("configuracoes").style.visibility = "visible";
    document.getElementById("partida").style.visibility = "hidden";
}

// MANIPULAÇÃO DO JOGO

function verificarTipo(){
    if(document.URL.includes("partida.html")){
        tipo_jogo = "partida";
    }
    else if(document.URL.includes("torneio.html")){
        tipo_jogo = "torneio";
    }
}

var principal = function(){
    atualizar();
    verificarTipo();
    verificarStatus();
    window.requestAnimationFrame(principal);
}

principal();
