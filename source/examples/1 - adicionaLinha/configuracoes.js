var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColunas(["Nome", "Preco", "Unidade"]);
    grid.setLarguraColunas(["*", "100", "100"]);
    grid.setColunasTipo(["str", "flt", "int"]);
    grid.setColunasEventos(['noEvent', 'noEvent', 'noEvent']);
    grid.setColunasAlinhamento(['center', 'left', 'left']);
    grid.init(js);
    
    // Monitor de Events
    grid.monitorDeEventos("adicionaLinha", function(obj) {
        console.log(obj);
    });
    
    document.getElementById('button').onclick = function() {
        grid.adicionaLinha(1000, ['Teste', '0', 'Teste']);
    };
    
};