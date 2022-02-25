const api = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts';

let nome;
let url_img;
let options = [3];

getNome();
function getNome() {
    nome = prompt("Qual é o seu nome?");
}

let count = 0;
function escolher(id, sec, tipo, posicao) {
    options[posicao] = tipo;
    const selecao = document.querySelector(`#${sec} figure .slecao_border`);
    if (selecao != null) {
        selecao.classList.remove("slecao_border");
        count--;
    }
    document.querySelector(`#${id} div`).classList.add("slecao_border");
    count++;
    verificaSelecoes();
}

function verificaSelecoes() {
    url_img = document.querySelector(".imageLink").value;
    if (count >= 3 && url_img != "") {
        const botton = document.querySelector(".Pedido");
        botton.classList.add("clicavel");
        botton.setAttribute("onclick", "enviarPedido()");
    }
}

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
        verificaSelecoes();
    }
});

function enviarPedido() {
    const obj = {
        "model": options[0],
        "neck": options[1],
        "material": options[2],
        "image": url_img,
        "owner": nome,
        "author": nome
    }
    const promise = axios.post(api, obj);
    promise.then(alert("tudo certo"));
    promise.catch(alert("deu bo"));
}