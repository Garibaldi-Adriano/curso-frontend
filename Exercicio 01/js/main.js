window.onload = function () {
    checkIfLoggedIn();

    // Manipula o botão de logout após a página ser carregada
    document.getElementById("logoutButton").addEventListener("click", function () {
        auth.logoutUser();
    });
};

// Função para verificar se o usuário está logado
function checkIfLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Se o usuário não estiver logado, redireciona para a página de login
    if (!loggedInUser) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "index.html";
    } else {
        // Exibir o nome e email do usuário na página
        document.getElementById("userName").textContent = `${loggedInUser.name}`;
        document.getElementById("userEmail").textContent = `${loggedInUser.email}`;

        // Alterar o título da página para incluir o email do usuário
        document.title = `Main - ${loggedInUser.email}`;
    }
}