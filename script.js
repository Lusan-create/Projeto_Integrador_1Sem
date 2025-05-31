/*----------------------------------- Funções --------------------------------*/



/*----------------------------- página Index.html ----------------------------*/
let user = "visitante"
let login;
let senha;

    /*Login*/
function login_index(user){
    login = document.getElementById("login").value;
    senha = document.getElementById("senha").value;

    if (login == "Admin"  && senha == "1234"){
        window.location.href = "menu.html";
        user = "Admin"
    } 
    else{
        alert("Login ou senha são inválidos");
    } 
    }

/*----------------------------- Página Menu.html --------------------------------- */

/* Rastreio */
function faz_rastreio(){
    let rastreio = document.getElementById('cod_rastreio').value;
    alert(rastreio)
    alert('O rastreio de peças não está implementado')
}

/*Saída de peças */

function ir_saida_pecas(user){
    alert("1");
    if (user == "Admin"){
        window.location.href = "saida_pecas.html";
    }
    else(
        alert("Você não possui permissão para acessar a saída de peças")
    )
    };

/*Entrada de Peças*/
function ir_entrar_pecas(user){
    alert(1);
    if(user == "Admin"){
    window.location.href = "entrada_pecas.html";
    }
    else(alert("Você não possui permissão para acessar a saída de peças"))
    };

/*Relatório*/
function gera_relatorio(user){
    alert('Relatório ainda não foi implementado.')
}

/* Cadastro de peças */
function ir_cadastro_pecas(user){
    alert(1);
    if(user == 'Admin'){
        window.location.href = "cadastro.html"
    }
    else(alert("Você não possui permissão para acessar o cadastro de peças"))
    };

/* Estoque */

function ir_estoque(user){
    alert("1");
    window.location.href = "estoque.html";

    };

/* Catalogo */

function ir_catalogo(user){
    alert("1");
    window.location.href = "catalogo.html";
    };