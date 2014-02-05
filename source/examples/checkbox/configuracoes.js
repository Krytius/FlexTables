window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "int", "int"]); //
    
    // Tipo check
    grid.setColumsEvents(["edit", "number", "check"]);
    
    // Monitor de checked do grid
    grid.setMonitorEvents("onCheck", function(valor, coluna, linha, data) {
        console.log(valor, coluna, linha, data);
    });
    
    // Monitor do objeto que e passado ao iniciar o grid
    grid.setMonitorEvents("onObject", function(json) {
        console.log(json);
    });
    
    grid.init(js);
};