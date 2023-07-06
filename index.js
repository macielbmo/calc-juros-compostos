const form = document.getElementById("formulario")
form.addEventListener("submit", function (ev) {
    ev.preventDefault()
})

let valorTotalFinal = 0
let valorTotalInvestido = 0
let valorGanhoJuros = 0
let juros = 0
let tempo = 0

// Faz o calculo geral do juros composto e gera o resultado do Total Final, Total Investido e Valor Ganho em Juros
document.getElementById('button-calcular').addEventListener('click', function caclJurosCompostos() {

    const valorInicial = document.getElementById("valor-inicial").value
    const valorMensal = document.getElementById("valor-mensal").value
    const taxaJuros = document.getElementById("taxa-juros").value
    const periodo = document.getElementById("periodo").value

    const vI = formatarMoedaCaculo(valorInicial)
    const vM = formatarMoedaCaculo(valorMensal)
    const tJ = formatarMoedaCaculo(taxaJuros)
    const p = parseFloat(periodo)

    const selectElementJuros = document.getElementById("select-juros").value
    const selectElementPerido = document.getElementById("select-periodo").value

    if (selectElementJuros === "mensal") {
        juros = tJ / 100
        console.log(juros)
    } if (selectElementJuros === "anual") {
        juros = Math.pow(1 + (tJ / 100), 1 / 12) - 1;
    } else { }

    if (selectElementPerido === "meses") {
        tempo = p
    } if (selectElementPerido === "anos") {
        tempo = 12 * p
    } else { }

    const valorFuturoAporteInicial = (vI * (1 + juros) ** tempo);
    const valorFuturoAporteMensal = (vM * ((1 + juros) ** tempo - 1) / juros);

    valorTotalFinal = (valorFuturoAporteInicial + valorFuturoAporteMensal)
    valorTotalInvestido = vI + (vM * tempo)
    valorGanhoJuros = valorTotalFinal - valorTotalInvestido

    addTable()
})

// Adicionação os elementos da seção resultado no DOM
function addTable() {
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

// Formata os campos do Input enquanto o cliente digita para o padrão BRL
function formatarMoeda(e) {
    let v = e.target.value.replace(/\D/g, "");
    v = (parseFloat(v) / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    e.target.value = v
}

const input = document.getElementById("valor-inicial");
const inputMnesal = document.getElementById("valor-mensal")
const inputJuros = document.getElementById("taxa-juros")

input.addEventListener("keyup", formatarMoeda);
inputMnesal.addEventListener("keyup", formatarMoeda)
inputJuros.addEventListener("keyup", formatarMoeda)

// Formata os valores iseridos nos Input para um padrão que possa ser calculado no JS
function formatarMoedaCaculo(valor) {
    const valorSemPonto = valor.replace(/\./g, "");
    const valorConvertido = valorSemPonto.replace(",", ".");
    const numero = parseFloat(valorConvertido);
    return numero;
}

// Limpa apenas a seção de resultado
function limparResultado() {
    const secaoResultado = document.getElementById('section-resultado')
    const div = document.getElementById('div-resultado')

    if (secaoResultado && div) {
        secaoResultado.removeChild(div)
    } else { }
}

// Botão Limpar - limpa o fomulario + seção de resultado
document.getElementById('button-limpar').addEventListener('click', function limparFormulario() {
    const form = document.getElementById('formulario')
    console.log(form.value)
    form.reset()

    form.scrollIntoView({ behavior: 'smooth' })

    limparResultado()
})

function limparFormulario() {
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
};