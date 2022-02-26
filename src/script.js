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
        botton.setAttribute("onclick", `enviarPedido('${nome}')`);
    }
}

document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
        verificaSelecoes();
    }
});

function enviarPedido(author) {
    const obj = {
        "model": options[0],
        "neck": options[1],
        "material": options[2],
        "image": url_img,
        "owner": nome,
        "author": author
    };
    const promise = axios.post(api, obj);
    promise.then(confirmacao => {
        alert("Pedido confirmado");
        getPedidos();
    });
    promise.catch(erro => {
        alert("Ops, não conseguimos processar sua encomenda");
    });
}

function reloadPedido(id) {
    let resultado = window.confirm("Confirmar pedido");
    if(resultado){
        url_img = loads[id].image;
        options[0] = loads[id].model;
        options[1] = loads[id].neck;
        options[2] = loads[id].material;
        enviarPedido(loads[id].owner);
    }
}


function getPedidos() {
    axios.get(api).then(printPedido);
}
let loads;
function printPedido(historico) {
    let i = 0;
    loads = historico.data;
    if (loads.length > 10){
        i = loads.length - 10;
    }
    next = loads[i].id;
    document.querySelector(".ultimos_pedidos").innerHTML =''; 
    for (i; i < loads.length; i++) {
        document.querySelector(".ultimos_pedidos").innerHTML += 
        ` <figure class="pedidos_salvos" onclick="reloadPedido(${i})">
        <img src="${loads[i].image}" alt="image">
        <figcaption><P><span>Criador: </span>${loads[i].owner}</P></figcaption>
        </figure> `;
    }
}

let pagina = false;
setInterval(() => {
    if(pagina){
        document.querySelector(".ultimos_pedidos").scrollLeft -= 1090; 
        pagina = !pagina;     
    }else{
        document.querySelector(".ultimos_pedidos").scrollLeft += 1090;
        pagina = !pagina;   
    }
}, 5000);



