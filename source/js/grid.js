/**
 * GridView
 * Project developer gridView open source
 * @author Elvis Ferreira Coelho (elviscoelho.net)
 * @param {DON} idDom
 * @returns {Grid}
 */
function Grid(idDom) {
    //
    //
    //  Classes
    //
    //
    var gridCreate = new GridCreate();

    //  
    //  
    //  Variaveis Globais
    //  
    //
    
    var constante = {
        LARGURA_SCROLL: 17
    };

    var element = document.getElementById(idDom);
    var object = {};
    var colunas = [];
    var colunasLargura = [];
    var colunasAlinhamento = [];
    var colunasTipo = [];
    var colunasEventos = [];

    var tentativas = 0;
    var maximoTentativas = 2;
    var gridLinhaSup = 1000000000;

    //
    //
    //  Getters / Setters
    //
    //
    
    // ========================================
    //  Constantes
    // ========================================
    var setConstantes = function (consts) {
        constante = consts;
        return;
    };
    
    var getConstantes = function () {
        return constante;
    };

    // ========================================
    //  Object
    // ========================================
    var setObject = function(obj) {
        object = obj;
        return;
    };

    var getObject = function() {
        return object;
    };

    // ========================================
    //  Colunas
    // ========================================
    var setColunas = function(col) {
        colunas = col;
        return;
    };

    var getColunas = function() {
        return colunas;
    };

    // ========================================
    //  Largura Colunas
    // ========================================
    var setColunasWidth = function(wCol) {
        colunasLargura = wCol;
        return;
    };

    var getColunasWidth = function() {
        return colunasLargura;
    };
    
    // ========================================
    //  Alinhamento Colunas
    // ========================================
    var setColunasAlinhamento = function(wCol) {
        colunasAlinhamento = wCol;
        return;
    };

    var getColunasAlinhamento = function() {
        return colunasAlinhamento;
    };

    // ========================================
    //  Tipo da Coluna
    // ========================================
    var setColunasTipo = function(types) {
        colunasTipo = types;
        return;
    };

    var getColunasTipo = function() {
        return colunasTipo;
    };

    // ========================================
    //  Eventos da Coluna
    // ========================================
    this.setColunasEventos = function(events) {
        colunasEventos = events;
        return;
    };



    /**
     * Função que inicia a procedimento de montagem do Grid
     * @param  {json} json
     * @return {void}
     */
    var init = function(json) {
        setObject(json);
        initGrid();
    };

    
    /**
     * Função que inicia processo de plotagem do grid
     * @return {void}
     */
    var initGrid = function() {
        if (colunas.length > 0) {
            if (!(colunasLargura.length > 0) && tentativas <= maximoTentativas) {
                tentativas++;
                setTimeout(function() {
                    console.log(idioma[002]);
                    initGrid();
                }, 30);
                return;
            } else if(!(colunasLargura.length > 0)) {
                setLarguraColunasIgual();
            }
            
            setLarguraColunas(getColunasWidth());
            gridCreate.init(retorno);
        } else {
            setTimeout(function() {
                console.log(idioma[001]);
                initGrid();
            }, 300);
        }
    };

    /**
     * setLarguraColunas
     * 
     * @description  :: Seta largura das colunas em pixel.
     * 
     * @param {Array} wColums   Array de objetos numericos com valor 
     *                          tamanho das colunas
     * @return {void}
     */
    var setLarguraColunas = function(wColums) {
        // Global
        colunasLargura = [];
        
        // Procedimento
        var quant = wColums.length;
        var tamanhoDisponivel = element.offsetWidth - constante.LARGURA_SCROLL;
        var quantidadeAsterisco = 0;
        var tamanhoAsterisco = 0;
        
        // =====================================================================
        // Cálculo da Quantidade de Asterisco mais a quantidade de espaço que
        // sobrou.
        // =====================================================================
        for (var i = 0; i < quant; i++) {
            if (wColums[i] === "*") {
                quantidadeAsterisco++;
            } else {
                tamanhoDisponivel -= parseInt(wColums[i]);
            }
        }
        
        tamanhoAsterisco = (tamanhoDisponivel / quantidadeAsterisco);
        
        for (var i = 0; i < quant; i++) {
            if (wColums[i] === "*") {
                colunasLargura.push(tamanhoAsterisco);
            } else {
                colunasLargura.push(parseInt(wColums[i]));
            }
        }
        return colunasLargura;
    };

    /**
     * SetLarguraColunasIgual
     * 
     * @description ::  Função que seta todas colunas do grid com mesma largura
     *                  e retorna um array com o as larguras igualadas para
     *                  criação do grid.
     *                  
     * @return {Array}
     */
    var setLarguraColunasIgual = function() {
        // Global
        colunasLargura = [];
        
        // Procedimento
        var quant = colunas.length;
        var tamanho = element.offsetWidth - 17;
        var tamanhoIgual = tamanho / quant;
        for (var i = 0; i < quant; i++) {
            colunasLargura.push(tamanhoIgual);
        }
        
        return colunasLargura;
    };



    /**
     * Função que constroí filtro se houver parâmetros de filtros
     * @returns {void}
     */
    var filter = function() {
        if (!(colunasFilter.length > 0))
            return;

        // Variaveis
        var quantColunas = colunas.length;
        var colunasComFiltros = [];

        for (var i = 0; i < quantColunas; i++) {
            if (colunasFilter[i].status)
                colunasComFiltros.push([colunasFilter[i], i]);
        }

        gridFilter.setColumsFilter(colunasComFiltros);
        gridFilter.constructFilter();
    };

    /**
     * Função que adiciona uma linha ao grid
     * @param {object} objetoLinha
     * @returns {void}
     *
     * @description {
     *  itensColunas: [], dataId: 0, position: 0
     * }
     */
    this.addRow = function(objetoLinha) {
        var quantColunas = colunas.length;
        var custom = false;

        if (objetoLinha.itensColunas && objetoLinha.dataId) {
            custom = true;
            object.rows.push({
                id: objetoLinha.dataId,
                data: objetoLinha.itensColunas
            });
            igualaObjetos(object);
        }

        var tr = create('tr');
        tr.className = "mw-content-tr";
        tr.setAttribute('linha-id', parseInt(selector('div.mw-content').childNodes[0].childNodes.length));
        tr.onclick = gridMark.selectRow;

        if (custom)
            tr.setAttribute('data-id', parseInt(objetoLinha.dataId));
        else
            tr.setAttribute('data-id', "-1");

        for (var c = 0; c < quantColunas; c++) {

            var td = create('td');
            td.className = "mw-content-td";
            td.setAttribute('colum-id', c);
            td.width = colunasWidth[c];

            var valor;
            if (custom) {
                valor = objetoLinha.itensColunas[c];
            } else {
                if (colunasType[c] === "str") {
                    valor = idioma['newRow'];
                } else if (colunasType[c] === "sle") {
                    valor = object.rows[0].data[c];
                } else {
                    valor = idioma['newRowNumber'];
                }
            }

            var divTd = gridElement.createColumType(colunasEvents[c], valor, colunasWidth[c] - 10, c);
            gridElement.elementEvent(divTd, colunasEvents[c], colunasType[c], function(obj) {
                igualaObjetos(obj);
            });

            td.appendChild(divTd);
            tr.appendChild(td);
        }

        var table = selector('.mw-content table');

        if (custom) {
            table.insertBefore(tr, table.childNodes[objetoLinha.position]);
            element.childNodes[1].scrollTop = (objetoLinha.position * 42) - 42;
            gridMark.selectionRowForce(tr);
        } else {
            table.appendChild(tr);
            element.childNodes[1].scrollTop = table.offsetHeight;
        }

        gridLinhaSup++;
        return tr;
    };

    /**
     * Função que apaga linha pela numero do filho
     * @param {Interger} linhaId
     * @returns {void}
     */
    this.deleteRow = function(linhaId) {

        var table = selector('.mw-content table');
        var scrollTop = selector('.mw-content').scrollTop;
        var dataId = table.childNodes[linhaId].getAttribute('data-id');

        table.removeChild(table.childNodes[linhaId]);
        object.rows.splice(linhaId, 1);
        self.refreshGrid(object);
        igualaObjetos(object);
        selector('.mw-content').scrollTop = scrollTop;

        // Verificação se linha deletada não é a marcada
        if (linhaId === gridMark.getLinhaAnterior()) {
            gridMark.setLinhaAnterior(null);
        }

        if (callbackOnDeleteRow)
            callbackOnDeleteRow(parseInt(linhaId), parseInt(dataId));
    };

    /**
     * Função que apaga linha pelo id do object
     * @param {Interger} dataId
     * @returns {void}
     */
    this.deleteRowId = function(dataId) {

        var linhaId = selector('tr.mw-content-tr[data-id="' + dataId + '"]').getAttribute('linha-id');
        var scrollTop = selector('.mw-content').scrollTop;

        object.rows.splice(linhaId, 1);
        self.refreshGrid(object);
        igualaObjetos(object);
        selector('.mw-content').scrollTop = scrollTop;

        // Verificação se linha deletada não é a marcada
        if (linhaId === gridMark.getLinhaAnterior()) {
            gridMark.setLinhaAnterior(null);
        }

        if (callbackOnDeleteRow)
            callbackOnDeleteRow(parseInt(linhaId), parseInt(dataId));
    };

    /**
     * Id Selecionado
     * @return {Interger} Id selecionado Representa Id do objeto
     */
    this.getRowSelectedId = function() {
        var rowSelect = gridMark.getRowSelect();
        return rowSelect.idSelect;
    };

    /**
     * Linha Selecionada
     * @return {Interger} Linha selecionada Representa array
     */
    this.getRowSelected = function() {
        var rowSelect = gridMark.getRowSelect();
        return rowSelect.rowSelect;
    };

    var rowDbClick = function() {
        var linhaId = this.getAttribute('linha-id');
        var dataId = this.getAttribute('data-id');
        callbackOnDbClick(linhaId, dataId);
    };

    /**
     * Clear dos filtros
     * @param  {Function} callback
     * @return {void}
     */
    this.clearFilter = function(callback) {
        var obj = gridFilter.clearFilter();
        callback(obj.filtroId, obj.columId);
        return;
    };
    
    /**
     * Monitora eventos do grid
     * @param {String} event
     * @param {Function} callback
     * @returns {void}
     */
    this.setMonitorEvents = function(event, callback) {
        switch (event) {
            case "onEdit":
                gridElement.setCallbackOnEdit(callback);
                break;
            case "onCheck":
                gridElement.setCallbackOnCheck(callback);
                break;
            case "onKeyPress":
                gridMark.setCallbackOnKeyPress(callback);
                break;
            case "onDeleteRow":
                setCallbackOnDeleteRow(callback);
                break;
            case "onObject":
                setMonitoringAlterObject(callback);
                break;
            case "onDbClickRow":
                setDbClickRow(callback);
                break;
        }
    };

    /**
     * Atualiza grid
     * @param {Object} objectJson
     * @returns {void}
     */
    this.refreshGrid = function(objectJson) {
        igualaObjetos(objectJson);
        var contentElemt = selector('.mw-content');
        element.removeChild(contentElemt);
        content(objectJson);
    };

    /**
     * Função que atualiza grid sem alterar objeto
     * @param {Object} objectJson
     * @returns {void}
     */
    var refreshGridOrganizacao = function(objectJson) {
        var contentElemt = selector('.mw-content');
        element.removeChild(contentElemt);
        content(objectJson);
        igualaObjetosSemAlterarOPrincipal(objectJson);
    };

    /**
     * Monitor de eventos de deleção de linha
     * @param {Function} callback
     * @returns {void}
     */
    var setCallbackOnDeleteRow = function(callback) {
        callbackOnDeleteRow = callback;
        return;
    };

    /**
     * Monitor de eventos do objeto principal
     * @param {Function} callback
     * @returns {void}
     */
    var setMonitoringAlterObject = function(callback) {
        callbackAlterObject = callback;
        return;
    };

    var setDbClickRow = function(callback) {
        callbackOnDbClick = callback;
        return;
    };

    /**
     * Função que busca elemento DON
     * @param  {String} elem
     * @return {DON}
     */
    var selector = function(elem) {
        return document.querySelectorAll(elem)[0];
    };

    /**
     * Função que cria elemento na DON
     * @param  {String} elem
     * @return {DON}
     */
    var create = function(elem) {
        return document.createElement(elem);
    };

    var retorno = {
        // Inicialização do Grid
        init: init,
        // Getters e Setters
        setObject: setObject,
        getObject: getObject,
        setColunas: setColunas,
        getColunas: getColunas,
        setLarguraColunas: setColunasWidth,
        getLarguraColunas: getColunasWidth,
        setColunasAlinhamento: setColunasAlinhamento,
        getColunasAlinhamento: getColunasAlinhamento,
        setColunasTipo: setColunasTipo,
        getColunasTipo: getColunasTipo,
        getConstantes: getConstantes,
        
        // Manipulação de DON
        element: element,
        $: selector,
        create: create,
        
        // Classes
        gridCreate: gridCreate
    };

    return retorno;
}