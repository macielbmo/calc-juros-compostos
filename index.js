const form = document.getElementById("formulario")

form.addEventListener("submit", function (ev) {
    ev.preventDefault()
})

let valorFinal = 0
let valorTotalInvestido = 0
let valorGanhoJuros = 0
let juros = 0
let tempo = 0

const input = document.getElementById("valor-inicial");
const inputMnesal = document.getElementById("valor-mensal")

input.addEventListener("keyup", formatarMoeda);
inputMnesal.addEventListener("keyup", formatarMoeda)

function formatarMoeda(e) {
    let v = e.target.value.replace(/\D/g, "");
    v = (parseFloat(v) / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    e.target.value = v
}

function formatarMoedaCaculo(valor) {
    const valorSemPonto = valor.replace(/\./g, "");
    const valorConvertido = valorSemPonto.replace(",", ".");
    const numero = parseFloat(valorConvertido);
    return numero;
}

function calculadoraJurosCompostos() {
    const valorInicial = document.getElementById("valor-inicial").value
    const vI = formatarMoedaCaculo(valorInicial)

    const valorMensal = document.getElementById("valor-mensal").value
    const vM = formatarMoedaCaculo(valorMensal)

    const taxaJuros = document.getElementById("taxa-juros").value
    const tJ = parseFloat(taxaJuros)

    const periodo = document.getElementById("periodo").value
    const p = parseFloat(periodo)

    const selectElementJuros = document.getElementById("select-juros").value
    const selectElementPerido = document.getElementById("select-periodo").value

    if (selectElementJuros === "mensal") {
        juros = tJ / 100
    } if (selectElementJuros === "anual") {
        juros = Math.pow(1 + (tJ / 100), 1 / 12) - 1;
        console.log(juros)
    } else { }

    if (selectElementPerido === "meses") {
        tempo = p
    } if (selectElementPerido === "anos") {
        tempo = 12 * p
    } else { }

    const valorFuturoAporteInicial = (vI * (1 + juros) ** tempo);
    const valorFuturoAporteMensal = (vM * ((1 + juros) ** tempo - 1) / juros);
    valorFinal = (valorFuturoAporteInicial + valorFuturoAporteMensal)
}

function totalInvestido() {
    const valorInicial = document.getElementById("valor-inicial").value
    const vI = formatarMoedaCaculo(valorInicial)
    const valorMensal = document.getElementById("valor-mensal").value
    const vM = formatarMoedaCaculo(valorMensal)

    valorTotalInvestido = vI + vM * tempo
}

function totalGanhoJuros() {
    valorGanhoJuros = parseFloat(valorFinal - valorTotalInvestido)
}

function addTable() {
    limpar()

    const resultado = document.getElementById("resultado-calculo")

    const divResultado = document.createElement("div")
    divResultado.id = "div-resultado"

    const spanTitulo = document.createElement("span")
    spanTitulo.innerText = "Resultado"
    spanTitulo.className = "titulo-resultado"

    const divDados = document.createElement("div")
    divDados.className = 'div-dados'

    const divVT = document.createElement("div")
    const spanVT1 = document.createElement("span")
    spanVT1.innerText = "Valor total final"
    spanVT1.className = 'texto-resultado-valor'
    const spanVT2 = document.createElement("span")
    spanVT2.innerText = valorFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    spanVT2.className = 'resultado-valor-final'


    const divTI = document.createElement("div")
    const spanTI1 = document.createElement("span")
    spanTI1.innerText = "Valor total investido"
    spanTI1.className = 'texto-resultado-valor'
    const spanTI2 = document.createElement("span")
    spanTI2.innerText = valorTotalInvestido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    spanTI2.className = 'resultado-valor-investido'


    const divTJ = document.createElement("div")
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
}

function limpar() {
    const secaoResultado = document.getElementById('resultado-calculo')
    const div = document.getElementById('div-resultado')

    if (secaoResultado && div) {
        secaoResultado.removeChild(div)
    } else { }
}

function limparFormulario() {
    const form = document.getElementById('formulario')
    form.reset()

    limpar()
}