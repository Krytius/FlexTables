function GridMark() {

    //Globais
    var self = this;
    var object;
    var linhaAnterior;
    var linhaSelectAtual;

    var itensParaScroll = 0;
    var valueDoScroll = 0;

    // Callbacks
    var objetoCallback = {};
    var callbackOnKeyPress;
    var callbackOnDeleteRow;

    /**
     * Função que segura objeto na classe
     * @param {Object} obj
     * @returns {void}
     */
    this.init = function(obj) {
        object = obj;
    };

    this.getLinhaAnterior = function() {
        return linhaAnterior;
    };

    this.setLinhaAnterior = function(val) {
        linhaAnterior = val;
        return;
    };

    /**
     * Função que retorna linha selecionada e linha selecionada anteriorMente
     * @return {[type]} [description]
     */
    this.getRowSelect = function() {

        if (linhaSelectAtual) {
            return {
                rowSelect: linhaSelectAtual,
                idSelect: selector('tr.mw-content-tr[linha-id="' + linhaSelectAtual + '"]').getAttribute('data-id')
            };
        }
        return {
            rowSelect: null,
            idSelect: null
        };
    };

    var removeContext = function() {
        if (selector('.mw-content div.mw-content-context-menu'))
            selector('.mw-content').removeChild(selector('.mw-content div.mw-content-context-menu'));
    };

    /**
     * Seleciona linha do grid
     * @returns {void}
     */
    this.selectRow = function() {
        if (linhaAnterior) {
            var elemet = selector('tr.mw-content-tr[linha-id="' + linhaAnterior + '"]');
            elemet.className = elemet.className.replace(" select", "");
            removeContext();
        }
        linhaSelectAtual = this.getAttribute("linha-id");
        this.className += " select";

        linhaAnterior = linhaSelectAtual;
    };

    /**
     * Seleciona linha do grid adicionado manualmente
     * @param {DON} element
     * @returns {void}
     */
    this.selectionRowForce = function(element) {
        if (linhaAnterior) {
            var elemet = selector('tr.mw-content-tr[linha-id="' + linhaAnterior + '"]');
            elemet.className = elemet.className.replace(" select", "");
            removeContext();
        }

        linhaSelectAtual = element.getAttribute("linha-id");
        element.className += " select";

        linhaAnterior = linhaSelectAtual;
    };

    /**
     * Função que padroniza callbacks de marcação
     * @param {DON} element
     * @param {Functions} callbacks
     * @returns {void}
     */
    this.parametrosPaginacao = function(element, callbacks) {
        objetoCallback = callbacks;

        var quantLinhas = element.childNodes[0].childNodes.length;
        var tamanhoContent = element.offsetHeight;
        var tamanhoTabela = element.childNodes[0].offsetHeight;

        var quantidadePaginas = Math.floor(tamanhoTabela / tamanhoContent) + 1;
        var quantidadePorPaginas = Math.floor(quantLinhas / quantidadePaginas);

        itensParaScroll = quantidadePorPaginas;
        valueDoScroll = tamanhoContent;
    };

    /**
     * Valida se é possivel ocorrer uma seleção de linha para baixo
     * @param {type} num
     * @param {type} element
     * @returns {Boolean}
     */
    var validacaoAcontecimento = function(num, element) {
        if (num < 0)
            return true;
        else if (num > parseInt(element.childNodes.length - 1))
            return true;
        else
            return false;
    };

    /**
     * Função que seleciona Linha
     * @param {DON} element
     * @returns {void}
     */
    var selectRow = function(element) {
        if (linhaAnterior) {
            var elemet = selector('tr.mw-content-tr[linha-id="' + linhaAnterior + '"]');
            elemet.className = elemet.className.replace(" select", "");
            removeContext();
        }

        linhaSelectAtual = element.getAttribute("linha-id");
        element.className += " select";

        linhaAnterior = linhaSelectAtual;
    };

    /**
     * Função que salta para ultima linha do grid
     * @param {DON} elemet
     * @returns {void}
     */
    var selectBeforeRow = function(elemet) {
        var quant = elemet.childNodes[0].childNodes.length;
        var table = elemet.childNodes[0];
        elemet.scrollTop = table.offsetHeight;
        selectRow(table.childNodes[quant - 1]);
    };

    /**
     * Função que salta para primeira linha do grid
     * @param {type} elemet
     * @returns {void}
     */
    var selectFirstRow = function(elemet) {
        var table = elemet.childNodes[0];
        elemet.scrollTop = 0;
        selectRow(table.childNodes[0]);
    };

    /**
     * Função que sobe uma linha do grid
     * @param {DON} elemet
     * @returns {void}
     */
    var selectRowUp = function(elemet) {
        var table = elemet.childNodes[0];

        if (validacaoAcontecimento(parseInt(linhaSelectAtual) - 1, table))
            return;

        //Regra da paginação do scroll


        selectRow(table.childNodes[parseInt(linhaSelectAtual) - 1]);
    };

    /**
     * Função que desce uma linha do grid
     * @param {DON} elemet
     * @returns {void}
     */
    var selectRowDown = function(elemet) {
        var table = elemet.childNodes[0];

        if (validacaoAcontecimento(parseInt(linhaSelectAtual) + 1, table)) {
            if (!callbackOnKeyPress)
                selectRow(objetoCallback.addRow(elemet));
            return;
        }

        //Regra da paginação do scroll

        selectRow(table.childNodes[parseInt(linhaSelectAtual) + 1]);
    };

    /**
     * Função que manipula comandos do grid
     * @param {Object} e
     * @returns {void}
     */
    this.movimentLine = function(e) {
        if (callbackOnKeyPress) {
            callbackOnKeyPress(e.keyCode, e.ctrlKey, e.shiftKey, e.altKey);
            if (e.keyCode === 38) {
                selectRowUp(this);
            } else if (e.keyCode === 40) {
                selectRowDown(this);
            }
        } else {
            if (e.ctrlKey && e.keyCode === 38) {
                selectFirstRow(this);
            } else if (e.ctrlKey && e.keyCode === 40) {
                selectBeforeRow(this);
            } else if (e.keyCode === 38) {
                selectRowUp(this);
            } else if (e.keyCode === 40) {
                selectRowDown(this);
            }
        }
    };

    /**
     * Monitor de eventos do Teclado
     * @param {Function} callback
     * @returns {void}
     */
    this.setCallbackOnKeyPress = function(callback) {
        callbackOnKeyPress = callback;
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
;