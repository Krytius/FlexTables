window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "flt", "int"]); //
    grid.setColumsEvents(["edit", "noEvent", "number"]);
    grid.setContextMenu([{
            menu: "Menu 1",
            icon: "Teste",
            callback: function(){
                alert('aqui');
            }
    },{
            menu: "Menu 2",
            icon: "Teste",
            callback: function(){
                console.log('aqui');
            }
    }]);
    grid.init(js);
};