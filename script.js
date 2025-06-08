
/*----------------------------------- Temp --------------------------------*/
async function carregar_dados(){

    temp = await fetch('cadastro.json')
    .then(response => response.json)
    .then(data =>{
        console.log(data)
    })
} 

function reset_listas(){
    localStorage.setItem("cadastro", JSON.stringify(pecas)) //Reseta os cadastros

    localStorage.setItem("movimento", JSON.stringify(movimento)) //Reseta os movimentos
}

/* -------------------------------- Variaveis ------------------------------------- */

let movimento = { /* Objeto de movimentacões 'Cadastro' */
    codigo :        [],
    mes :           [],
    dia:            [],
    quantidade :    [],
    setor:          [],
    inout:          [],
}

let pecas = { /* Objeto na qual as informações do cadastro serão armazenadas 'Movimentacoes' */
    codigo : [],
    nome : [],
    marca : [],
    categoria : [],
    quantidade : [],
    preco : [],
    total: [],
}

let contador = 0

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
    else if (login == 'Reset' && senha == 'reset'){
        reset_listas()
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

/* --------------------------------------------------------Saída de peças -------------------------------------------------- */

function ir_saida_pecas(){
    var user = localStorage.getItem("user")

    if (user == "Admin"){
        window.location.href = "saida_pecas.html";
    }
    else{
        alert("Você não possui permissão para acessar a saída de peças")

    }
    };

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
    let temp = 0
    for (let i = 0; i < pecas.codigo.length; i++){

        if (pecas.codigo[i] == document.getElementById("cod_produto").value){

            if(pecas.total[i] - document.getElementById("cod_qtd").value > 0 && document.getElementById("cod_qtd").value != 0){1

            /* Entrada do código */
            let codigo = pecas.codigo[i]
            movimento.codigo.push(codigo)

            /* Quantidade de embalagens */
            let quantidade = document.getElementById("cod_qtd").value
            movimento.quantidade.push(quantidade)

            /* Pega a data diretamente do navegador (Dia e Mês) */
            data = new Date()
            data.toLocaleDateString('pt-BR')
            mes = String(data.getMonth()).padStart(2, '0')
            dia = String(data.getDate()).padStart(2, '0')
            movimento.mes.push(mes)
            movimento.dia.push(dia)

            /* Local de armazenamento */
            let setor = document.getElementById("cod_setor").value
            movimento.setor.push(setor)

            /* Total */
            let total = Number(pecas.total[i]) - Number(document.getElementById('cod_qtd').value)
            pecas.total[i] = total
            /* demonstra que é uma saida */
            let saida = 'out'
            movimento.inout.push(saida)

            contador = contador + 1


            /* Armazena as informações atualizadas no local storage */
            localStorage.setItem("movimento", JSON.stringify(movimento))
            localStorage.setItem("cadastro", JSON.stringify(pecas))



            
            const li = document.getElementById("saida_out")
            const ul = document.createElement("ul");
            ul.textContent = `Código:${codigo} -- Quantidade:${quantidade} -- Data:${data.getDate()}/${data.getMonth()} -- Setor:${setor}`;
            li.appendChild(ul);

            /* retorna a lista e avisa que entrada foi realizada */
            console.log('Lista movimento:')
            console.log(movimento)
            console.log('Lista Cadastro:')
            console.log(pecas)
            alert("Entrada Realizada")
            }
            else if(document.getElementById("cod_qtd").value == 0 || document.getElementById("cod_qtd").value == null){
                alert('A quantidade deve ser maior que 0')
                temp = 1
            }
            else{alert(`Não é possivel retirar essa quantidade. Não há itens o sufucientes \nItens restantes: ${pecas.total[i]}`)
                temp = 1
            }
    }
    };
    if (movimento.codigo.length == x && temp == 0){
        alert("Código não encontrado")
    }
}    

function descarta_saida(){

    if(contador == 0){ // Caso nenhuma informação tenha sido adicionada
        alert('Não há nenhuma submissão para descartar')
    }
    else if (contador > 0){
        for (let i = 0; i < pecas.codigo.length; i++){
            if (pecas.codigo[i] == movimento.codigo[movimento.codigo.length - 1]){
                
                let quantidade = Number(pecas.total[i])
                let total = Number(movimento.quantidade[movimento.codigo.length - 1])
                pecas.total[i] = total + quantidade // Reverte a quantidade total de itens
                
                /* Removendo as informações do objeto movimento*/
                movimento.codigo.pop() // Remove o ultimo código

                movimento.quantidade.pop() // Remove a ultima quantidade

                movimento.mes.pop() // Remove o ultimo mes
                
                movimento.dia.pop() // Remove o ultimo dia

                movimento.setor.pop() // Remove o ultimo setor

                movimento.inout.pop() // Remove o ultimo inout

                console.log('Listas após descarte:')
                console.log(pecas)
                console.log(movimento)
                contador = contador -1

                
                /* Remove o ultimo item do retorno*/
                li = document.getElementById('saida_out')
                li.removeChild(li.lastElementChild)

                localStorage.setItem("movimento", JSON.stringify(movimento)) // Salva as alterações no local storage
                localStorage.setItem("cadastro", JSON.stringify(pecas))
                
                alert('Item retirado.')
                
            }
        }
    }
}



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

        console.log('Movimento carregado')
        console.log(movimento)
    }

    teste = JSON.parse(localStorage.getItem('cadastro'))
    if (pecas.codigo.length == 0 && teste !== null && teste.codigo !== undefined){
        pecas = JSON.parse(localStorage.getItem('cadastro'))

        console.log('Peças carregadas')
        console.log(pecas)
    }
};

