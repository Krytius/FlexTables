var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColunas(["Nome", "Preco", "Unidade"]);
    grid.setLarguraColunas(["*", "100", "100"]);
    grid.setColunasTipo(["str", "flt", "int"]);
    grid.setColunasEventos(['edit', 'edit', 'edit']);
    grid.setColunasAlinhamento(['center', 'center', 'left']);
    grid.init(js);
    
    // Monitor de Eventos
    grid.monitorDeEventos("onEditar", function(antigoValor, valor, dataID, linhaID, colunaID) {
        console.log(antigoValor, valor, dataID, linhaID, colunaID);
    });
};