function GridMark() {

    //Globais
    var self = this;
    var object;
    var linhaAnterior;
    var linhaSelectAtual;

    // Variavel de controle de paginação
    var paginaAtual = 0;
    var quantidadePaginas = 0;
    var linhasPorPagina = 0;
    var tamanhoPagina = 0;

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

    /**
     * Função que retorna linha anterior marcada
     * @returns {GridMark@call;getAttribute|GridMark.linhaSelectAtual|GridMark.linhaAnterior|Date|String}
     */
    this.getLinhaAnterior = function() {
        return linhaAnterior;
    };

    /**
     * Função que seta valor na linha anterior
     * @param {Interger} val
     * @returns {void}
     */
    this.setLinhaAnterior = function(val) {
        linhaAnterior = val;
        return;
    };

    /**
     * Função que retorna linha selecionada e linha selecionada anterior
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

    /**
     * Função que remove o contextMenu se ele existir
     * @returns {void}
     */
    this.removeContext = function() {
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
            
            if(elemet) {
                elemet.className = elemet.className.replace(" select", "");
            }
            
            self.removeContext();
        }
        linhaSelectAtual = this.getAttribute("linha-id");
        this.className += " select";

        linhaAnterior = linhaSelectAtual;
        getPaginacao("click");
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
            self.removeContext();
        }

        linhaSelectAtual = element.getAttribute("linha-id");
        element.className += " select";

        linhaAnterior = linhaSelectAtual;
        getPaginacao("click");
    };

    /**
     * Função que padroniza callbacks de marcação
     * @param {DON} element
     * @param {Functions} callbacks
     * @returns {void}
     */
    this.parametrosPaginacao = function(element, callbacks) {
        objetoCallback = callbacks;
        self.configPaginacao();
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
            
            if(elemet) {
                elemet.className = elemet.className.replace(" select", "");
            }
            
            self.removeContext();
        }

        linhaSelectAtual = element.getAttribute("linha-id");
        element.className += " select";

        linhaAnterior = linhaSelectAtual;
        getPaginacao("keypress");
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
                e.preventDefault();
                selectFirstRow(this);
            } else if (e.ctrlKey && e.keyCode === 40) {
                e.preventDefault();
                selectBeforeRow(this);
            } else if (e.keyCode === 38) {
                e.preventDefault();
                selectRowUp(this);
            } else if (e.keyCode === 40) {
                e.preventDefault();
                selectRowDown(this);
            }
        }
    };
    
    /**
     * Função que informa os parametros de configuração do grid
     * @returns {void}
     */
    this.configPaginacao = function() {
        var contentHeight = selector(".mw-content").offsetHeight;
        var tableHeight = selector(".mw-content table").offsetHeight;

        // Verificação da quantidade de páginas
        quantidadePaginas = Math.floor(tableHeight / contentHeight);
        if ((tableHeight / contentHeight) > quantidadePaginas)
            quantidadePaginas += 1;

        // Verificação da quantidade de itens por página
        var quantidadeRow = selector(".mw-content table").childNodes.length;
        linhasPorPagina = Math.floor(quantidadeRow / quantidadePaginas);
        tamanhoPagina = linhasPorPagina * 42;
    };
    
    /**
     * Paginação do grid
     * @param {type} val
     * @returns {void}
     */
    var getPaginacao = function(val) {
        paginaAtual = Math.floor(linhaSelectAtual / linhasPorPagina);

        if (val === "keypress")
            selector(".mw-content").scrollTop = paginaAtual * tamanhoPagina;
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