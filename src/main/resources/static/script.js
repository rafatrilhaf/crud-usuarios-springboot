const formulario = document.querySelector("form");
const Deletar = document.querySelector(".deletar");
const Inome = document.querySelector(".nome");
const Iemail = document.querySelector(".email");
const Isenha = document.querySelector(".senha");
const Itel = document.querySelector(".tel");
const Iid = document.querySelector(".id");
const Pesquisar = document.querySelector(".pesquisar");

function cadastrar() {
    fetch("http://localhost:8080/usuarios", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            nome: Inome.value,
            email: Iemail.value,
            senha: Isenha.value,
            telefone: Itel.value
        })
    })
        .then(response => response.json())
        .then(data => console.log("Usuário cadastrado com sucesso", data))
        .catch(error => console.error("Erro ao cadastrar o usuário", error));

}
function pesquisar() {
    const id = Iid.value;

    if (!id) {
        console.error("O ID não foi fornecido");
        return;
    }

    fetch(`http://localhost:8080/usuarios/${id}`, {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Usuário pesquisado:", data);

        // Preenche os campos
        Inome.value = data.nome || "";
        Iemail.value = data.email || "";
        Isenha.value = data.senha || "";
        Itel.value = data.telefone || "";

        console.log("Campos preenchidos com sucesso");
    })
    .catch(error => {
        console.error("Erro ao buscar o usuário:", error);
    });
};
function apagar() {
    const id = Iid.value;
    if (!id) {
        console.error("ID não fornecido");
        return;
    }
    fetch(`http://localhost:8080/usuarios/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.ok) {
                console.log(`Usuário com ID ${id} deletado com sucesso`);
            } else {
                console.error('Erro ao deletar usuário:', response.statusText);
            }
        })
        .catch(error => console.error('Erro de rede:', error));
};

function limpar() {

    Inome.value = "";
    Iemail.value = "";
    Isenha.value = "";
    Iid.value = "";
    Itel.value = "";
};
formulario.addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrar();
    limpar();
});
Deletar.addEventListener('click', function (event) {
    apagar();
    limpar();
})
Pesquisar.addEventListener('click', function (event) {
    pesquisar();
});