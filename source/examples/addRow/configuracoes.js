var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "flt", "int"]); //
    grid.setColumsEvents(["edit", "noEvent", "number"]);
    //grid.setWidthColumsPercent(["*", "*", "10", "30"]); //Colunas em %
    grid.init(js);
//        grid.setMonitorEvents("onKeyPress", function(key,cntrol,shift,alt){
//            console.log(key,cntrol,shift, alt);
//        });
    grid.setMonitorEvents("onDeleteRow", function(linhaId, dataId) {
        console.log(linhaId, dataId);
    });
    grid.setMonitorEvents("onEdit", function(aValor, nValor, colum, linhaId, dataId) {
        console.log(aValor, nValor, colum, linhaId, dataId);
    });


    //Add Linha Custom
    document.getElementById("button").onclick = function() {
        grid.addRow({
            itensColunas: ["Nova Linha 2", 0, 0], dataId: 100000, position: 0
        });
    };
    //Deleta linha selecionada pelo id
    document.getElementById("buttonDel").onclick = function() {
        grid.deleteRowId(grid.getRowSelectedId());
    };
    document.getElementById("buttonLinhaSelecionada").onclick = function() {
        console.log(grid.getRowSelected());
    };
};