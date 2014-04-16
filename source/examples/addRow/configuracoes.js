var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColunas(["Nome", "Preco", "Unidade"]);
    grid.setLarguraColunas(["*", "100", "100"]);
    grid.setColunasTipo(["str", "flt", "int"]);
    grid.setColunasAlinhamento(['center', 'left', 'left']);
    grid.init(js);
};