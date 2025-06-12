
/*----------------------------------- Temp --------------------------------*/


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

    login = document.getElementById("usuario_bootstrap").value;
    senha = document.getElementById("senha_bootstrap").value;

    if (login == "Admin"  && senha == "1234"){
        user =  "Admin";
        localStorage.setItem('user', user)
        window.location.href = "menu.html";

    } 
    else if (login == 'Reset' && senha == 'reset'){
        reset_listas()
        user =  "Admin";
        localStorage.setItem('user', user)
        console.log('reseted')
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
    
    
    
    let teste = JSON.parse(localStorage.getItem('cadastro'))
    try {
        if(teste.codigo.length > 0 && teste != null && teste != undefined ){ 
        movimento = JSON.parse(localStorage.getItem("movimento"))  //Entra o obejto movimento   
        pecas = JSON.parse(localStorage.getItem('cadastro'))        //Entr o obejto
        console.log('Local storage carregado com sucesso')
        console.log(teste)
    }
    else{
        try{
            fetch('cadastro.json') // Puxa o cadasro.json
                .then(response => response.json())
                .then(values => values.forEach(value => {
                
                        pecas.codigo.push(value.codigo)

                        pecas.total.push(value.total)

                        pecas.nome.push(value.nome)

                        pecas.marca.push(value.marca)

                        pecas.categoria.push(value.categoria)

                        pecas.quantidade.push(value.quantidade)

                        pecas.preco.push(value.preco)
                        
                        localStorage.setItem("cadastro", JSON.stringify(pecas))
                        console.log('Json Carregado (Cadastro)')
                    }    
                ))
            }
            catch{console.log('Cadastro.json não foi carregado')}
         

        try{
        fetch('movimento.json') // Puxa o movimento.json
            .then(response => response.json())
            .then(values => values.forEach(value => {
                
                    movimento.codigo.push(value.codigo)

                    movimento.mes.push(value.mes)

                    movimento.dia.push(value.dia)

                    movimento.quantidade.push(value.quantidade)

                    movimento.setor.push(value.setor)

                    movimento.inout.push(value.inout)
                    localStorage.setItem("movimento", JSON.stringify(movimento))
                    console.log('json Carregado (movimentos)')
            }))
            }
            catch{console.log('estoque.json não foi carregado')}
}
            
        }
    catch{
        try{
            fetch('cadastro.json') // Puxa o cadasro.json
                .then(response => response.json())
                .then(values => values.forEach(value => {
                
                        pecas.codigo.push(value.codigo)

                        pecas.total.push(value.total)

                        pecas.nome.push(value.nome)

                        pecas.marca.push(value.marca)

                        pecas.categoria.push(value.categoria)

                        pecas.quantidade.push(value.quantidade)

                        pecas.preco.push(value.preco)
                        
                        localStorage.setItem("cadastro", JSON.stringify(pecas))
                        console.log('Json Carregado (Cadastro)')
                    }    
                ))
            }
            catch{console.log('Cadastro.json não foi carregado')}
         

        try{
        fetch('movimento.json') // Puxa o movimento.json
            .then(response => response.json())
            .then(values => values.forEach(value => {
                
                    movimento.codigo.push(value.codigo)

                    movimento.mes.push(value.mes)

                    movimento.dia.push(value.dia)

                    movimento.quantidade.push(value.quantidade)

                    movimento.setor.push(value.setor)

                    movimento.inout.push(value.inout)
                    localStorage.setItem("movimento", JSON.stringify(movimento))
                    console.log('json Carregado (movimentos)')
            }))
            }
            catch{console.log('estoque.json não foi carregado')}
}
        


}  
        
    
    





/* -------------------------------------------- Rastreio ----------------------------------------- */

