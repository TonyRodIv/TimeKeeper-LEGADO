// Glaucos (@BigGlaucos)
const sairBtn = document.getElementById('sair');
const trocarContaBtn = document.getElementById('trocarConta');

// A função de sair (logout)
function fazerLogout() {
    localStorage.removeItem('Login');
    window.location.href = '../index.html';
}

// Adiciona o logout aos dois botões
if (sairBtn) {
    sairBtn.addEventListener('click', fazerLogout);
}
if (trocarContaBtn) {
    trocarContaBtn.addEventListener('click', fazerLogout);
}