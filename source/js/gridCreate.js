var GridCreate = function() {

    var $, create, element, object, constante;
    var larguraHeader;

    //
    //
    //  Procedimentos
    //
    //

    /**
     * Init
     * 
     * @description :: Inicialização do módulo e procedimento de DON do plugin
     *                 grid
     * 
     * @param {Object} retorno
     * @returns {void}
     */
    var init = function(retorno) {
        // =====================================================================
        // Métodos Globais;
        // =====================================================================
        object = retorno;
        element = retorno.element;
        constante = retorno.getConstantes();
        $ = retorno.$;
        create = retorno.create;

        // =====================================================================
        // Inicializar
        // =====================================================================
        initCreate();
    };

    /**
     * InitCreate 
     * 
     * @description ::  Criação do Grid
     * 
     * @returns {void}
     */
    var initCreate = function() {
        header();
        content();
    };

    //
    //
    //  Manipulação DON
    //
    //

    /**
     * Header (Cabeçalho)
     * 
     * @description ::  Criação do Cabeçalho do Grid através da largura e
     *                  colunas informadas.
     * 
     * @returns {void}
     */
    var header = function() {
        var colunas = object.getColunas();
        var largura = object.getLarguraColunas();
        var tipo = object.getColunasTipo();
        var alinhamento = object.getColunasAlinhamento();

        var quant = colunas.length;

        var div = create('div');
        div.className = "mw-header";

        var table = create('table');
        table.style.width = element.offsetWidth - constante.LARGURA_SCROLL + "px";

        var tr = create('tr');

        for (var i = 0; i < quant; i++) {

            var td = create('td');
            td.width = largura[i];
            td.setAttribute('data-id', i);
            td.setAttribute('type-coluna', tipo[i]);
            td.className = 'mw-header-td';
            td.onclick = function() {
//                gridEvent.ordenar(this, function(objectJson) {
//                    refreshGridOrganizacao(objectJson);
//                });
            };

            var divTd = create('div');
            divTd.className = "mw-header-td-div";

            if (!alinhamento[i]) {
                alinhamento[i] = "left";
            }

            divTd.style.textAlign = alinhamento[i];
            divTd.innerHTML = colunas[i];

            td.appendChild(divTd);
            tr.appendChild(td);
        }

        table.appendChild(tr);
        div.appendChild(table);
        element.appendChild(div);
        larguraHeader = $('.mw-header').offsetHeight;
    };


    /**
     * Content (Corpo do Grid)
     * 
     * @description ::     Função que monta corpo do grid
     * 
     * @return {void}
     */
    var content = function() {
        var objeto = object.getObject();
        var quantLinhas = objeto.rows.length;

        var div = create('div');
        div.className = "mw-content";
        div.style.height = (element.offsetHeight - larguraHeader) + "px";
        div.tabIndex = "1";
        //div.onkeydown = gridMark.movimentLine;

        if (quantLinhas > 0) {
            var table = create('table');
            table.style.width = (element.offsetWidth - constante.LARGURA_SCROLL) + "px";

            for (var l = 0; l < quantLinhas; l++) {
                addLinha(objeto.rows[l], l, table);
            }

            div.appendChild(table);
        } else {
            var div2 = create('div');
            div2.className = 'mw-content-clear';
            div2.style.width = (element.offsetWidth - constante.LARGURA_SCROLL) + "px";
            div2.style.height = (element.offsetHeight - larguraHeader) + "px";
            div2.style.lineHeight = (element.offsetHeight - larguraHeader) + "px";
            div2.innerHTML = idioma[000];
            div.appendChild(div2);
        }

        element.appendChild(div);
    };

    var addLinha = function(obj, l, table) {
        var largura = object.getLarguraColunas();
        var tipo = object.getColunasTipo();
        var alinhamento = object.getColunasAlinhamento();
        var colunas = object.getColunas();
        var quantColunas = colunas.length;

        var tr = create('tr');
        tr.className = "mw-content-tr";
        tr.setAttribute('linha-id', l);
        tr.setAttribute('data-id', obj.id);
        //tr.onclick = gridMark.selectRow;
//
//            if (callbackOnDbClick) {
//                tr.ondblclick = rowDbClick;
//            }
//
//            if (contextMenu.length > 0) {
//                tr.oncontextmenu = gridContextMenu.vicContextMenu;
//            }

        for (var c = 0; c < quantColunas; c++) {

            var td = create('td');
            td.className = "mw-content-td";
            td.setAttribute('colum-id', c);
            td.width = largura[c];

//                var divTd = gridElement.createColumType(colunasEvents[c], objectJson.rows[l].data[c], colunasWidth[c], c);
//                gridElement.elementEvent(divTd, colunasEvents[c], colunasType[c], function(obj) {
//                    igualaObjetos(obj);
//                });

            //td.appendChild(divTd);
            tr.appendChild(td);
        }
        table.appendChild(tr);




        // Eventos
//        var objetosCallbacks = {
//            addRow: self.addRow
//        };

        //gridMark.parametrosPaginacao(div, objetosCallbacks);  
    };

    //
    //
    //  Publicas
    //
    //

    var retorno = {
        init: init
    };
    return retorno;
};