function faz_rastreio(){

    movimento = JSON.parse(localStorage.getItem("movimento"))  //Entra o objeto movimento   
    pecas = JSON.parse(localStorage.getItem('cadastro'))        //Entra o objeto

    console.log('Objeto Pecas:')
    console.log(pecas)
    console.log('Objeto movimento:')
    console.log(movimento)
    
    let qtd_total = 0

    let lista = { // objeto para organizar as informações
        codigo: 'codigo',
        setor: [],
        quantidade:[]
    }
    let total = 0

    let rastreio = document.getElementById('cod_rastreio').value; // entrada do input
    lista.codigo = rastreio // Coloca o código no objeto
    if(rastreio == ''){
        alert('você não escreveu nada no rastreio de peças')
        return 0
    }

    if(pecas.codigo.includes(rastreio)){} // Checa se o código  existe no sistema
    else{
        return alert('Esse código não existe')
    }

    if(movimento.codigo.includes(rastreio)){} // Checa se o código possui algum movimento
    else{
        return alert('Não há movimentos com esse código')
    }

    // Cadastra os setores
    for (let i = 0; i < movimento.codigo.length; i++){ 
        if(lista.setor.includes(movimento.setor[i]) != true && movimento.codigo[i] == lista.codigo){
            lista.setor.push(movimento.setor[i])
            lista.quantidade.push(0)
        }
    }

    //Encontra as quantidades
    for (let i= 0; i < lista.setor.length ; i++){ // Passa pelo objeto lista de setores
        
        for (let x = 0; x < movimento.codigo.length; x ++){ // Passa pela lista de setores do objeto movimento
            
            if(movimento.codigo[x] == lista.codigo && lista.setor[i] == movimento.setor[x]){ // Checa se o código e o setor são correspondentes
                if (movimento.inout[x] == 'in' && lista.codigo == movimento.codigo[x]){ // Soma caso seja entrada

                        lista.quantidade[i] = Number(lista.quantidade[i]) + Number(movimento.quantidade[x])

                }
                else if(movimento.inout[x] == 'out' && lista.codigo == movimento.codigo[x]) { // Subtrai caso seja saída

                    lista.quantidade[i] = Number(lista.quantidade[i]) - Number(movimento.quantidade[x])     
                }
            }
        }
    }
    console.log(lista)

    let formatado = `Código ${lista.codigo}: `
    referencia = 0
    for (let i = 0; i < lista.setor.length; i++){ // Formata a saída.
        referencia = referencia + 1

        if(referencia == lista.setor.length){
            let setor = String(lista.setor[i])
            let qtd = String(lista.quantidade[i])
            console.log(qtd)
            formatado = formatado + `${setor} = ${qtd}.`
        }
        else{
            let setor = String(lista.setor[i])
            let qtd = String(lista.quantidade[i])
            formatado = formatado + `${setor} = ${qtd}, `
        }
    }
    for (let x = 0; x < pecas.codigo.length; x++){
        if (document.getElementById("cod_rastreio").value == pecas.codigo[x] ){
            qtd_total = pecas.total
        }
    }

    formatado = formatado + `  Total: ${qtd_total}`
    console.log(lista)
    return alert(formatado)
    




}

/* --------------------------------------------------------Saída de peças -------------------------------------------------- */

