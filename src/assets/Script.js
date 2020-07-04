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
    document.getElementById("tabcorpo").innerHTML = "";
    document.getElementById("tabcabecalho").innerHTML = ("<tr><th scope='col'>ID</th><th scope='col'>Placa-mãe</th><th scope='col'>Modelo</th>"+
    "<th scope='col'>Qtd RAM</th><th scope='col'>Capacidade</th><th scope='col'>Qtd HD</th><th scope='col'>Capacidade</th><th scope='col'>Fonte</th>"+
    "<th scope='col'>Modelo</th><th scope='col'>Processador</th><th scope='col'>Velocidade</th></tr>");      
    var p1, p2, index, pesquisa = document.getElementById("filtro").value;     
    Object.keys(localStorage).forEach(function(key){
        var test = JSON.parse(localStorage.getItem(key));
        switch(document.getElementById("dropdownMenu1").innerHTML) {                         
            case "Marca Placa-mãe":
                p1 = JSON.stringify(test.Marca_Placa_Mae).toLowerCase(), index = 1;
                break;
            case "Modelo Placa-mãe":
                p1 = JSON.stringify(test.Modelo_Placa_Mae).toLowerCase(), index = 2;
                break;
            case "Quantidade RAM":
                p1 = JSON.stringify(test.Quantidade_RAM).toLowerCase(), index = 3;
                break;
            case "Capacidade RAM":
                p1 = JSON.stringify(test.Capacidade_RAM).toLowerCase(), index = 4;
                break;
            case "Quantidade HD":
                p1 = JSON.stringify(test.Quantidade_HD).toLowerCase(), index = 5;
                break;
            case "Capacidade HD":
                p1 = JSON.stringify(test.Capacidade_HD).toLowerCase(), index = 6;
                break;
            case "Marca Fonte":
                p1 = JSON.stringify(test.Marca_Fonte).toLowerCase(), index = 7;
                break;
            case "Modelo Fonte":
                p1 = JSON.stringify(test.Modelo_Fonte).toLowerCase(), index = 8;
                break;
            case "Marca Processador":
                p1 = JSON.stringify(test.Marca_Processador).toLowerCase(), index = 9;
                break;
            case "Velocidade Processador":
                p1 = JSON.stringify(test.Velocidade_Processador).toLowerCase(), index = 10;
                break;
            default:              
                p1 = JSON.stringify(test.ID).toLowerCase(), index = 0;      
        }                
        p2 = pesquisa.toLowerCase();          
        if(p1.includes(p2)){
            document.getElementById("tabcorpo").innerHTML += ("<tr id='row"+key+"'><td>"+test.ID+"</td><td>"+test.Marca_Placa_Mae+"</td><td>"+test.Modelo_Placa_Mae+
            "</td><td>"+test.Quantidade_RAM+"</td><td>"+test.Capacidade_RAM+"</td><td>"+test.Quantidade_HD+"</td><td>"+test.Capacidade_HD+
            "</td><td>"+test.Marca_Fonte+"</td><td>"+test.Modelo_Fonte+"</td><td>"+test.Marca_Processador+"</td><td>"+test.Velocidade_Processador+"</td></tr>");           
        }                                    
    });
    localStorage.setItem("countlocst", countlocst);
    var ordem, aux, table = document.getElementById("tabela");
    switch(document.getElementById("dropdownMenu2").innerHTML) {
        case "Decrescente":
            ordem = 0;
            break;
        default:
            ordem = 1;
    }    
    for(var i=table.rows.length-1; i>=1; i--){
        for(var j=1; j<i; j++){            
            if (ordem){
                if (table.rows[j].cells[index].innerHTML > table.rows[j+1].cells[index].innerHTML){                   
                    aux = table.rows[j+1].innerHTML;
                    table.rows[j+1].innerHTML = table.rows[j].innerHTML;
                    table.rows[j].innerHTML = aux;
                }                              
            }else{
                if (table.rows[j].cells[index].innerHTML < table.rows[j+1].cells[index].innerHTML){                   
                    aux = table.rows[j+1].innerHTML;
                    table.rows[j+1].innerHTML = table.rows[j].innerHTML;
                    table.rows[j].innerHTML = aux;
                }
            }
        }
    }                   
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
    document.getElementById("dropdownMenu1").innerHTML = val;      
}
function ordenar(val){
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