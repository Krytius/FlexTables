window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "flt", "int"]); //
    grid.setColumsEvents(["edit", "noEvent", "number"]);
    grid.setContextMenu([{
            name: "Alerta",
            icon: "img/salvar.jpg",
            callback: function(rowId, dataId) {
                alert(rowId + " / " + dataId);
            }
        }, {
            name: "Console",
            icon: "img/salvar.jpg",
            callback: function(rowId, dataId) {
                console.log(rowId, dataId);
            }
        }]);
    grid.init(js);
};