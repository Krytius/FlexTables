var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColunas(["Nome", "Preco", "Unidade"]);
    grid.setLarguraColunas(["*", "100", "100"]);
    grid.setColunasTipo(["str", "flt", "int"]);
    grid.setColunasEventos(['noEvent', 'noEvent', 'noEvent']);
    grid.setColunasAlinhamento(['center', 'left', 'left']);
    grid.init(js);
    
    // Monitor de Events (Error)
    grid.monitorDeEventos("onError", function(obj) {
        alert(obj);
    });
    
    // Monitor de Events (Id da linha Deletada)
    grid.monitorDeEventos("onDelete", function(id, linhaId) {
        console.log(id, linhaId);
    });
    
    document.getElementById('deletaLinha').onclick = function() {
        grid.deletaLinha(873);
    };
    
    document.getElementById('selecionada').onclick = function() {
        grid.deletaLinhaSelecionada();
    };
    
};