function submete_entrada(){

    let x = movimento.codigo.length
    let temp = 0
    

    for (let i = 0; i < pecas.codigo.length; i++){

        if (pecas.codigo[i] == document.getElementById("cod_produto").value){
            
            if(document.getElementById('cod_qtd').value != 0){

                /* Entrada do código */
                let codigo = pecas.codigo[i]
                movimento.codigo.push(codigo)

                /* Quantidade de embalagens */
                let quantidade = document.getElementById("cod_qtd").value
                movimento.quantidade.push(quantidade)

                
                pecas.total[i] = Number(pecas.total[i]) + Number(quantidade)

                /* Pega a data diretamente do navegador (Dia e Mês) */
                data = new Date()
                data.toLocaleDateString('pt-BR')
                mes = String(data.getMonth() + 1).padStart(2, '0')
                dia = String(data.getDate()).padStart(2, '0')
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
                localStorage.setItem("cadastro", JSON.stringify(pecas))
                contador =  contador + 1

                


                /* Retorno ao usuário */
                const li = document.getElementById("entrada_out")
                const ul = document.createElement("ul");
                ul.textContent = `- Código:${codigo} -- Quantidade:${quantidade} -- Data:${dia}/${mes} -- Setor:${setor}`;
                li.appendChild(ul);

                /* retorna a lista e avisa que entrada foi realizada */
                console.log(movimento)
                console.log(pecas)
                alert("Entrada Realizada")

            }
            else if (document.getElementById('cod_qtd').value == 0){
                alert('A quantidade deve ser maior que 0')
                temp = 1
            }
            
        }
    };
    if (movimento.codigo.length == x && temp == 0){
        alert("Código não encontrado")
    }
}    

function Descarta_entrada(){
    if(contador == 0){ // Caso nenhuma informação tenha sido adicionada
        alert('Não há nenhuma submissão para descartar')
    }
    else if (contador > 0){
        console.log(contador)
        for (let i = 0; i < pecas.codigo.length; i++){
            console.log(movimento.codigo [movimento.codigo.length - 1])
            if (pecas.codigo[i] == movimento.codigo[movimento.codigo.length - 1]){
                
                pecas.total[i] = pecas.total[i] - movimento.quantidade[-1] // Reverte a quantidade total de itens
                
                /* Removendo as informações do objeto movimento*/
                movimento.codigo.pop() // Remove o ultimo código

                movimento.quantidade.pop() // Remove a ultima quantidade

                movimento.mes.pop() // Remove o ultimo mes
                
                movimento.dia.pop() // Remove o ultimo dia

                movimento.setor.pop() // Remove o ultimo setor

                movimento.inout.pop() // Remove o ultimo inout

                console.log('Lista após descarte:')
                console.log(pecas)
                console.log(movimento)
                contador = contador -1

                
                /* Remove o ultimo item do retorno*/
                li = document.getElementById('entrada_out')
                li.removeChild(li.lastElementChild)

                localStorage.setItem("movimento", JSON.stringify(movimento)) // Salva as alterações no local storage
                
                alert('Item retirado.')
                
            }
        }
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
    console.log('Teste:')
    console.log(teste)
    if (pecas.codigo.length == 0 && teste !== null && teste.codigo !== undefined){
        pecas = JSON.parse(localStorage.getItem("cadastro"))
        console.log("Local Storage for carregado.")
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

    /* Total */
    total = 0
    pecas.total.push(total)

    localStorage.setItem("cadastro", JSON.stringify(pecas))
    alert("Cadastro Realizado")

    window.location.href = 'cadastro.html'

}


    /* Possiveis melhorias: Checar se a informação está duplicada, Ver se algum campo está vazio e retornar um erro caso esteja */


/* ---------------------------------------------------- Estoque --------------------------------------------------------- */

function ir_estoque(){
    window.location.href = "estoque.html";
};

function inicio_estoque(){

    let teste = JSON.parse(localStorage.getItem('movimento'))

    if (teste.codigo.length != 0  &&  teste != null && teste.codigo != undefined){ // Checa se o objeto 'movimento' está vazio
        movimento = JSON.parse(localStorage.getItem('movimento'))
        console.log('Local Storage Carregado: Movimentos')
        console.log(movimento)
    };

    teste = JSON.parse(localStorage.getItem('cadastro'))

    if (teste.codigo.length != 0  &&  teste != null && teste.codigo != undefined){ // checa se o objeto 'pecas' está vazio
        pecas = JSON.parse(localStorage.getItem('cadastro'))
        console.log('Local Storage Carregado: cadastro')
        console.log(pecas)
    };

    for (i = 0; i < movimento.codigo.length; i++ ){ // Passa pelo objeto Movimento
        for (let x = 0; x < pecas.codigo.length; x++ ){ // Passa pelo objeto pecas

            if(movimento.codigo[i] == pecas.codigo[x]){


            if (movimento.inout[i] == 'in'){
                inout = '+'
            }

            if (movimento.inout[i] == 'out'){
                inout = '-'
            }
        
            out = document.getElementById('estoque_out01')
            info = document.createElement('ul')
            info.textContent = `- Código: ${pecas.codigo[x]} -- Nome: ${pecas.codigo[x]} -- Data: ${movimento.dia[i]}/${movimento.mes[i]} -- Quantidade: ${inout}${movimento.quantidade[i]}.`
            out.appendChild(info)
    
            }
        }
    }   

    for (i = 0; i < pecas.codigo.length; i++){

                const out = document.getElementById("estoque_out02")
                const item = document.createElement("ul");
                item.textContent = `- Código: ${movimento.codigo[i]} -- Nome: ${pecas.nome[i]} -- Quantidade em estoque: ${pecas.total[i]}`;
                out.appendChild(item);
        
    }
}


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
