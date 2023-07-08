// Limpa apenas a seção de resultado
function limparResultado() {
    const secaoResultado = document.getElementById('section-resultado')
    const div = document.getElementById('div-resultado')

    if (secaoResultado && div) {
        secaoResultado.removeChild(div)
    } else { }
}

// Função limpa o fomulario + seção de resultado
function limparFormulario() {
    const form = document.getElementById('formulario')
    console.log(form.value)
    form.reset()

    form.scrollIntoView({ behavior: 'smooth' })

    limparResultado()
}

export { limparResultado, limparFormulario }