window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "170", "60"]);
    grid.setColumsType(["str", "int", "flt"]);
    grid.setColumsEvents(["edit", "number", "check"]);
    grid.setColumsMask(["not", "(99) 9999-99999", "not"]); // Mask
    grid.setMonitorEvents("onEdit", function(valorA,valorN, colum, linha, data) {
        console.log(valorA,valorN , colum, linha, data);
    });
    grid.init(js);
    
    
    document.body.onclick= function () {
        grid.getRowSelected();
    };
};