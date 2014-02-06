window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "170", "60"]);
    grid.setColumsType(["str", "mon", "int"]);
    grid.setColumsEvents(["edit", "number", "check"]);
    grid.setColumsMask(["not", "not", "not"]); // Mask
    grid.init(js);
    
};