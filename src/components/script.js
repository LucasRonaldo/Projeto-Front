function envia() {
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("email").value;
    if(nome.lengt < 5 ) {
        alert("Este campo deve conter no minimo 5 caractéres");
    }
    else if (nome.lenght > 120){
        alert("Este campo deve conter no maximo 120 caractéres");
    }
     
}