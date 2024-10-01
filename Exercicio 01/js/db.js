const Database = {
    users: [
        {
            name: 'Garibaldi',
            email: 'gari@asd.com',
            password: '123321'
        },
        {
            name: 'admin',
            email: 'admin@admin.com',
            password: 'admin'
        }
    ],

    addUser(user) {
        this.users.push(user);
        console.log("Usuário adicionado:", user);
    },

    getUserByEmail(email) {
        return this.users.find(user => user.email === email);
    },

    isEmailRegistered(email) {
        return this.users.some(user => user.email === email);
    }
};
