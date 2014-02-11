var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "flt", "int"]); //
    grid.setColumsEvents(["edit", "noEvent", "number"]);
    grid.setColumsFilter([
        {status: true, icon: 'img/mercado.png'},
        {status: false, icon: 'img/mercado.png'},
        {status: true, icon: 'img/mercado.png'}
    ]);

    grid.setMonitorEvents("onObject", function(json) {
        console.log(json);
    });

    grid.setMonitorEvents("onEdit", function(a, b, c, d, e) {
        console.log(a, b, c, d, e);
    });

    grid.init(js);
};