var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColunas(["Nome", "Preco", "Unidade"]);
    grid.setLarguraColunas(["*", "100", "100"]);
    grid.setColunasTipo(["str", "flt", "int"]);
    grid.setColunasEventos(['noEvent', 'noEvent', 'check']);
    grid.setColunasAlinhamento(['center', 'left', 'left']);
    
    // Monitor de checked do grid
    grid.monitorDeEventos("onCheck", function(valor, data, linha, coluna) {
        console.log(valor, coluna, linha, data);
    });
    
    grid.init(js);
};