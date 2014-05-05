function GridEvent() {

    //
    //
    //  Globais
    //
    //

    var $, create, element, object, constante;
    var colunas, eventos, tipo, largura;
    var objetoOrdenar = {id: "", ordenacao: ""};

    // Cache dos Objetos
    var asc = null;
    var desc = null;

    // Callbacks
    var errorCallback = "";
    var editaCallback = "";
    var checkCallback = "";

    //
    //
    //  Getters e Setters
    //
    //

    //  ===================================
    //  Error Evento
    //  ===================================
    var setErrorCallback = function(callback) {
        errorCallback = callback;
        return;
    };

    var getErrorCallback = function() {
        return errorCallback;
    };

    //  ===================================
    //  Editar Evento
    //  ===================================
    var setEditaCallback = function(callback) {
        editaCallback = callback;
        return;
    };

    var getEditaCallback = function() {
        return editaCallback;
    };

    //  ===================================
    //  Check Evento
    //  ===================================
    var setCheckCallback = function(callback) {
        checkCallback = callback;
        return;
    };

    var getCheckCallback = function(callback) {
        return checkCallback;
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
        eventos = retorno.getColunasEventos();
        colunas = retorno.getColunas();
        tipo = retorno.getColunasTipo();
        largura = retorno.getLarguraColunas();
    };


    /**
     * MonitorDeEventos
     * 
     * @description :: Monitora eventos do grid
     * 
     * @param {String} event
     * @param {Function} callback
     * @returns {void}
     */
    var monitorDeEventos = function(event, callback) {
        switch (event) {
            case "onError":
                setErrorCallback(callback);
                break;
            case "onAdicionar":
                object.gridCreate.setAdicionaCallback(callback);
                break;
            case "onEditar":
                setEditaCallback(callback);
                break;
            case "onDelete":
                object.gridCreate.setDeletaCallback(callback);
                break;
            case "onCheck":
                setCheckCallback(callback);
                break;
//            case "onKeyPress":
//                gridMark.setCallbackOnKeyPress(callback);
//                break;
//            case "onDeleteRow":
//                setCallbackOnDeleteRow(callback);
//                break;
//            case "onObject":
//                setMonitoringAlterObject(callback);
//                break;
//            case "onDbClickRow":
//                setDbClickRow(callback);
//                break;
        }
    };

    //
    //
    //  Manipulação de DON
    //
    //

    /**
     * TextField
     * 
     * @description ::  Função que cria o textfield para edição da linha
     * 
     * @returns {GridEvent.textfield}
     */
    var textfield = function() {
        var valor = this.innerHTML;
        var linhaID = this.parentNode.parentNode.getAttribute('linha-id');
        var dataID = this.parentNode.parentNode.getAttribute('data-id');
        var colunaID = this.parentNode.getAttribute('colum-id');

        // Criação Textfield
        var input = create("input");
        input.type = "text";
        input.style.width = (largura[colunaID] - 7) + "px";
        input.className = "mw-content-text";
        input.value = valor;
        input.setAttribute('valor', valor);
        input.setAttribute('linha-id', linhaID);
        input.setAttribute('data-id', dataID);
        input.setAttribute('coluna-id', colunaID);
        input.onblur = terminoEdicao;
        input.onkeyup = terminoEdicao;

        this.innerHTML = "";
        this.appendChild(input);
        this.ondblclick = null;

        input.focus();
    };

    /**
     * Check
     * 
     * @description :: Função que pega evento do check
     * 
     * @returns {GridEvent.check}     
     */
    var check = function() {
        var colunaId = this.parentNode.getAttribute('colum-id');
        var linhaId = this.parentNode.parentNode.getAttribute('linha-id');
        var dataId = this.parentNode.parentNode.getAttribute('data-id');
        var status = this.getAttribute('value');

        if (parseInt(status)) {
            this.className = this.className.replace("enabled", "disabled");
            status = 0;
        } else {
            this.className = this.className.replace("disabled", "enabled");
            status = 1;
        }
        this.setAttribute('value', status);

        var objeto = object.getObject();
        for (var i = 0; i < objeto.rows.length; i++) {
            if (objeto.rows[i].id === dataId) {
                objeto.rows[i].data[colunaId] = status;
                break;
            }
        }
        object.gridObject.atualizaObject(objeto);
        if (checkCallback) {
            checkCallback(status, dataId, linhaId, colunaId);
        }
    };
    
    /**
     * Ordenar
     * 
     * @description ::  Função que ordena as colunas do grid
     * 
     * @returns {void}
     */
    var ordenar = function() {
        var id = this.getAttribute('data-id');
        var type = tipo[id];
        var idAntigo = objetoOrdenar.id;
        var antigaOrdenacao = objetoOrdenar.ordenacao;

        if (eventos[parseInt(id)] !== "select") {
            if (idAntigo === id && antigaOrdenacao === "ASC") {
                objetoOrdenar.ordenacao = "DESC";
            } else if (idAntigo === id && antigaOrdenacao === "DESC") {
                objetoOrdenar.ordenacao = "ASC";
            } else {
                objetoOrdenar.ordenacao = "ASC";
                objetoOrdenar.id = id;
            }

            if ($("#ordenacao[data-id='" + id + "']")) {
                var elemento = $("#ordenacao");
                elemento.className = objetoOrdenar.ordenacao;
            } else {
                if (idAntigo !== id && idAntigo) {
                    var elementAntigo = $("#ordenacao[data-id='" + idAntigo + "']");
                    var paiElmentoAntigo = elementAntigo.parentNode;
                    paiElmentoAntigo.removeChild(elementAntigo);
                }

                var order = create('div');
                order.className = objetoOrdenar.ordenacao;
                order.id = "ordenacao";
                order.setAttribute('data-id', id);

                this.childNodes[0].appendChild(order);
            }

            var objectJson = organizarJson(object.getObject(), type, id);

            if ((!asc && objetoOrdenar.ordenacao === "ASC") || (id !== idAntigo && objetoOrdenar.ordenacao === "ASC")) {
                asc = objectJson;
                object.gridCreate.refresh(asc);
            } else if (asc && objetoOrdenar.ordenacao === "ASC") {
                object.gridCreate.refresh(asc);
            } else if ((!desc && objetoOrdenar.ordenacao === "DESC") || (id !== idAntigo && objetoOrdenar.ordenacao === "DESC")) {
                desc = objectJson;
                object.gridCreate.refresh(desc);
            } else if (desc && objetoOrdenar.ordenacao === "DESC") {
                object.gridCreate.refresh(desc);
            }
        }
    };

    /**
     * OrganizarJson
     * 
     * @description ::  Função que organiza o objeto original
     * 
     * @param {Object} json
     * @param {String} type
     * @param {String} id
     * @returns {Object} objeto organizado
     */
    var organizarJson = function(json, type, id) {
        json.rows.sort(function(a, b) {
            if (type === "str")
                return orderString(a.data[id], b.data[id]);
            else if (type === "flt")
                return orderFlt(a.data[id], b.data[id]);
            else if (type === "int")
                return orderInt(a.data[id], b.data[id]);
        });
        return json;
    };

    /**
     * OrderString
     * 
     * @description ::  Função que organiza o String
     * 
     * @param {String} a
     * @param {String} b
     * @returns {Number}
     */
    var orderString = function(a, b) {
        var strA = a.toLowerCase(), strB = b.toLowerCase();
        if (objetoOrdenar.ordenacao === "ASC") {
            if (strA < strB)
                return -1;
            if (strA > strB)
                return 1;
        } else {
            if (strA < strB)
                return 1;
            if (strA > strB)
                return -1;
        }
        return 0;
    };

    /**
     * OrderFlt
     *  
     * @description ::  Função que organiza floats
     * 
     * @param {Float} a
     * @param {Float} b
     * @returns {Float}
     */
    var orderFlt = function(a, b) {
        if (objetoOrdenar.ordenacao === "ASC")
            return parseFloat(a) - parseFloat(b);
        else
            return parseFloat(b) - parseFloat(a);
    };

    /**
     * OrderInt
     *  
     * @description ::  Função que organiza interger
     * 
     * @param {Interger} a
     * @param {Interger} b
     * @returns {Interger}
     */
    var orderInt = function(a, b) {
        if (objetoOrdenar.ordenacao === "ASC")
            return parseInt(a) - parseInt(b);
        else
            return parseInt(b) - parseInt(a);
    };

    //
    //
    //  Eventos
    //
    //

    /**
     * TerminoEdicao
     * 
     * @description :: Evento ao sair da edição da linha
     * 
     * @param {Events} e
     * @returns {GridEvent.terminoEdicao}
     */
    var terminoEdicao = function(e) {
        var valor = "";
        var entrou = false;
        var antigoValor = this.getAttribute("valor");
        var novoValor = this.value;
        var linhaID = this.getAttribute("linha-id");
        var dataID = this.getAttribute("data-id");
        var colunaID = this.getAttribute("coluna-id");

        e.preventDefault();

        if (e.keyCode) {
            // Evento do Enter
            if (e.keyCode === 13) {
                this.onblur = null;
                valor = novoValor;
                this.parentNode.ondblclick = textfield;
                this.parentNode.innerHTML = valor;
                entrou = true;

            }
            // Evento Esc
            else if (e.keyCode === 27) {
                this.onblur = null;
                valor = antigoValor;
                this.parentNode.ondblclick = textfield;
                this.parentNode.innerHTML = valor;
                entrou = true;
            }
        } else {
            valor = novoValor;
            this.parentNode.ondblclick = textfield;
            this.parentNode.innerHTML = valor;
            entrou = true;
        }

        //  ====================================================================
        //  Callbacks
        //  ====================================================================
        if (entrou && valor !== antigoValor) {
            editaCallback(antigoValor, valor, dataID, linhaID, colunaID);
        }
    };

    var retorno = {
        init: init,
        monitorDeEventos: monitorDeEventos,
        getErrorCallback: getErrorCallback,
        // Eventos
        ordenar: ordenar,
        textfield: textfield,
        check: check
    };
    return retorno;

}