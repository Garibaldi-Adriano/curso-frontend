window.onload = function () {
    checkIfLoggedIn();
};

// Função para verificar se o usuário está logado
function checkIfLoggedIn() {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        // Se o usuário já estiver logado, redireciona para main.html
        window.location.href = "main.html";
    }
}