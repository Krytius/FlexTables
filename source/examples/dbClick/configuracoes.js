var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "str", "int"]); //
    grid.setColumsEvents(["edit", "noEdit", "noEdit"]);
    
    grid.setMonitorEvents("onDbClickRow", function(linhaId, dataId) {
        console.log(linhaId, dataId);
    });
    
    grid.init(js);
    
};