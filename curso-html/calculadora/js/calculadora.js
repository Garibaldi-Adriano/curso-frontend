btnCalcular = document.getElementById('calcular');
btnSelecionar = document.getElementById('operacao');

function calculadora() {
    let numero1 = Number(document.getElementById('valor1').value);
    let numero2 = Number(document.getElementById('valor2').value);
    let opcao = document.getElementById('operacao').value;
    let resposta = 0;

    switch (opcao){
        case 'soma':
            resposta = numero1 + numero2;
            break;
        case 'subtracao':
            resposta = numero1 - numero2;
            break;
        case 'multiplicacao':
            resposta = numero1 * numero2;
            break;
        case 'divisao':
            resposta = numero1 / numero2;
            break;
        case 'resto':
            resposta = numero1 % numero2;
            break;
        default:
            break;
    }
    document.getElementById('resultado').textContent = String(resposta);
}


btnCalcular.addEventListener('click',calculadora);
btnSelecionar.addEventListener('change', calculadora);