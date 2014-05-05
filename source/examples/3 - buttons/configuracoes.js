var grid;
window.onload = function() {
    
    var eventoTeste = function(id) {
        console.log(id);
    };
    
    grid = new Grid("grid");
    grid.setColunas(["Nome", "Preco", "Unidade"]);
    grid.setLarguraColunas(["*", "100", "100"]);
    grid.setColunasTipo(["str", "flt", "int"]);
    grid.setColunasEventos(['noEvent', 'button', 'noEvent']);
    grid.setColunasAlinhamento(['center', 'center', 'center']);
    grid.setColunasBotoes([{},{
    	classe: 'button2',
    	id: 'button2',
    	evento: eventoTeste,
        html: "Teste"
    },{}]);
    grid.init(js);
};