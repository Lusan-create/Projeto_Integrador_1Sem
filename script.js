/*----------------------------------- Temp --------------------------------*/




/*----------------------------- página Index.html ----------------------------*/
let user /* Tipo de usuário (Admin ou Visitante) */

    /*Login*/
function login_index(){

    let user;
    let login;
    let senha;

    login = document.getElementById("login").value;
    senha = document.getElementById("senha").value;

    if (login == "Admin"  && senha == "1234"){
        user =  "Admin";
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

/* -------------------------------------------- Cadastro de peças ------------------------------------------------------- */
function ir_cadastro_pecas(){  /* Função para entrada no cadastro.html (Checa se é Admin) */
    var user = localStorage.getItem("user")

    if(user == 'Admin'){
        window.location.href = "cadastro.html"
    }
    else(alert("Você não possui permissão para acessar o cadastro de peças"))
    };


    function inicio_cadastro(){  /* Inicia ao carregar a página e Checa se há algo no local storage. Caso possua alguma informação, ele puxa o local storage. */
    teste = JSON.parse(localStorage.getItem("cadastro"))
    console.log(teste)
    if (pecas.codigo.length == 0 && teste !== null && teste.codigo !== undefined){
        pecas = JSON.parse(localStorage.getItem("cadastro"))
        alert("Local Storage for carregado.")
        console.log(pecas.codigo)
        console.log(pecas.nome)
        console.log(pecas.marca)
        console.log(pecas.categoria)
        console.log(pecas.quantidade)
        console.log(pecas.preco)
        console.log(pecas.historico)
    }
        
};

function cadastro_peca(){ /* Realiza o cadastro de peças puxando as informações em cada campo e as coloca nos atributos do objeto. */
    let num = pecas.codigo.length + 1; /* Número do código. */

    /* Código */
    let codigo = String(num).padStart( 3 , "0" ); /* Formata o código */
    pecas.codigo.push(codigo); /* Armazena */

    /* Guarda as informações */
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

    console.log(pecas.codigo)
    console.log(pecas.nome)
    console.log(pecas.marca)
    console.log(pecas.categoria)
    console.log(pecas.quantidade)
    console.log(pecas.preco)
    console.log(pecas.historico)

    localStorage.setItem("cadastro", JSON.stringify(pecas))


}

let pecas = { /* Objeto na qual as informações serão armazenadas */
    codigo : [],
    nome : [],
    marca : [],
    categoria : [],
    quantidade : [],
    preco : [],
    historico : []
}
    /* Possiveis melhorias: Checar se a informação está duplicada, Ver se algum campo está vazio e retornar um erro caso esteja */

/* Estoque */

function ir_estoque(){
    window.location.href = "estoque.html";

    };

/* Catalogo */

function ir_catalogo(){
    window.location.href = "catalogo.html";
    };