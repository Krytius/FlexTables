var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "sle", "int"]); //
    grid.setColumsEvents(["edit", "select", "number"]);
    
    grid.setMonitorEvents("onEdit", function(aValor, nValor, colum, linhaId, dataId) {
        console.log(aValor, nValor, colum, linhaId, dataId);
    });
    
    grid.setMonitorEvents("onObject", function(js) {
        console.log(js);
    });
    
    grid.init(js);
    
    
    document.getElementById('button').onclick = function() {
        grid.addRow({
            "dataId":"868",
            "itensColunas":["Produto Proprio 5",{ selected: 0, itens: ["1","2","3"] },"2"]
        });
    };
};