class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class Database {
    // Usuários pré-cadastrados
    static preloadedUsers = [
        new User('Garibaldi', 'gari@asd.com', '123321'),
        new User('Admin', 'admin@admin.com', 'admin')
    ];

    // Carregar usuários do localStorage e mesclar com os pré-cadastrados
    static getUsers() {
        const localStorageUsers = JSON.parse(localStorage.getItem('users')) || [];
        return [...this.preloadedUsers, ...localStorageUsers]; // Mescla os usuários pré-carregados com os do localStorage
    }

    static addUser(user) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        // Salva no localStorage os usuários novos (sem sobrescrever os pré-cadastrados)
        localStorage.setItem('users', JSON.stringify(users));
    }

    static getUserByEmail(email) {
        const users = this.getUsers();
        return users.find(user => user.email === email);
    }

    static isEmailRegistered(email) {
        const users = this.getUsers();
        return users.some(user => user.email === email);
    }
}

class Auth {
    // Cadastrar novo usuário
    registerUser(name, email, password, confirmPassword) {
        if (!this.validatePassword(password, confirmPassword)) {
            this.showError("As senhas não coincidem.", "registerError");
            return false;
        }

        if (Database.isEmailRegistered(email)) {
            this.showError("Este e-mail já está cadastrado.", "registerError");
            return false;
        }

        const newUser = new User(name, email, password);
        Database.addUser(newUser);
        alert("Cadastro realizado com sucesso!");

        // Armazenar o nome e o email do usuário ao registrar
        localStorage.setItem('loggedInUser', JSON.stringify({ name: name, email: email }));
        window.location.href = "main.html";

        const registerModal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
        registerModal.hide();

        return true;
    }

    // Fazer login de um usuário
    loginUser(email, password) {
        const user = Database.getUserByEmail(email);

        if (user && user.password === password) {
            localStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }));
            window.location.href = "main.html";
        } else {
            this.showError("Usuário ou senha incorretos.", "loginError");
        }
    }

    // Fazer logout do usuário
    logoutUser() {
        localStorage.removeItem('loggedInUser');
        // Redireciona para a página de login
        window.location.href = "index.html";
    }

    validatePassword(password, confirmPassword) {
        return password === confirmPassword;
    }

    showError(message, errorElementId) {
        const errorElement = document.getElementById(errorElementId);
        errorElement.style.display = "block";
        errorElement.textContent = message;
    }

    hideError(errorElementId) {
        const errorElement = document.getElementById(errorElementId);
        errorElement.style.display = "none";
    }
}

// Instancia o sistema de autenticação
const auth = new Auth();

// Manipula o formulário de login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    auth.hideError("loginError");
    auth.loginUser(email, password);
});

// Manipula o formulário de cadastro
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    auth.hideError("registerError");
    auth.registerUser(name, email, password, confirmPassword);
});