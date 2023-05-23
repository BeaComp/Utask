
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
const abrirModalTask = document.getElementById("addTask");
abrirModalTask.addEventListener('click', (e) => {
    console.log(e)
    const modalTask = document.querySelector(".novatask")
    modalTask.classList.add("mostrar");
});

//Fechar modal da Nova Task
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


// fetch("https://api.adviceslip.com/advice")
//     .then(response => response.json())
//     .then(data => {
//         const fraseOriginal = data.slip.advice;
//         const url = `https://api.mymemory.translated.net/get?q=${fraseOriginal}&langpair=en|pt&key=${'5be2f48704466091a687'}`;

//         fetch(url)
//             .then(response => response.json())
//             .then(data => {
//                 const fraseTraduzida = data.responseData.translatedText;
//                 p.innerText = fraseTraduzida;
//                 pMobile.innerText = p.innerText = fraseTraduzida;
//             })
//             .catch(error => {
//                 elementoErro.innerText = "Ocorreu um erro ao traduzir a frase aleatória.";
//                 elementoErroMobile.innerText = "Ocorreu um erro ao traduzir a frase aleatória.";
//             });
//     })
//     .catch(error => {
//         elementoErro.innerText = "Ocorreu um erro ao obter a frase aleatória.";
//         elementoErroMobile.innerText = "Ocorreu um erro ao obter a frase aleatória.";
//     });








