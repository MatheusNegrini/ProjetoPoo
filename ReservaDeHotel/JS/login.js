// Função para cadastrar usuário
function cadastrarUsuario(nome, telefone, email, senha) {
    // Obter usuários existentes ou inicializar um array vazio
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se o email já está cadastrado
    const usuarioExistente = usuarios.find(usuario => usuario.email === email);
    if (usuarioExistente) {
        alert("Email já cadastrado!");
        return false;
    }

    // Adicionar o novo usuário ao array e armazenar no localStorage
    usuarios.push({ nome, telefone, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert("Cadastro realizado com sucesso!");
    return true;
}

// Função para fazer login
function fazerLogin(email, senha) {
    // Obter lista de usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verificar se existe um usuário com o email e senha fornecidos
    const usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
    if (usuario) {
        alert(`Bem-vindo, ${usuario.nome}!`);
        window.location.href = "./pagina_inicial.html"; // Redireciona para a página inicial após login
    } else {
        alert("Email ou senha incorretos!");
    }
}

// Manipular o evento de cadastro
document.querySelector('.form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const nome = document.querySelector('input[placeholder="Nome"]').value;
    const telefone = document.querySelector('input[placeholder="Telefone"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const senha = document.querySelector('input[placeholder="Senha"]').value;

    // Chamar a função de cadastro
    if (cadastrarUsuario(nome, telefone, email, senha)) {
        window.location.href = "../../index.html"; // Redireciona para a página de login
    }
});
