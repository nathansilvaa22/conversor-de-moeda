const valorNaTelaDollar = document.getElementById('dollar-value');
const valorNaTelaEuro = document.getElementById('euro-value');
const valorInput = document.getElementById('amount');  
const resposta = document.querySelector('.resposta');

const currencySelect = document.getElementById('currency');

const api = async () => {
    try {
        const res = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        resposta.innerHTML = "Erro ao buscar dados da API.";
        return null;
    }
}

const mostrarDollarNaTela = async () => {
    const data = await api();

    if (!data) return;
      
    const dolarData = data.USDBRL.ask;
    const euroData = data.EURBRL.ask;

    valorNaTelaDollar.innerHTML = `R$ ${parseFloat(dolarData).toFixed(2)}`;
    valorNaTelaEuro.innerHTML = `R$ ${parseFloat(euroData).toFixed(2)}`;
}

mostrarDollarNaTela();

mostrarDollarNaTela();

const convertCurrency = async () => {
    const valor = parseFloat(valorInput.value);  // Converte o valor do input para número
    if (isNaN(valor)) {
        resposta.innerHTML = "Por favor, insira um valor válido.";
        return;
    }

    const data = await api();
    if (!data) return;  // Verifica se os dados foram retornados corretamente

    const moedaSelecionada = currencySelect.value;  // Obtém o valor selecionado

    let taxaCambio;

    if (moedaSelecionada === 'dolar') {
        taxaCambio = parseFloat(data.USDBRL.ask);
    } else if (moedaSelecionada === 'euro') {
        taxaCambio = parseFloat(data.EURBRL.ask);
    } else {
        resposta.innerHTML = "Moeda não suportada.";
        return;
    }

    if (isNaN(taxaCambio)) {
        resposta.innerHTML = "Erro ao obter a taxa de câmbio.";
        return;
    }

    const resultado = valor * taxaCambio;
    resposta.innerHTML = `R$ ${resultado.toFixed(2)}`;  // Formata o resultado para duas casas decimais
}

