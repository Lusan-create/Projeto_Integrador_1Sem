
/*----------------------------------- Temp --------------------------------*/

function inicio_saida(){  /* Inicia ao carregar a página e Checa se há algo no local storage. Caso possua alguma informação, ele puxa o local storage. */
    let teste = JSON.parse(localStorage.getItem('movimento'))
    if (movimento.codigo.length == 0 && teste !== null && teste.codigo !== undefined){
        movimento = JSON.parse(localStorage.getItem("movimento"))

        console.log(movimento)
    }

    teste = JSON.parse(localStorage.getItem('cadastro'))
    if (pecas.codigo.length == 0 && teste !== null && teste.codigo !== undefined){
        pecas = JSON.parse(localStorage.getItem('cadastro'))

        console.log(pecas)
    }

    
    
};


function submete_saida(){

    let x = movimento.codigo.length
    for (let i = 0; i < pecas.codigo.length; i++){

        if (pecas.codigo[i] == document.getElementById("cod_produto").value){

            /* Entrada do código */
            let codigo = pecas.codigo[i]
            movimento.codigo.push(codigo)

            /* Quantidade de embalagens */
            let quantidade = document.getElementById("cod_qtd").value
            movimento.quantidade.push(quantidade)

            /* Pega a data diretamente do navegador (Dia e Mês) */
            data = new Date()
            data.toLocaleDateString('pt-BR')
            let mes = String(data.getMonth())
            movimento.mes.push(data.getMonth())
            movimento.dia.push(data.getDate())

            /* Local de armazenamento */
            let setor = document.getElementById("cod_setor").value
            movimento.setor.push(setor)
            
            /* demonstra que é uma saida */
            let saida = 'out'
            movimento.inout.push(saida)

            /* Armazena as informações atualizadas no local storage */
            /*localStorage.setItem("movimento", JSON.stringify(movimento))*/

            
            const li = document.getElementById("saida_out")
            const ul = document.createElement("ul");
            ul.textContent = `Código:${codigo} -- Quantidade:${quantidade} -- Data:${data.getDate()}/${data.getMonth()} -- Setor:${setor}`;
            li.appendChild(ul);

            /* retorna a lista e avisa que entrada foi realizada */
            console.log(movimento)
            alert("Entrada Realizada")
        }
    };
    if (movimento.codigo.length == x){
        alert("Código não encontrado")
    }
}    
/* -------------------------------- Variaveis ------------------------------------- */

let movimento = { /* Objeto de movimentacões */
    codigo :        [],
    mes :           [],
    dia:            [],
    quantidade :    [],
    setor:          [],
    inout:          [],
}

let pecas = { /* Objeto na qual as informações do cadastro serão armazenadas */
    codigo : [],
    nome : [],
    marca : [],
    categoria : [],
    quantidade : [],
    preco : [],
}

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

/*------------------------------------------ Entrada de Peças ------------------------------------------------- */

function ir_entrar_pecas(){
    var user = localStorage.getItem("user")

    if(user == "Admin"){
    window.location.href = "entrada_pecas.html";
    }
    else(alert("Você não possui permissão para acessar a saída de peças"))
    };


function inicio_entrada(){  /* Inicia ao carregar a página e Checa se há algo no local storage. Caso possua alguma informação, ele puxa o local storage. */
    let teste = JSON.parse(localStorage.getItem('movimento'))
    if (movimento.codigo.length == 0 && teste !== null && teste.codigo !== undefined){
        movimento = JSON.parse(localStorage.getItem("movimento"))

        console.log(movimento)
    }

    teste = JSON.parse(localStorage.getItem('cadastro'))
    if (pecas.codigo.length == 0 && teste !== null && teste.codigo !== undefined){
        pecas = JSON.parse(localStorage.getItem('cadastro'))

        console.log(pecas)
    }
};

function submete_entrada(){

    let x = movimento.codigo.length
    for (let i = 0; i < pecas.codigo.length; i++){

        if (pecas.codigo[i] == document.getElementById("cod_produto").value){

            /* Entrada do código */
            let codigo = pecas.codigo[i]
            movimento.codigo.push(codigo)

            /* Quantidade de embalagens */
            let quantidade = document.getElementById("cod_qtd").value
            movimento.quantidade.push(quantidade)

            /* Pega a data diretamente do navegador (Dia e Mês) */
            data = new Date()
            data.toLocaleDateString('pt-BR')
            let mes = String(data.getMonth())
            movimento.mes.push(data.getMonth())
            movimento.dia.push(data.getDate())

            /* Local de armazenamento */
            let setor = document.getElementById("cod_setor").value
            movimento.setor.push(setor)
            
            /* demonstra que é uma entrada */
            let entrada = 'in'
            movimento.inout.push(entrada)

            /* Armazena as informações atualizadas no local storage */
            localStorage.setItem("movimento", JSON.stringify(movimento))

            /* retorna a lista e avisa que entrada foi realizada */
            console.log(movimento)
            alert("Entrada Realizada")
        }
    };
    if (movimento.codigo.length == x){
        alert("Código não encontrado")
    }
}    





/*--------------------------------------------- Relatório ------------------------------------------------*/
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
        console.log(pecas)
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
    marca.value = ""

    /* Nome do produto */
    let nome = document.getElementById("catalogo_nome").value
    pecas.nome.push(nome);
    nome.value = ""

    /* Categoria */
    let categoria = document.getElementById("catalogo_categoria").value
    pecas.categoria.push(categoria);
    categoria.value = ""

    /* Quantidade por embalagem */
    let quantidade = document.getElementById("catalogo_quantidade").value
    pecas.quantidade.push(quantidade);
    quantidade.value = ""

    /* Preco */
    let preco = document.getElementById("catalogo_preco").value
    pecas.preco.push(preco);
    preco.value = ""

    /* histórico */
    let historico = []
    pecas.historico.push(historico);

    /* Entrada */
    let movimento = []
    pecas.movimento.push(movimento)

    /* Setor */
    let setor = []
    pecas.setor.push(setor) 


    console.log(pecas)

    localStorage.setItem("cadastro", JSON.stringify(pecas))
    alert("Cadastro Realizado")

}


    /* Possiveis melhorias: Checar se a informação está duplicada, Ver se algum campo está vazio e retornar um erro caso esteja */

/* Estoque */

function ir_estoque(){
    window.location.href = "estoque.html";

};

/* -------------------------------------------------------- Catalogo ------------------------------------------------------------ */

function ir_catalogo(){
    window.location.href = "catalogo.html";
};

function inicio_catalogo(){  /* Puxa o LocalStorage e printa os itens salvos no catálogo */
    let teste = JSON.parse(localStorage.getItem("cadastro"))/* Váriavel para teste do local storage */
    console.log(teste)  
    if (pecas.codigo.length == 0 && teste !== null && teste.codigo !== undefined){
        pecas = JSON.parse(localStorage.getItem("cadastro")) /* Puxa o local storage e abaixo retorna o local storage ao console */
        console.log(pecas)
        
    }
    const li = document.getElementById("catalogo_out")

    for (let i = 0; i < pecas.codigo.length; i++){
        const ul = document.createElement("ul");
        ul.textContent = `Código: ${pecas.codigo[i]} -- Produto: ${pecas.nome[i]} -- Marca: ${pecas.marca[i]} -- Categoria: ${pecas.categoria[i]} -- QTD Embalagem: ${pecas.quantidade[i]} -- Preço: ${pecas.preco[i]}.`;
        li.appendChild(ul);
    };
};
