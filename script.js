/*----------------------------------- Temp --------------------------------*/
function inicio_cadastro(){

    if (pecas[0].length == 0){
        pecas = localStorage.getItem("cadastro")
    }
        
};

function cadastro_peca(){
    let num = pecas.codigo.length + 1;

    /* Código */
    let codigo = String(num).padStart( 3 , "0" );
    pecas.codigo.push(codigo);


    /* Marca */
    let marca = document.getElementById("catalogo_marca").value
    pecas.marca.push(marca);

    /* Nome do produto */
    let nome = document.getElementById("catalogo_nome").value
    pecas.nome.push(nome);

    /* Categoria */
    let categoria = document.getElementById("catalogo_categoria").value
    pecas.categoria.push(categoria);

    /* Quantidade por embalagem */
    let quantidade = document.getElementById("catalogo_quantidade").value
    pecas.quantidade.push(quantidade);

    /* Preco */
    let preco = document.getElementById("catalogo_preco").value
    pecas.preco.push(preco);

    /* histórico */
    let historico = []
    pecas.historico.push(historico);

    alert(pecas.codigo, pecas.nome, pecas.marca, pecas.categoria, pecas.quantidade, pecas.preco, pecas.historico)
}

var pecas = {
    codigo : [],
    nome : [],
    marca : [],
    categoria : [],
    quantidade : [],
    preco : [],
    historico : []
}




/*----------------------------- página Index.html ----------------------------*/
var user


function inicio(){
    user = 'Visitante'
}

    /*Login*/
function login_index(){

    var user;
    let login;
    let senha;

    login = document.getElementById("login").value;
    senha = document.getElementById("senha").value;

    if (login == "Admin"  && senha == "1234"){
        user =  "Admin";
        alert(user);
        localStorage.setItem('user', user)
        window.location.href = "menu.html";

    } 
    else{
        alert("Login ou senha são inválidos");
    } 
}


function Visitante(){
    user = "Visitante"
    localStorage.setItem('user', user)
}
/*----------------------------- Página Menu.html --------------------------------- */

/* Validação do Usuário. */
function armazenamento(){
    user = localStorage.getItem("user")
    if(user == "Admin"){

    }
    else if(user == "Visitante"){
        user = "Visitante"
        document.getElementById("username").innerText = "Visitante"
    }
}



/* Rastreio */
function faz_rastreio(){
    let rastreio = document.getElementById('cod_rastreio').value;
    alert(rastreio)
    alert('O rastreio de peças não está implementado')
}

/*Saída de peças */

function ir_saida_pecas(){
    var user = localStorage.getItem("user")

    if (user == "Admin"){
        window.location.href = "saida_pecas.html";
    }
    else{
        alert("Você não possui permissão para acessar a saída de peças")

    }
    };

/*Entrada de Peças*/
function ir_entrar_pecas(){
    var user = localStorage.getItem("user")

    if(user == "Admin"){
    window.location.href = "entrada_pecas.html";
    }
    else(alert("Você não possui permissão para acessar a saída de peças"))
    };

/*Relatório*/
function gera_relatorio(){
    alert('Relatório ainda não foi implementado.')
}

/* Cadastro de peças */
function ir_cadastro_pecas(){
    var user = localStorage.getItem("user")

    if(user == 'Admin'){
        window.location.href = "cadastro.html"
    }
    else(alert("Você não possui permissão para acessar o cadastro de peças"))
    };

/* Estoque */

function ir_estoque(){
    window.location.href = "estoque.html";

    };

/* Catalogo */

function ir_catalogo(){
    window.location.href = "catalogo.html";
    };