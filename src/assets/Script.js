function resetar() {
    document.getElementById("formulario").reset();
}
function registrar() {
    var aux, index = 1;
    while(index <= 10){                
        aux = 0;
        if(document.getElementById("campo"+index).value == "") {                   
            document.getElementById("fbcampo"+index).innerHTML = "<small>Este campo deve ser preenchido.</small>";
            aux++;          
        }else          
            document.getElementById("fbcampo"+index).innerHTML = "";       
        if(index === 1 || index === 7 || index === 10)
            index++;                     
        else if(index === 2)
            index = 7;
        else if(index === 8)
            index = 10;
        if(index === 11){
            if(aux){
                alert("Todos os campos devem ser preenchidos.");
                return false;
            }
        }             
    }      
    while(localStorage.getItem("countlocst") === null){
        window.localStorage.clear();
        localStorage.setItem("countlocst", 1);
    }                  
    var obj = {ID: (localStorage.getItem("countlocst")), 
                Marca_Placa_Mae: (document.getElementById("campo1").value), Modelo_Placa_Mae: (document.getElementById("campo2").value),
                Quantidade_RAM: (document.getElementById("campo3").value), Capacidade_RAM: (document.getElementById("campo4").value),
                Quantidade_HD: (document.getElementById("campo5").value), Capacidade_HD: (document.getElementById("campo6").value),
                Marca_Fonte: (document.getElementById("campo7").value), Modelo_Fonte: (document.getElementById("campo8").value),
                Marca_Processador: (document.getElementById("campo9").value), Velocidade_Processador: (document.getElementById("campo10").value)};
    var id = JSON.parse(localStorage.getItem("countlocst"));      
    localStorage.setItem(id, JSON.stringify(obj));    
    alert("Computador cadastrado com sucesso.");    
    var countlocst = JSON.parse(localStorage.getItem("countlocst"));
    countlocst++;
    localStorage.setItem("countlocst", JSON.stringify(countlocst));
    window.location.href = "/create";      
}
function listar() {      
    var countlocst = localStorage.getItem("countlocst");
    localStorage.removeItem("countlocst");                     
    document.getElementById("tabcabecalho").innerHTML = "";
    document.getElementById("tabcorpo").innerHTML = "";
    document.getElementById("tabcabecalho").innerHTML += ("<tr><th scope='col'>ID</th><th scope='col'>Placa-mãe</th><th scope='col'>Modelo</th>"+
    "<th scope='col'>Qtd RAM</th><th scope='col'>Capacidade</th><th scope='col'>Qtd HD</th><th scope='col'>Capacidade</th><th scope='col'>Fonte</th>"+
    "<th scope='col'>Modelo</th><th scope='col'>Processador</th><th scope='col'>Velocidade</th></tr>");      
    var pesquisa = document.getElementById("filtro").value;
    Object.keys(localStorage).forEach(function(key){
        var test = JSON.parse(localStorage.getItem(key));                
        for (let index in test){ 
            var p1, p2, cont = 0;                    
            switch(document.getElementById("dropdownMenu2").innerHTML) {                         
                case "Marca Placa-mãe":
                    p1 = JSON.stringify(test.Marca_Placa_Mae).toLowerCase();
                    break;
                case "Modelo Placa-mãe":
                    p1 = JSON.stringify(test.Modelo_Placa_Mae).toLowerCase();
                    break;
                case "Quantidade RAM":
                    p1 = JSON.stringify(test.Quantidade_RAM).toLowerCase();
                    break;
                case "Capacidade RAM":
                    p1 = JSON.stringify(test.Capacidade_RAM).toLowerCase();
                    break;
                case "Quantidade HD":
                    p1 = JSON.stringify(test.Quantidade_HD).toLowerCase();
                    break;
                case "Capacidade HD":
                    p1 = JSON.stringify(test.Capacidade_HD).toLowerCase();
                    break;
                case "Marca Fonte":
                    p1 = JSON.stringify(test.Marca_Fonte).toLowerCase();
                    break;
                case "Modelo Fonte":
                    p1 = JSON.stringify(test.Modelo_Fonte).toLowerCase();
                    break;
                case "Marca Processador":
                    p1 = JSON.stringify(test.Marca_Processador).toLowerCase();
                    break;
                case "Velocidade Processador":
                    p1 = JSON.stringify(test.Velocidade_Processador).toLowerCase();
                    break;
                default:              
                    p1 = JSON.stringify(test.ID).toLowerCase();      
            }                               
            p2 = pesquisa.toLowerCase();          
            if(p1.includes(p2)){
                document.getElementById("tabcorpo").innerHTML += ("<tr><td>"+test.ID+"</td><td>"+test.Marca_Placa_Mae+"</td><td>"+test.Modelo_Placa_Mae+
                "</td><td>"+test.Quantidade_RAM+"</td><td>"+test.Capacidade_RAM+"</td><td>"+test.Quantidade_HD+"</td><td>"+test.Capacidade_HD+
                "</td><td>"+test.Marca_Fonte+"</td><td>"+test.Modelo_Fonte+"</td><td>"+test.Marca_Processador+"</td><td>"+test.Velocidade_Processador+"</td></tr>");            
                break;
            }                             
        }                                      
    });
    localStorage.setItem("countlocst", countlocst);
    var table = document.getElementById("tabela");            
    if(window.localStorage.length < 2){        
        if(window.localStorage.length == 1)
            window.localStorage.clear();        
        document.getElementById("tabcabecalho").innerHTML = '<p>O banco de dados está vazio. Cadastre um novo computador no link "Registrar" no menu à esquerda.</p>';
    }else{
        if(table.rows.length == 1)
            document.getElementById("tabcabecalho").innerHTML = "<p>Nenhum resultado encontrado. Por favor, tente novamente.</p>";
    }                              
}
function filtrar(val){
    document.getElementById("dropdownMenu2").innerHTML = val;      
}
function alterar1() {
    var id, cont = 0, countlocst = localStorage.getItem("countlocst");
    localStorage.removeItem("countlocst");      
    Object.keys(localStorage).forEach(function(key){        
        if(key == document.getElementById("filtro").value){
            id = key;
            cont++;
        }                         
    });            
    if(cont){
        document.getElementById("status").innerHTML = "<p>ID do computador que será alterado: "+id+"</p>";
        var elem = document.getElementById("divnavbar");
        elem.parentNode.removeChild(elem);
        elem = document.getElementById("teste");
        elem.parentNode.removeChild(elem);       
        document.getElementById("alterar").classList.remove('invisible');
        document.getElementById("alterar").classList.add('visible');
        var test = JSON.parse(localStorage.getItem(id));               
        Object.values(test).forEach(function(item, index){
            if(index > 0)
            document.getElementById("altcampo"+index).value = item;                      
        });
        localStorage.setItem("id", id);                      
    }else{        
        if(window.localStorage.length < 2){
            if(window.localStorage.length == 1)
                window.localStorage.clear();
            document.getElementById("teste").innerHTML = '<p>O banco de dados está vazio. Cadastre um novo computador no link "Registrar" no menu à esquerda.</p>';
      }else{          
            document.getElementById("teste").innerHTML = "<p>Nenhum resultado encontrado. Por favor, tente novamente.</p>";      
      }
    }                    
    localStorage.setItem("countlocst", countlocst);      
}
function alterar2() {
    var aux, index = 1;
    while(index <= 10){        
        aux = 0;
        if(document.getElementById("altcampo"+index).value == "") {                   
            document.getElementById("fbaltcampo"+index).innerHTML = "<small>Este campo deve ser preenchido.</small>";
            aux++;          
        }else          
            document.getElementById("fbaltcampo"+index).innerHTML = "";       
        if(index === 1 || index === 7 || index === 10)
            index++;                     
        else if(index === 2)
            index = 7;
        else if(index === 8)
            index = 10;
        if(index === 11){
            if(aux){
                alert("Todos os campos devem ser preenchidos.");
                return false;
            }
        }            
    }
    var r = confirm("Deseja confirmar as alterações no computador selecionado?\nEsta ação não poderá ser desfeita!");
    if(r){
        var id = localStorage.getItem("id");
        localStorage.removeItem("id");
        var obj = {ID: id, Marca_Placa_Mae: (document.getElementById("altcampo1").value), Modelo_Placa_Mae: (document.getElementById("altcampo2").value),
                Quantidade_RAM: (document.getElementById("altcampo3").value), Capacidade_RAM: (document.getElementById("altcampo4").value),
                Quantidade_HD: (document.getElementById("altcampo5").value), Capacidade_HD: (document.getElementById("altcampo6").value),
                Marca_Fonte: (document.getElementById("altcampo7").value), Modelo_Fonte: (document.getElementById("altcampo8").value),
                Marca_Processador: (document.getElementById("altcampo9").value), Velocidade_Processador: (document.getElementById("altcampo10").value)};
        localStorage.setItem(id, JSON.stringify(obj));          
        alert("Computador alterado com sucesso.");
        window.location.href = "/update";        
    }
}
function apagar1() {
    var id, cont = 0, countlocst = localStorage.getItem("countlocst");
    localStorage.removeItem("countlocst");
    Object.keys(localStorage).forEach(function(key){        
        if(key == document.getElementById("filtro").value){
            id = key;
            cont++;
        }                         
    });
    document.getElementById("tabcabecalho").innerHTML = ("<tr><th scope='col'>ID</th><th scope='col'>Placa-mãe</th><th scope='col'>Modelo</th>"+
    "<th scope='col'>Qtd RAM</th><th scope='col'>Capacidade</th><th scope='col'>Qtd HD</th><th scope='col'>Capacidade</th><th scope='col'>Fonte</th>"+
    "<th scope='col'>Modelo</th><th scope='col'>Processador</th><th scope='col'>Velocidade</th></tr>");
    if(cont){
        document.getElementById("status").innerHTML = "<p>ID do computador que será apagado: "+id+"</p>";
        var elem = document.getElementById("divnavbar");
        elem.parentNode.removeChild(elem);       
        document.getElementById("botoes").classList.remove('invisible');
        document.getElementById("botoes").classList.add('visible');
        var test = JSON.parse(localStorage.getItem(id));        
        document.getElementById("tabcorpo").innerHTML = ("<tr><td>"+test.ID+"</td><td>"+test.Marca_Placa_Mae+"</td><td>"+test.Modelo_Placa_Mae+
        "</td><td>"+test.Quantidade_RAM+"</td><td>"+test.Capacidade_RAM+"</td><td>"+test.Quantidade_HD+"</td><td>"+test.Capacidade_HD+
        "</td><td>"+test.Marca_Fonte+"</td><td>"+test.Modelo_Fonte+"</td><td>"+test.Marca_Processador+"</td><td>"+test.Velocidade_Processador+"</td></tr>");
        localStorage.setItem("id", id);                
    }else{
        if(window.localStorage.length < 2){
            if(window.localStorage.length == 1)
                window.localStorage.clear();
            document.getElementById("tabcabecalho").innerHTML = '<p>O banco de dados está vazio. Cadastre um novo computador no link "Registrar" no menu à esquerda.</p>';
        }else{
            var table = document.getElementById("tabela");          
            if(table.rows.length == 1)
                document.getElementById("tabcabecalho").innerHTML = "<p>Nenhum resultado encontrado. Por favor, tente novamente.</p>";              
        }
    }      
    localStorage.setItem("countlocst", countlocst);      
}
function apagar2() {
    var r = confirm("Deseja confirmar a exclusão do computador selecionado?\nEsta ação não poderá ser desfeita!");
    if(r){
        var id = localStorage.getItem("id");
        localStorage.removeItem(id);
        localStorage.removeItem("id");
        alert("Computador apagado com sucesso.");
        window.location.href = "/delete";        
    }
}            
function apagartudo() {
    if(window.localStorage.length < 2){
        if(window.localStorage.length == 1)
            window.localStorage.clear();
        document.getElementById("tabcabecalho").innerHTML = 'O banco de dados está vazio. Cadastre um novo computador no link "Registrar" no menu à esquerda.';
        }else{
        var r = confirm("Deseja realmente apagar todos os computadores?\nEsta ação não poderá ser desfeita!");
        if(r){
            window.localStorage.clear();
            alert("Todos os computadores foram apagados com sucesso.");        
        }
    }             
}