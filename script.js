
// Dark Mode
const darkMode = () => {
    const botaoInterno = document.getElementById("radio-inner")
    var img = document.querySelector("#image")

    const header = document.querySelector("header")
    var imgHeader = document.querySelector("#logo-header")

    const body = document.querySelector("body")

    const frasedodia = document.querySelector("#btnfrase")
    const fraseMobile = document.querySelector("#btnfraseMobile")
    const modal = document.querySelector("#modal")

    var imgIcone = document.querySelector("#imageIcone")
    var imgIconeMobile = document.querySelector("#imageIconeMobile")
    var imgIconeModal = document.querySelector("#imageIconeModal")

    const footer = document.querySelector("footer")


    if (botaoInterno.classList.contains("active")) {
        botaoInterno.classList.remove("active")
        img.src = "img/light_mode.svg"
        header.classList.remove("dark")
        imgHeader.src = "img/[Imagem] Logo branca.svg"
        body.style.backgroundColor = "#FFFFFF"
        footer.style.backgroundColor = "#114FA7"
        frasedodia.classList.remove("dark")
        fraseMobile.classList.remove("dark")
        imgIcone.src = "img/Ícone.svg"
        imgIconeMobile.src = "img/Ícone.svg"
        modal.classList.remove("dark")
        imgIconeModal.src = "img/Ícone.svg"


    } else {
        botaoInterno.classList.add("active")
        img.src = "img/dark_mode.svg"
        header.classList.add("dark")
        imgHeader.src = "img/Logo Azul.svg"
        body.style.backgroundColor = "#222222"
        footer.style.backgroundColor = "#111111"
        frasedodia.classList.add("dark")
        fraseMobile.classList.add("dark")
        imgIcone.src = "img/Icone_Dark.svg"
        imgIconeMobile.src = "img/Icone_Dark.svg"
        imgIconeModal.src = "img/Icone_Dark.svg"
        modal.classList.add("dark")



    }

    const botaoExterno = document.getElementById("radio-btn")
    if (botaoExterno.classList.contains("fundo")) {
        botaoExterno.classList.remove("fundo")
    } else {
        botaoExterno.classList.add("fundo")
    }

}

const botaoDarkmode = document.getElementById("radio-btn")
botaoDarkmode.onclick = darkMode



//Modal do Mobile
const mostrarModal = () => {
    const modal = document.querySelector(".fundo-modal")
    modal.classList.add("mostrar")
}

const abrirModal = document.querySelector(".fraseMobile")
abrirModal.onclick = mostrarModal

const esconderModal = () => {
    const modal = document.querySelector(".fundo-modal")
    modal.classList.remove("mostrar")
}

const fecharModal = document.querySelector(".btnfechar")
fecharModal.onclick = esconderModal

//Modal da Nova Task
const mostrarModalTask = () => {
    const modalTask = document.querySelector(".novatask")
    modalTask.classList.add("mostrar");
}

const abrirModalTask = document.querySelector(".addTask")
abrirModalTask.onclick = mostrarModalTask


const fecharModalTask = document.querySelector(".btnfecharTask");
fecharModalTask.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.querySelector(".novatask");
    modal.classList.remove("mostrar");
});




//API frase do Dia
const elementoErro = document.getElementById("erro");
const elementoErroMobile = document.getElementById("erroMobile");
const p = document.querySelector("#frase-paragrafo");
const pMobile = document.querySelector("#frase-paragrafoMobile");


