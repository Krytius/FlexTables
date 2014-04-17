var GridCreate = function() {

    //
    //
    //  Globais
    //
    //

    var $, create, element, object, constante;
    var larguraHeader;
    var largura, colunas, eventos, tipo, alinhamento;
    var linha = 0;

    var adicionaCallback;

    //
    //
    //  Getters e Setters
    //
    //

    // ================================================
    //  Callback Monitor de Eventos ( Adicionar Linha )
    // ================================================
    var setAdicionaCallback = function(callback) {
        adicionaCallback = callback;
        return;
    };

    var getAdicionaCallback = function(callback) {
        return adicionaCallback;
    };

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
        largura = retorno.getLarguraColunas();
        eventos = retorno.getColunasEventos();
        colunas = retorno.getColunas();
        tipo = retorno.getColunasTipo();
        alinhamento = retorno.getColunasAlinhamento();

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
        var quant = colunas.length;

        var div = create('div');
        div.className = "mw-header";

        var table = create('table');
        table.style.width = (element.offsetWidth - constante.LARGURA_SCROLL) + "px";

        var tr = create('tr');

        for (var i = 0; i < quant; i++) {
            var td = create('td');
            td.setAttribute('data-id', i);
            td.setAttribute('type-coluna', tipo[i]);
            td.className = 'mw-header-td';
            td.onclick = object.gridEvent.ordenar;

            var divTd = create('div');
            divTd.className = "mw-header-td-div";
            divTd.style.width = (largura[i]) + 'px';

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
        div.onkeydown = object.gridMark.movimentLine;

        if (quantLinhas > 0) {
            var table = create('table');
            table.style.width = (element.offsetWidth - constante.LARGURA_SCROLL) + "px";

            for (var l = 0; l < quantLinhas; l++) {
                var tr = addLinha(objeto.rows[l], l);
                table.appendChild(tr);
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
    
    /**
     * Refresh
     * 
     * @description ::  Remonta o grid com novos objetos
     * 
     * @param {Object} objeto
     * @returns {void}
     */
    var refresh = function(objeto) {
        var elemento = $('.mw-content');
        elemento.innerHTML = "";
        var quantLinhas = objeto.rows.length;

        if (quantLinhas > 0) {
            var table = create('table');
            table.style.width = (element.offsetWidth - constante.LARGURA_SCROLL) + "px";

            for (var l = 0; l < quantLinhas; l++) {
                var tr = addLinha(objeto.rows[l], l);
                table.appendChild(tr);
            }

            elemento.appendChild(table);
        } else {
            var div2 = create('div');
            div2.className = 'mw-content-clear';
            div2.style.width = (element.offsetWidth - constante.LARGURA_SCROLL) + "px";
            div2.style.height = (element.offsetHeight - larguraHeader) + "px";
            div2.style.lineHeight = (element.offsetHeight - larguraHeader) + "px";
            div2.innerHTML = idioma[000];
            elemento.appendChild(div2);
        }
    };

    /**
     * AddLinha
     * 
     * @description ::  Adiciona Linha no grid
     * 
     * 
     * @param {Object} obj
     * @param {Integer} l
     * @returns {GridCreate.addLinha.tr}
     * 
     * @example 
     *  var obj = {
     *      id: "",
     *      data: ["Produto Proprio 1", "10", "1"]
     *  };
     *  var id = 10000;
     *  addLinha(obj, id);
     */
    var addLinha = function(obj, l) {
        if (l > linha) {
            linha = l;
        }
        var quantColunas = colunas.length;

        var tr = create('tr');
        tr.className = "mw-content-tr";
        tr.setAttribute('linha-id', l);
        tr.setAttribute('data-id', obj.id);
        tr.onclick = object.gridMark.selectRow;

        for (var c = 0; c < quantColunas; c++) {

            var td = create('td');
            td.className = "mw-content-td";
            td.setAttribute('colum-id', c);
            td.width = largura[c];

            // =================================================================
            //  Chamada dos Eventos da Linha
            // =================================================================
            var divTd = criaColunaTipo(eventos[c], c, obj.data[c]);
            td.appendChild(divTd);
            tr.appendChild(td);
        }
        return tr;
    };

    /**
     * criaColunaTipo
     * 
     * @description :: Cria os tipos de Coluna e seus respectivos eventos.
     * 
     * @param {type} tipo
     * @param {type} indice
     * @param {type} val
     * @returns {GridCreate.createDiv.divTd}
     */
    var criaColunaTipo = function(tipo, indice, val) {
        var elemento;
        switch (tipo) {
            case "edit":
            default:
                elemento = createDiv(indice, val);
                break;
        }
        return elemento;
    };

    /**
     * CreateDiv
     * 
     * @description ::  Criação da coluna do tipo {edit|noEvent}
     *                  Edit    :: Abre um Textfield ( Quando DoubleClick ) 
     *                  noEvent :: Sem Evento
     * 
     * @param {Interger} indice
     * @returns {GridCreate.createDiv.divTd}
     */
    var createDiv = function(indice, val) {

        var divTd = create('div');
        divTd.className = "mw-content-td-div";
        divTd.style.width = (largura[indice]) + "px";

        if (!alinhamento[indice]) {
            alinhamento[indice] = "left";
        }

        divTd.style.textAlign = alinhamento[indice];
        divTd.innerHTML = val;
        divTd.setAttribute('title', val);

        // =============================================================
        // Adicionar Eventos
        // =============================================================
        if (eventos[indice] === "edit") {
            divTd.ondblclick = object.gridEvent.textfield;
        }

        return divTd;
    };

    //
    //
    //  Eventos
    //
    //

    /**
     * AdicionaLinha
     * 
     * @description :: Adiciona Linha no grid.
     * 
     * @param {Interger} id
     * @param {Array} data
     * @returns {void}
     */
    var adicionaLinha = function(id, data) {
        var tabela = $('.mw-content table');

        var obj = {
            id: id,
            data: data
        };

        var tr = addLinha(obj, (linha + 1));
        tabela.appendChild(tr);

        //  ====================================================================
        //  Callbacks
        //  ====================================================================
        if (adicionaCallback) {
            adicionaCallback(obj);
        }
    };

    //
    //
    //  Publicas
    //
    //

    var retorno = {
        init: init,
        refresh: refresh,
        // Eventos
        adicionaLinha: adicionaLinha,
        // Callbacks
        setAdicionaCallback: setAdicionaCallback,
        getAdicionaCallback: getAdicionaCallback
    };
    return retorno;
};