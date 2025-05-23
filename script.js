/*----------------------------------- Funções --------------------------------*/



/*----------------------------- página Index.html ----------------------------*/
let login
let senha
    /**/
    document.getElementById('bt_login').onclick = function(){
        login = document.getElementById("login").value;
        senha = document.getElementById("senha").value;
        
        alert(`Login = ${login}\nSenha = ${senha}`)

        if (login == "Admin"  && senha == "1234"){
            alert("Logado como Administrador")

        } 
        else{
            alert("Login ou senha são inválidos")
        }

        
    }

    