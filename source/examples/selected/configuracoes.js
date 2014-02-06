var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "str", "int"]); //
    grid.setColumsEvents(["edit", "selected", "number"]);
    
    grid.setMonitorEvents("onEdit", function(aValor, nValor, colum, linhaId, dataId) {
        console.log(aValor, nValor, colum, linhaId, dataId);
    });
    
    grid.setMonitorEvents("onObject", function(js) {
        console.log(js);
    });
    
    grid.init(js);
};