function ir_saida_pecas(){ // Função que movimenta a tela á saída de peças
    var user = localStorage.getItem("user")

    if (user == "Admin"){ // Checa se é Admin
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


function submete_saida(){ // Função ativada ao apertar o botão de submeter na saida_pecas.html

    let x = movimento.codigo.length
    let temp = 0
    let qtdSetor = 0
    let setor = document.getElementById('cod_setor').value
    

    for (let i = 0; i < pecas.codigo.length; i++){ // Loop que passa pelo atribulo código no objeto pecas. Serve para checar se o cósigo existe e encontrar para possiveis mudanças
        
        for  (let x = 0; x < movimento.setor.length; x ++){ // Encontra a quantidade armazenada no setor
            

            if(movimento.codigo[x] == document.getElementById('cod_produto').value  && movimento.inout[x] == 'in'){
                qtdSetor = qtdSetor + Number(movimento.quantidade[x])
                console.log(`teste : ${qtdSetor}`)
            }
            else if(movimento.codigo[x] == document.getElementById('cod_produto').value  && movimento.inout[x] == 'out'){
                qtdSetor = qtdSetor - Number(movimento.quantidade[x])
                console.log(`teste 02: ${qtdSetor}`)
            }
        }

        if (qtdSetor > 0){
            if (pecas.codigo[i] == document.getElementById("cod_produto").value){ // Checa se o código existe e retorna uma mensagem caso não exista


                if(pecas.total[i] - document.getElementById("cod_qtd").value > 0 && document.getElementById("cod_qtd").value != 0){ // Checa se a saída é maior que zero Manda uma mensagem caso não seja

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
                setor = document.getElementById("cod_setor").value
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
                alert("saída Realizada")
                return 0;
             
                }
                else if(document.getElementById("cod_qtd").value == 0 || document.getElementById("cod_qtd").value == null){
                    alert('A quantidade deve ser maior que 0')
                    return 0
                }
                else{alert(`Não é possivel retirar essa quantidade. Não há itens o sufucientes \nItens restantes: ${pecas.total[i]}`)
                    return 0
                }
            }
        }
        else{
            alert(`não há peças o suficiente Neste armazém (${setor}), /n/nPeças em neste setor: ${qtdSetor}`)
            return 0
        }
    };
    if (movimento.codigo.length == x && temp == 0){
        alert("Código não encontrado")
        return 0
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
                movimento.mes.push(mes)
                movimento.dia.push(dia)

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
                console.log(contador)

                


                /* Retorno ao usuário */
                const li = document.getElementById("entrada_out")
                const ul = document.createElement("ul");
                ul.textContent = `- Código:${codigo} -- Quantidade:${quantidade} -- Data:${dia}/${mes} -- Setor:${setor}`;
                li.appendChild(ul);

                let input = document.getElementById('')

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
    if(contador <= 0){ // Caso nenhuma informação tenha sido adicionada
        alert('Não há nenhuma submissão para descartar')
        return 0
    }
    else if (contador > 0){
        console.log(contador)
        for (let i = 0; i < pecas.codigo.length; i++){ // Passa pelo objeto pecas
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
                localStorage.setItem("cadastro", JSON.stringify(pecas))
                
                alert('Item retirado.')
                
            }
        }
    }
}





/*--------------------------------------------- Relatório ------------------------------------------------*/

async function gera_relatorio(){

    movimento = JSON.parse(localStorage.getItem("movimento"))
    pecas = JSON.parse(localStorage.getItem('cadastro'))

    const{ jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.text("Relatório", 90, 10)
    pdf.text('---------------------------------------------------------------------------------------------------------------------', 0, 20)

    pdf.text("Entradas e saídas:", 77, 30)
    let y = 50
    let inout

    
    for (let i = 0; i < movimento.codigo.length; i++){
        for (let z = 0; z < pecas.codigo.length; z++){
            if (pecas.codigo[z] == movimento.codigo[i]){
                if(movimento.inout[z] == "in"){   
                    inout = "+"
                }
                else {inout = "-" }

                let texto = `- Código: ${pecas.codigo[z]} -- Nome: ${pecas.nome[z]} -- Data: ${movimento.dia[z]}/${movimento.mes[z]} -- Quantidade: ${inout}${movimento.quantidade[z]}.`
 

                pdf.text(texto, 10,y)
                y += 10

                if (y > 280){
                pdf.addPage()
                y = 20
                }
                
            }    
        }   

        
    }
    pdf.text('---------------------------------------------------------------------------------------------------------------------', 0, y)
    y += 10

    pdf.text("ESTOQUE", 90, y)
    y += 20

    for (let i = 0; i < pecas.codigo.length; i ++){

        let texto = `- Código: ${pecas.codigo[i]} -- Nome: ${pecas.nome[i]} -- Data: ${movimento.dia[i]}/${movimento.mes[i]} -- Quantidade: ${inout}${movimento.quantidade[i]}.`
        pdf.text(texto, 10,y)
            y += 10

        if (y > 280){
        pdf.addPage()
        y = 20
        }
    }
    y += 20
    pdf.text('---------------------------------------------------------------------------------------------------------------------', 0, y)
    y += 10
    
    pdf.text('SENAI - PROJETO INTEGRADOR',110 , y)
    y +=10
    pdf.text('---------------------------------------------------------------------------------------------------------------------', 0, y)

    pdf.save("relatório.pdf")

    

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

            if(movimento.codigo[i] == pecas.codigo[x]){ // O movimento encontra seu respectivo cadastro


            if (movimento.inout[i] == 'in'){ // Checa se é entrada
                inout = '+'
            }

            if (movimento.inout[i] == 'out'){ // Checa se é saída
                inout = '-'
            }
        
            out = document.getElementById('estoque_out01')
            info = document.createElement('ul')
            info.textContent = `- Código: ${movimento.codigo[i]} -- Nome: ${pecas.nome[x]} -- Data: ${movimento.dia[i]}/${movimento.mes[i]} -- Quantidade: ${inout}${movimento.quantidade[i]} -- Setor: ${movimento.setor[i]}.`
            out.appendChild(info)
    
            }
        }
    }   

    for (let i = 0; i < pecas.codigo.length; i++){

                const out = document.getElementById("estoque_out02")
                const item = document.createElement("ul");
                item.textContent = `- Código: ${pecas.codigo[i]} -- Nome: ${pecas.nome[i]} -- Quantidade em estoque: ${pecas.total[i]}`;
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

    for (let i = 0; i < pecas.codigo.length; i ++){
        const ul = document.createElement("ul");
        ul.textContent = `Código: ${pecas.codigo[i]} -- Produto: ${pecas.nome[i]} -- Marca: ${pecas.marca[i]} -- Categoria: ${pecas.categoria[i]} -- QTD Embalagem: ${pecas.quantidade[i]} -- Preço: ${pecas.preco[i]}.`;
        li.appendChild(ul);
    };
};


function reset_listas(){
    localStorage.setItem("movimento", JSON.stringify(movimento))
    localStorage.setItem("cadastro", JSON.stringify(pecas))
    console.log('Resetado')
}


/* ---------------------------------------------------------------- Gráficos ------------------------------------------------ */

function inicio_graficos(){


    /* Leitura do local storage */
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


    /* Gera as cores dos gráficos */
    const cores = [];
    let qtd
    if(pecas.codigo.length > pecas.codigo.length){
        qtd = pecas.codigo.length
    }
    else{
        qtd = pecas.codigo.length
    }
    for (let i = 0; i < qtd; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        cores.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }





    /* Primeiro gráfico -- Entrada de peças */
    let label = []
    let info   = []
    
    for (let x = 0; x < pecas.codigo.length; x ++){ // Passa pelo objeto peças (x)
        console.log(1)
        for (let i = 0; i < movimento.codigo.length; i ++){ // Passa pelo objeto movimento (i)

            if (pecas.codigo[x] == movimento.codigo[i] && movimento.inout[i] == 'in'){ // Checas se os códigos são iguais e se é entrada
                
                if( label.includes(pecas.codigo[x])){ // Checa se o código já foi registrado
                    info[info.length - 1] = Number(info[info.length - 1]) + Number(movimento.quantidade[i])

                }
                else{
                label.push(pecas.codigo[x])
                info.push(movimento.quantidade[i])
                }
                

            }
        }
    }

    console.log(label)
    console.log(info)
    const kleber = document.getElementById("graficoEntrada").getContext("2d")
    const primeiroGrafico = new Chart(kleber,{
        type: "bar",
        data: {
            labels: label,
            datasets: [{

                label: 'Entradas de peças',
                data: info,
                backgroundColor: cores
            }]
        },
        options: {
            responsive: true,
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    })


    /* Segundo gráfico -- Saída de peças */
    let label02 = []
    let info02  = []
    
    for (let x = 0; x < pecas.codigo.length; x ++){
        console.log(1)
        for (let i = 0; i < movimento.codigo.length; i ++){
            if (pecas.codigo[x] == movimento.codigo[i] && movimento.inout[i] == 'out'){
    
                console.log(label02)
                console.log(info02)
                
                if( label02.includes(pecas.codigo[x])){
                    info02[info02.length - 1] = Number(info02[info02.length - 1]) + Number(movimento.codigo[i])
                }
                else{
                label02.push(pecas.codigo[x])
                info02.push(movimento.quantidade[i])
                }
                

            }
        }
    }
    console.log(label02)
    console.log(info02)
    const jorge = document.getElementById("graficoSaida").getContext("2d")
    const segundo_grafico = new Chart(jorge,{
        type: "bar",
        data: {
            labels: label02,
            datasets: [{

                label: 'Saídas de peças',
                data: info02,
                backgroundColor: cores
            }]
        },
        options: {
            responsive: true,
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    })


    /* Terceiro gráfixo -- Estoque */
    let label03 = []
    let info03  = []
    
    for (let x = 0; x < pecas.codigo.length; x ++){
        if (pecas.total[x] > 0){
            label03.push(pecas.codigo[x])
            info03.push(pecas.total[x])
        }
    }
    
    console.log(label03)
    console.log(info03)
    const parrot = document.getElementById("graficoEstoque").getContext("2d")
    const terceiro_grafico = new Chart(parrot,{
        type: "pie",
        data: {
            labels: label03,
            datasets: [{

                label: 'PEÇAS EM ESTOQUE',
                data: info03,
                backgroundColor: cores
            }]
        },
        options: {
            responsive: true,
            scales:{
                y:{
                    beginAtZero: true
                }
            }
        }
    })

}

function ir_transferencia(){
    var user = localStorage.getItem("user")

    if(user == 'Admin'){
        window.location.href = "transferencia.html"
    }
    else(alert("Você não possui permissão para acessar o cadastro de peças"))
    

};

function inicio_transferencia(){  /* Inicia ao carregar a página e Checa se há algo no local storage. Caso possua alguma informação, ele puxa o local storage. */
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

function submete_transferencia(){ // ativada quando o botão de submeter for apertado
    
    //Variáveis locais
    let origem = 0
    let setor_origem
    let setor_destino


    //Checa algum imput está vazio
    if(document.getElementById("inputTransferencia01").value == "" && document.getElementById("inputTransferencia02").value == "" && document.getElementById("inputTransferencia03").value == "" && document.getElementById("inputTransferencia04").value == ""){
        alert("Todos os campos estão vazios")
        return 0
    }

    if(document.getElementById("inputTransferencia01").value == ""){ // código
        alert("O código de produto está vazio.")
        return 0
    }
    if(document.getElementById("inputTransferencia02").value == ""){ // Quantidade
        alert("A quantidade está vazia.")
        return 0
    }
    if(document.getElementById('inputTransferencia03').value == ""){ // Origem
        alert("O setor de origem está vazio")
        return 0
    }
    if(document.getElementById('inputTransferencia04').value == ""){ // Destino
        alert("O setor de destino está vazio")
        return 0
    }
    


    //Checa se o código existe
    if(pecas.codigo.includes(document.getElementById("inputTransferencia01").value) == false){ // Entra no loop caso não exista 
        alert("Esse código não existe")
        return 0
    }

        // Checa se é um número
    if(isNaN(Number(document.getElementById('inputTransferencia02').value))){
        alert("A quantidade precisa ser um número.")
        return 0
    }

    // Checa se a origem e o destino são iguais

    if(document.getElementById("inputTransferencia03").value == document.getElementById("inputTransferencia04").value){
        alert("os campos 3 (origem) e  o campo 4 (destino) são iguais.")
        return 0
    }

    // Checa se a origem existe
    if(movimento.setor.includes(document.getElementById("inputTransferencia03").value) == false){ //Entra no loop caso não exista
        alert("Esse setor não existe")
        return 0
    }

    //Checa se há uma quantidade suficiente na origem
    for (let x = 0; x < movimento.codigo.length; x ++){ // (x) - passa pela lista movimento

        if(document.getElementById("inputTransferencia03").value == movimento.setor[x]){ // Alinha os dois ponteiros
            if(movimento.inout[x] == 'in'){ // Caso seja entrada
                origem = origem + Number(movimento.quantidade[x])
            }
            else if (movimento.inout[x] == 'out'){ // Caso seja saída
                origem = origem - Number(movimento.quantidade[x])
            }
        }
    }
    console.log(1, origem, Number(document.getElementById("inputTransferencia02").value))
    if(origem < Number(document.getElementById("inputTransferencia02").value)){ // Checa se há peças o suficiente na origem
        console.log(2)
        alert(`Não há peças o suficiente para mover. Peças restantes: ${origem} `)
        return 0
    }

    //Transferência de peças

    //Formatação da data
    data = new Date() // Pega a data do navegador
    data.toLocaleDateString('pt-BR') // Seta a data ao formato brasileiro
    mes = String(data.getMonth() + 1).padStart(2, '0')  // Formata o mês para ficar 0X caso seja menor que 10
    dia = String(data.getDate()).padStart(2, '0')   // Formata o DIA para ficar 0X caso seja menor que 10



    /*movimento = { 
    codigo :        [],
    mes :           [],
    dia:            [],
    quantidade :    [],
    setor:          [],
    inout:          [],
    }*/

    //Retirada das peças da origem
    movimento.codigo.push(document.getElementById("inputTransferencia01").value)
    movimento.mes.push(mes)
    movimento.dia.push(dia)
    movimento.quantidade.push(document.getElementById("inputTransferencia02").value)
    movimento.setor.push(document.getElementById("inputTransferencia03").value)
    movimento.inout.push('out')



    //Entrada das peças no destino
    movimento.codigo.push(document.getElementById("inputTransferencia01").value)
    movimento.mes.push(mes)
    movimento.dia.push(dia)
    movimento.quantidade.push(document.getElementById("inputTransferencia02").value)
    movimento.setor.push(document.getElementById("inputTransferencia04").value)
    movimento.inout.push('in')

    // Retorna a mudança no output

    const li = document.getElementById("janela_output")
    const ul = document.createElement("ul");
    ul.textContent = `- Código:${movimento.codigo[movimento.codigo.length - 1]} --- Setor:${movimento.setor[movimento.codigo.length - 2]}, QTD:${movimento.quantidade[movimento.codigo.length - 2]} ---> Setor:${movimento.setor[movimento.codigo.length - 1]}, QTD:${movimento.quantidade[movimento.codigo.length - 1]}`;
    li.appendChild(ul);


    // Atualização do local storage
    localStorage.setItem("movimento", JSON.stringify(movimento))
    console.log('Local Storage atualizado.')


    // Retorno da transferência concluída
    alert("Transferência concluída com sucesso.")
    console.log(movimento)

}

function descarta_tranferência(){

}
