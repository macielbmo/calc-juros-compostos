// Formata os campos do Input enquanto o cliente digita para o padrão BRL
function formatarMoeda(e) {
    let v = e.target.value.replace(/\D/g, "");
    v = (parseFloat(v) / 100).toFixed(2) + "";
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    e.target.value = v
}

// Formata os valores iseridos nos Input para um padrão que possa ser calculado no JS
function formatarMoedaCaculo(valor) {
    const valorSemPonto = valor.replace(/\./g, "");
    const valorConvertido = valorSemPonto.replace(",", ".");
    const numero = parseFloat(valorConvertido);
    return numero;
}

export { formatarMoeda, formatarMoedaCaculo }