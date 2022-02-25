const api = 'https://mock-api.driven.com.br/api/v4/shirts-api/shirts';

let nome;
let url_img;
let options = [3];

getNome();
function getNome() {
    nome = prompt("Qual é o seu nome?");
    getPedidos();
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
    promise.then(confirmacao => {
        alert("Pedido confirmado");
    });
    promise.catch(erro => {
        alert("Ops, não conseguimos processar sua encomenda");
    });
}

function getPedidos() {
    axios.get(api).then(printPedido);
}

function printPedido(historico) {
    let i = 0;
    const loads = historico.data;
    if (loads.length > 10){
        i = loads.length - 10;
    }
    document.querySelector(".ultimos_pedidos").innerHTML ='<h2>Ultimos pedidos</h2>'; 
    for (i; i < loads.length; i++) {
        document.querySelector(".ultimos_pedidos").innerHTML += 
        ` <figure class="pedidos_salvos" id='${loads[i].id}'>
        <img src="${loads[i].image}" alt="image">
        <figcaption><P><span>Criador: </span>${loads[i].owner}</P></figcaption>
        </figure> `;
    }
}

