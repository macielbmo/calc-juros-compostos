import { formatarMoedaCaculo } from "./formatarMoeda.js"
import { addSectionResultado } from "./sectionResultado.js"

let valorTotalFinal = 0
let valorTotalInvestido = 0
let valorGanhoJuros = 0
let juros = 0
let tempo = 0

// Faz o calculo geral do juros composto e gera o resultado do Total Final, Total Investido e Valor Ganho em Juros
function caclJurosCompostos() {

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

    addSectionResultado()
}

export { caclJurosCompostos, valorTotalFinal, valorTotalInvestido, valorGanhoJuros }