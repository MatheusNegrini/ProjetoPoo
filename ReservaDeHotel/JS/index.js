function validarData(data) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/; // Formato dd/mm/aaaa
    return regex.test(data);
}

function calcularValorTotal(precoNoite, numNoites, taxaLimpeza) {
    return (precoNoite * numNoites) + taxaLimpeza;
}

function verificarCampos() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const hospedesInput = document.getElementById('hospedes');
    const erroReserva = document.getElementById('erro-reserva');

    if (!checkinInput.value || !checkoutInput.value || !hospedesInput.value) {
        erroReserva.textContent = "Preencha todos os campos.";
        erroReserva.style.display = "block";
        return false;
    }

    if (!validarData(checkinInput.value) || !validarData(checkoutInput.value)) {
        erroReserva.textContent = "As datas devem estar no formato dd/mm/aaaa.";
        erroReserva.style.display = "block";
        return false;
    }

    const checkinDate = new Date(checkinInput.value.split('/').reverse().join('-'));
    const checkoutDate = new Date(checkoutInput.value.split('/').reverse().join('-'));

    if (checkoutDate <= checkinDate) {
        erroReserva.textContent = "A data de Check-out deve ser posterior à data de Check-in.";
        erroReserva.style.display = "block";
        return false;
    }

    if (parseInt(hospedesInput.value) < 1) {
        erroReserva.textContent = "A quantidade de hóspedes deve ser pelo menos 1.";
        erroReserva.style.display = "block";
        return false;
    }

    erroReserva.style.display = "none";
    return true;
}

function mostrarPopupQuartos() {
    if (verificarCampos()) {
        const popupQuartos = document.getElementById("popup-quartos");
        popupQuartos.style.display = "block";
    }
}

function fecharPopupQuartos() {
    const popupQuartos = document.getElementById("popup-quartos");
    popupQuartos.style.display = "none";
}

function escolherQuarto(tipoQuarto) {
    const precos = {
        "Deluxe": 1286,
        "Master": 732,
        "Standard": 358
    };
    const taxaLimpeza = 350;
    const numHospedes = parseInt(document.getElementById('hospedes').value);
    const checkinDate = new Date(document.getElementById('checkin').value.split('/').reverse().join('-'));
    const checkoutDate = new Date(document.getElementById('checkout').value.split('/').reverse().join('-'));
    const numNoites = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));

    const valorTotal = calcularValorTotal(precos[tipoQuarto], numNoites, taxaLimpeza);

    mostrarRecibo(tipoQuarto, numHospedes, numNoites, valorTotal);
    fecharPopupQuartos(); // Fecha o popup de escolha de quarto após selecionar
}

function mostrarRecibo(tipoQuarto, numHospedes, numNoites, valorTotal) {
    const popupRecibo = document.getElementById("popup-recibo");
    popupRecibo.innerHTML = `
        <p>Modelo do Quarto: ${tipoQuarto}</p>
        <p>Quantidade de Hóspedes: ${numHospedes}</p>
        <p>Número de Diárias: ${numNoites}</p>
        <p>Valor Total: R$ ${valorTotal.toLocaleString('pt-BR')}</p>
        <button onclick="fecharRecibo()">Fechar</button>
    `;
    popupRecibo.style.display = "block";
}

function fecharRecibo() {
    const popupRecibo = document.getElementById("popup-recibo");
    popupRecibo.style.display = "none";
}

// Adicionando event listener para o botão de fechar do popup de quartos
document.querySelector('#popup-quartos button:last-child').addEventListener('click', fecharPopupQuartos);
