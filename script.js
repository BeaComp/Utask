
const darkMode = () => {
    const botaoInterno = document.getElementById("radio-inner")
    var img = document.querySelector("#image")

    const header = document.querySelector("header")
    var imgHeader = document.querySelector("#logo-header")

    const body = document.querySelector("body")

    const frasedodia = document.querySelector("#btnfrase")

    var imgIcone = document.querySelector("#imageIcone")
    

    const footer = document.querySelector("footer")


    if(botaoInterno.classList.contains("active")) {
        botaoInterno.classList.remove("active")
        img.src = "img/light_mode.svg"
        header.classList.remove("dark")
        imgHeader.src = "img/[Imagem] Logo branca.svg"
        body.style.backgroundColor = "#FFFFFF"
        footer.style.backgroundColor = "#114FA7"
        frasedodia.classList.remove("dark")
        imgIcone.src = "img/Ícone.svg"
        

    } else {
        botaoInterno.classList.add("active")
        img.src = "img/dark_mode.svg"
        header.classList.add("dark")
        imgHeader.src = "img/Logo Azul.svg"
        body.style.backgroundColor = "#222222"
        footer.style.backgroundColor = "#111111"
        frasedodia.classList.add("dark")
        imgIcone.src = "img/Icone_Dark.svg"
        
        

    }

    const botaoExterno = document.getElementById("radio-btn")
    if(botaoExterno.classList.contains("fundo")) {
        botaoExterno.classList.remove("fundo")
    } else {
        botaoExterno.classList.add("fundo")
    }

}


const botaoDarkmode = document.getElementById("radio-btn")
botaoDarkmode.onclick = darkMode