fetch("https://api.adviceslip.com/advice")
    .then(response => response.json())
    .then(data => {
        const fraseOriginal = data.slip.advice;
        const url = `https://api.mymemory.translated.net/get?q=${fraseOriginal}&langpair=en|pt&key=${'5be2f48704466091a687'}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const fraseTraduzida = data.responseData.translatedText;
                p.innerText = fraseTraduzida;
                pMobile.innerText = p.innerText = fraseTraduzida;
            })
            .catch(error => {
                elementoErro.innerText = "Ocorreu um erro ao traduzir a frase aleatória.";
                elementoErroMobile.innerText = "Ocorreu um erro ao traduzir a frase aleatória.";
            });
    })
    .catch(error => {
        elementoErro.innerText = "Ocorreu um erro ao obter a frase aleatória.";
        elementoErroMobile.innerText = "Ocorreu um erro ao obter a frase aleatória.";
    });


//Adicionar Tasks
let inputTitulo = document.querySelector('#titulo');
let inputDescricao = document.querySelector('#inputdesc');
let btnnewTask = document.querySelector('#newTask');
const qtdIdsDisponiveis = Number.MAX_VALUE;
let listaTarefas = document.querySelector('.listaTarefas')

btnnewTask.addEventListener('click', (e) => {
    e.preventDefault();

    if (inputTitulo.value === '' & inputDescricao.value === '') {
        alert("Preencha todos os campos!");
       
    }
    else {
        let tarefa = {
            titulo: inputTitulo.value,
            descricao: inputDescricao.value,
            id: gerarId(),
        }
        adicionarTarefa(tarefa);

        console.log(tarefa)
    }
});

function gerarId() {
    return Math.floor(Math.random() * 10);

}

function adicionarTarefa(tarefa) {
    let li = criarTagLI(tarefa);
    listaTarefas.appendChild(li);  
    inputTitulo.value = '';  
    inputDescricao.value = '';
}


//Terminar essa Funcao
function criarTagLI(tarefa) {

    let li = document.createElement('li');
    li.id = tarefa.id;

    let divParte1 = document.createElement('div');
    divParte1.classList.add('parte1');
   
    let p = document.createElement('p');
    p.classList.add('TitleTask');
    p.innerHTML = tarefa.titulo;

    let btn_tres_pontinhos = document.createElement('button');
    btn_tres_pontinhos.classList.add('moveTask');
    btn_tres_pontinhos.innerHTML = '<span class="material-icons-outlined">more_vert</span>';


    let divParte2 = document.createElement('div');
    divParte2.classList.add('parte2');

    //Botao Expand Task
    let spanLerDesc = document.createElement('span');
    spanLerDesc.classList.add('itemDesc');
    spanLerDesc.innerHTML = 'Ler descrição <button class="expand-Ler"><span class="material-icons-outlined">expand_more</span></button>';

    let p_Descricao = document.createElement('p');
    p_Descricao.classList.add('paragradoDes');
    p_Descricao.innerHTML = tarefa.descricao;

   
    //Botao Esconde a Task
    let spanEsconderDesc = document.createElement('span');
    spanEsconderDesc.classList.add('Desc');
    spanEsconderDesc.innerHTML = 'Esconder descrição <button class="expand-Desc"><span class="material-icons-outlined">expand_less</span></button>';

    //Botao move a Task
    let btnMoveTask = document.createElement('button');
    btnMoveTask.classList.add('move');
    btnMoveTask.innerHTML = '<span class="material-icons-outlined">navigate_next</span>';


    
    //Botao Excluir
    let btn_Excluir_Task = document.createElement('button');
    btn_Excluir_Task.classList.add('excluiTask');
    btn_Excluir_Task.innerHTML = '<span class="material-icons-outlined">&#xe92e</span> Excluir';
    // btnExcluir.setAttribute('onclick', 'excluir('+tarefa.id+')');



    li.appendChild(divParte1);
    divParte1.appendChild(p);
    divParte1.appendChild(btn_tres_pontinhos);

    li.appendChild(divParte2);
    divParte2.appendChild(spanLerDesc);
    divParte2.appendChild(btn_Excluir_Task);
    divParte2.appendChild(spanEsconderDesc);
    divParte2.appendChild(btnMoveTask);

    li.appendChild(p_Descricao);

    return li;
}








