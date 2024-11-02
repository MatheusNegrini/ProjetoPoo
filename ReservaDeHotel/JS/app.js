function obterValorDoElemento(id) {
    return parseFloat(document.getElementById(id).getAttribute("data-preco"));
}

function calcularNoitesEPreco() {
    const checkinDate = document.getElementById("checkin-date").value;
    const checkoutDate = document.getElementById("checkout-date").value;

    if (checkinDate && checkoutDate) {
        const checkin = new Date(checkinDate);
        const checkout = new Date(checkoutDate);

        const diffTime = checkout - checkin;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            const valorPorNoite = obterValorDoElemento("valor-por-noite");
            const taxaLimpeza = obterValorDoElemento("taxa-limpeza");

            const precoTotalNoites = diffDays * valorPorNoite;
            const precoTotal = precoTotalNoites + taxaLimpeza;

            document.getElementById("noites").textContent = diffDays;
            document.getElementById("preco-total-noites").textContent = `R$ ${precoTotalNoites.toLocaleString('pt-BR')}`;
            document.getElementById("preco-total").textContent = `R$ ${precoTotal.toLocaleString('pt-BR')}`;
            return true;
        } else {
            document.getElementById("erro-reserva").textContent = "A data de Check-out deve ser posterior ao Check-in.";
            document.getElementById("erro-reserva").style.display = "block";
            return false;
        }
    } else {
        document.getElementById("erro-reserva").textContent = "Preencha as datas de Check-in e Check-out.";
        document.getElementById("erro-reserva").style.display = "block";
        return false;
    }
}

function alterarHospedes(valor) {
    const inputHospedes = document.getElementById('hospedes');
    const aviso = document.getElementById('aviso');

    let numeroHospedes = parseInt(inputHospedes.value);
    numeroHospedes += valor;

    if (numeroHospedes < 1) {
        numeroHospedes = 1;
    } else if (numeroHospedes > 4) {
        numeroHospedes = 4;
        aviso.style.display = 'block';
    } else {
        aviso.style.display = 'none';
    }

    inputHospedes.value = numeroHospedes;
}

function verificarReserva() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const erroReserva = document.getElementById('erro-reserva');

    const checkinDate = new Date(checkinInput.value);
    const checkoutDate = new Date(checkoutInput.value);

    if (!checkinInput.value || !checkoutInput.value || isNaN(checkinDate) || isNaN(checkoutDate)) {
        erroReserva.textContent = "Preencha as datas de Check-in e Check-out.";
        erroReserva.style.display = "block";
    } else if (checkoutDate <= checkinDate) {
        erroReserva.textContent = "A data de Check-out deve ser posterior à data de Check-in.";
        erroReserva.style.display = "block";
    } else {
        erroReserva.style.display = "none";
        mostrarPopupReserva();
    }
}

function mostrarPopupReserva() {
    alert("Reserva feita com sucesso!");
}

function mostrarPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

document.querySelector(".btn-reservar").addEventListener("click", function () {
    document.getElementById("erro-reserva").style.display = "none";
    if (calcularNoitesEPreco()) {
        mostrarPopup();
    }
});
