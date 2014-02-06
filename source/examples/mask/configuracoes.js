window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "170", "60"]);
    grid.setColumsType(["str", "int", "int"]);
    grid.setColumsEvents(["edit", "number", "check"]);
    grid.setColumsMask(["not", "(99) 9999-99999", "not"]); // Mask
    grid.init(js);
    
};