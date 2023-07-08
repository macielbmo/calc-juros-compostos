import { valorGanhoJuros, valorTotalFinal, valorTotalInvestido } from "./caclJurosCompostos.js"
import { limparResultado } from "./limpar.js"

export function addSectionResultado() {
    limparResultado()

    const resultado = document.getElementById("section-resultado")
    resultado.scrollIntoView({ behavior: 'smooth' })

    const divResultado = document.createElement("div")
    divResultado.id = "div-resultado"

    const spanTitulo = document.createElement("span")
    spanTitulo.innerText = "Resultado:"
    spanTitulo.className = "titulo-resultado"

    const divDados = document.createElement("div")
    divDados.className = 'div-dados'

    const divVT = document.createElement("div")
    divVT.className = "div-conteudo1"
    const spanVT1 = document.createElement("span")
    spanVT1.innerText = "Valor total final"
    spanVT1.className = 'texto-resultado-valor'
    const spanVT2 = document.createElement("span")
    spanVT2.innerText = valorTotalFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    spanVT2.className = 'resultado-valor-final'

    const divTI = document.createElement("div")
    divTI.className = "div-conteudo2"
    const spanTI1 = document.createElement("span")
    spanTI1.innerText = "Valor total investido"
    spanTI1.className = 'texto-resultado-valor'
    const spanTI2 = document.createElement("span")
    spanTI2.innerText = valorTotalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    spanTI2.className = 'resultado-valor-investido'

    const divTJ = document.createElement("div")
    divTJ.className = "div-conteudo3"
    const spanTJ1 = document.createElement("span")
    spanTJ1.innerText = "Total ganho em juros"
    spanTJ1.className = 'texto-resultado-valor'
    const spanTJ2 = document.createElement("span")
    spanTJ2.innerText = valorGanhoJuros.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    spanTJ2.className = 'resultado-valor-juros'

    divVT.append(spanVT1, spanVT2)
    divTI.append(spanTI1, spanTI2)
    divTJ.append(spanTJ1, spanTJ2)

    divDados.append(divVT, divTI, divTJ)

    divResultado.append(spanTitulo, divDados)

    resultado.append(divResultado)

    maxWidthResultado()
}

// Função para controlar o dimencionamento da seção resultado, em casos de resultados numericos grande, pode acabar quebrando o desing
function maxWidthResultado() {
    const divDados = document.querySelector(".div-dados")
    const divConteudo1 = document.querySelector(".div-conteudo1")
    const divConteudo2 = document.querySelector(".div-conteudo2")
    const divConteudo3 = document.querySelector(".div-conteudo3")

    const contentWidth = divDados.offsetWidth
    const scrollWidth = divDados.scrollWidth

    if (scrollWidth > contentWidth) {
        divDados.style.display = "block"
        divConteudo1.style.marginBottom = "10px"
        divConteudo2.style.marginBottom = "10px"
        divConteudo3.style.marginBottom = "10px"
    }
}