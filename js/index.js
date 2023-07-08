import { caclJurosCompostos } from "./caclJurosCompostos.js"
import { formatarMoeda } from "./formatarMoeda.js"
import { limparFormulario } from "./limpar.js"

// Bloqueia o ev padrão do formulario
document.getElementById("formulario").addEventListener("submit", function (ev) {
    ev.preventDefault()
})

// Efetua o calculo
document.getElementById('button-calcular').addEventListener('click', caclJurosCompostos)

// Limpa os campos do formuçario
document.getElementById('button-limpar').addEventListener('click', limparFormulario)

// Formata os campos do Input para o padrão BRL
document.getElementById("valor-inicial").addEventListener("keyup", formatarMoeda)
document.getElementById("valor-mensal").addEventListener("keyup", formatarMoeda)
document.getElementById("taxa-juros").addEventListener("keyup", formatarMoeda)