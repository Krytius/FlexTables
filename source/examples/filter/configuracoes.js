var grid;
window.onload = function() {
    grid = new Grid("grid");
    grid.setColums(["Nome", "Preco", "Unidade"]);
    grid.setWidthColums(["*", "100", "100"]); //Colunas em px
    grid.setColumsType(["str", "flt", "int"]); //
    grid.setColumsEvents(["edit", "noEvent", "number"]);
    grid.setColumsFilter([{
        status: true,
        title: 'Mercado e Produto',
        width: '*',
        icon: 'img/mercado.png',
        event: function() {
            grid.clearFilter(function(a, b) {
                console.log(a, b);
            });
        }
    }, {
        status: false,
        icon: 'img/mercado.png'
    }, {
        status: true,
        icon: 'img/mercado.png'
    }]);
    grid.setSearchFilter(function(keycode, val) {
        console.log(keycode,val);
    });

    grid.setMonitorEvents("onObject", function(json) {
        console.log(json);
    });

    grid.setMonitorEvents("onEdit", function(a, b, c, d, e) {
        console.log(a, b, c, d, e);
    });

    grid.init(js);
};