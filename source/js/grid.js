/**
 * GridView
 * Project developer gridView open source
 * @author Elvis Ferreira Coelho (elviscoelho.net)
 * @param {DON} idDom
 * @returns {Grid}
 */
function Grid(idDom) {

    //Classes
    var self = this;
    var gridElement = new GridElement;
    var gridEvent = new GridEvent;
    var gridMark = new GridMark;
    var gridManipulate = new GridManipulate;
    var gridContextMenu = new GridContextMenu;

    // Elementos
    var element = document.getElementById(idDom);
    var object = {};
    var colunas = [];
    var colunasWidth = [];
    var colunasType = [];
    var colunasEvents = [];
    var contextMenu = [];

    // Variavel de controle de tentativas
    var tentativas = 0;
    var maximoTentativas = 2;
    var gridLinhaSup = 1000000000;

    // Callbacks
    var callbackOnDeleteRow;


    /**
     * Função que inicia a montagem do Grid
     * @param  {json} json
     * @return {void}
     */
    this.init = function(json) {
        igualaObjetos(json);
        initGrid();
    };

    /**
     * Função que iguala o objeto padrão a todas as classes
     * @param {Object} json
     * @return {void}
     */
    var igualaObjetos = function(json) {
        object = json;
        gridElement.init(json);
        gridEvent.init(json);
        gridMark.init(json);
        gridManipulate.init(element, object, colunas, colunasWidth, colunasType, colunasEvents);
        gridContextMenu.init(json, contextMenu, gridMark.selectionRowForce);
    };

    /**
     * Função que inicia processo de plotagem do grid
     * @return {void}
     */
    var initGrid = function() {
        if (colunas.length > 0) {
            if (colunasWidth.length > 0 || tentativas >= maximoTentativas) {
                setWidthColumsEqual();
            } else {
                tentativas++;
                setTimeout(function() {
                    console.log(idioma[002]);
                    initGrid();
                }, 30);
                return;
            }
            header();
            content(object);
        } else {
            setTimeout(function() {
                console.log(idioma[001]);
                initGrid();
            }, 300);
        }
    };

    /**
     * Seta largura das colunas em pixel
     * @param {Array} wColums Array de objetos numericos com valor tamanho das colunas
     */
    this.setWidthColums = function(wColums) {
        var quant = wColums.length;
        var tamanhoDisponibilizado = element.offsetWidth - 17;
        var quantidadeAsterisco = 0;
        var tamanhoAsterisco = 0;

        for (var i = 0; i < quant; i++) {
            if (wColums[i] === "*") {
                quantidadeAsterisco++;
            } else {
                tamanhoDisponibilizado -= parseInt(wColums[i]);
            }
        }

        tamanhoAsterisco = tamanhoDisponibilizado / quantidadeAsterisco;

        for (var i = 0; i < quant; i++) {
            if (wColums[i] === "*") {
                colunasWidth.push(tamanhoAsterisco);
            } else {
                colunasWidth.push(parseInt(wColums[i]));
            }
        }
        return;
    };

    /**
     * Seta largura das colunas em porcentagem
     * @param {Array} wColums Array de objetos numericos com valor tamanho das colunas
     */
    this.setWidthColumsPercent = function(wColums) {
        var quant = wColums.length;
        var tamanho = element.offsetWidth - 17;
        var tamanhoDisponibilizado = element.offsetWidth;
        var quantidadeAsterisco = 0;
        var tamanhoAsterisco = 0;

        for (var i = 0; i < quant; i++) {
            if (wColums[i] === "*") {
                quantidadeAsterisco++;
            } else {
                var calculoPorcentagem = (tamanho * parseInt(wColums[i])) / 100;
                tamanhoDisponibilizado -= calculoPorcentagem;
            }
        }

        tamanhoAsterisco = tamanhoDisponibilizado / quantidadeAsterisco;

        for (var i = 0; i < quant; i++) {
            if (wColums[i] === "*") {
                colunasWidth.push(tamanhoAsterisco);
            } else {
                colunasWidth.push((tamanho * parseInt(wColums[i])) / 100);
            }
        }
        return;
    };

    /**
     * Função que seta todas colunas com mesma largura
     * @return {void}
     */
    var setWidthColumsEqual = function() {
        var quant = colunas.length;
        var tamanho = element.offsetWidth - 17;
        var tamanhoIgual = tamanho / quant;

        for (var i = 0; i < quant; i++) {
            colunasWidth.push(tamanhoIgual);
        }
        return;
    };

    /**
     * Função que seta colunas do Grid
     * @param {Array} headers Array com nome de todas as colunas
     * @returns {void}
     */
    this.setColums = function(headers) {
        colunas = headers;
        return;
    };

    /**
     * Função que seta tipos das colunas
     * @param {Array} types tipos das colunas
     *
     * @description str = String / int = Interger
     */
    this.setColumsType = function(types) {
        colunasType = types;
        return;
    };

    /**
     * Função que seta o evento que pode ocorrer na coluna
     * @param {Array} events tipos dos eventos da coluna
     * @returns {void}
     * 
     * @description noEdit = Sem evento / edit = textBox
     */
    this.setColumsEvents = function(events) {
        colunasEvents = events;
        return;
    };

    this.setContextMenu = function(menus) {
        contextMenu = menus;
        return;
    };

    /**
     * Função que monta cabeçalho do grid
     * @return {void}
     */
    var header = function() {
        var quant = colunas.length;

        var div = create('div');
        div.className = "mw-header";

        var table = create('table');
        table.style.width = element.offsetWidth - 17 + "px";

        var tr = create('tr');

        for (var i = 0; i < quant; i++) {
            var td = create('td');
            td.width = colunasWidth[i];
            td.setAttribute('data-id', i);
            td.setAttribute('type-coluna', colunasType[i]);
            td.className = 'mw-header-td';
            td.onclick = function() {
                gridEvent.ordenar(this, object, function(objectJson) {
                    self.refreshGrid(objectJson);
                });
            };

            var divTd = create('div');
            divTd.className = "mw-header-td-div";
            divTd.innerHTML = colunas[i];

            td.appendChild(divTd);
            tr.appendChild(td);
        }

        table.appendChild(tr);
        div.appendChild(table);
        element.appendChild(div);
    };

    /**
     * Função que monta corpo do grid
     * @param {Object} objectJson
     * @return {void}
     */
    var content = function(objectJson) {
        var quantColunas = colunas.length;
        var quantLinhas = objectJson.rows.length;

        var div = create('div');
        div.className = "mw-content";
        div.style.height = element.offsetHeight - 42 + "px";
        div.tabIndex = "1";
        div.onkeydown = gridMark.movimentLine;

        var table = create('table');
        table.style.width = element.offsetWidth - 17 + "px";

        for (var l = 0; l < quantLinhas; l++) {
            var tr = create('tr');
            tr.className = "mw-content-tr";
            tr.setAttribute('linha-id', l);
            tr.setAttribute('data-id', objectJson.rows[l].id);
            tr.onclick = gridMark.selectRow;

            if (contextMenu) {
                tr.oncontextmenu = gridContextMenu.vicContextMenu;
            }

            for (var c = 0; c < quantColunas; c++) {

                var td = create('td');
                td.className = "mw-content-td";
                td.setAttribute('colum-id', c);
                td.width = colunasWidth[c];

                var divTd = create('div');
                divTd.className = "mw-content-td-div";
                divTd.innerHTML = objectJson.rows[l].data[c];
                gridElement.elementEvent(divTd, colunasEvents[c], function(obj) {
                    object = obj;
                });

                td.appendChild(divTd);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        table.appendChild(tr);
        div.appendChild(table);
        element.appendChild(div);

        // Eventos
        var objetosCallbacks = {
            addRow: self.addRow
        };
        gridMark.parametrosPaginacao(div, objetosCallbacks);
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
        tr.setAttribute('linha-id', parseInt(element.childNodes[1].childNodes[0].childNodes.length));
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

            var divTd = create('div');
            divTd.className = "mw-content-td-div";

            if (custom)
                divTd.innerHTML = objetoLinha.itensColunas[c];
            else
                divTd.innerHTML = (colunasType[c] === "str") ? idioma['newRow'] : idioma['newRowNumber'];

            gridElement.elementEvent(divTd, colunasEvents[c], function(obj) {
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
            case "onKeyPress":
                gridMark.setCallbackOnKeyPress(callback);
                break;
            case "onDeleteRow":
                setCallbackOnDeleteRow(callback);
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
     * Monitor de eventos de deleção de linha
     * @param {Function} callback
     * @returns {void}
     */
    var setCallbackOnDeleteRow = function(callback) {
        callbackOnDeleteRow = callback;
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

}