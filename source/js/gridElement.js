function GridElement() {


    //Globais
    var self = this;
    var object;
    var linhaAddSemCustomizacao = 1000000000;
    var callbackEdit;
    var callbackOnEdit;

    /**
     * Função que inicia o objeto da funcao
     * @param {Object} obj
     * @returns {void}
     */
    this.init = function(obj) {
        object = obj;
    };

    /**
     * Eventos do grid
     * @param {DON} element
     * @param {String} evt
     * @param {Function} callback
     * @returns {void}
     */
    this.elementEvent = function(element, evt, callback) {
        switch (evt) {
            case "edit":
                element.ondblclick = function() {
                    callbackEdit = callback;
                    onEditEvent(element, "text");
                };
                break;
            case "number":
                element.ondblclick = function() {
                    callbackEdit = callback;
                    onEditEvent(element, "number");
                };
                break;
        }
    };

    /**
     * Evento de editar uma coluna do grid
     * @param {DON} elemen
     * @returns {void}
     */
    var onEditEvent = function(elemen, type) {
        var text = elemen.innerHTML;
        var linhaId = parseInt(elemen.parentNode.parentNode.getAttribute('linha-id'));
        var dataId = parseInt(elemen.parentNode.parentNode.getAttribute('data-id'));
        var columId = parseInt(elemen.parentNode.getAttribute('colum-id'));

        if (dataId === -1) {
            onInsertEvent(elemen, type);
            return;
        }

        var input = document.createElement("input");
        input.type = type;
        input.className = "mw-content-text";
        input.value = text;
        input.onblur = function(e) {
            var valor = this.value;
            elemen.innerHTML = this.value;
            elemen.ondblclick = function() {
                onEditEvent(elemen);
            };
            callbackEdit(objectReturn(text, valor, columId, linhaId, dataId));
            if (callbackOnEdit)
                callbackOnEdit(text, valor, columId, linhaId, dataId);
        };
        input.onkeydown = function(e) {
            var valor = this.value;
            if (e.keyCode === 13) {
                this.onblur = null;
                elemen.innerHTML = valor;
                elemen.ondblclick = function() {
                    onEditEvent(elemen);
                };
                callbackEdit(objectReturn(text, valor, columId, linhaId, dataId));
                if (callbackOnEdit)
                    callbackOnEdit(text, valor, columId, linhaId, dataId);
            } else if (e.keyCode === 27) {
                this.onblur = null;
                elemen.innerHTML = text;
                elemen.ondblclick = function() {
                    onEditEvent(elemen);
                };
                callbackEdit(objectReturn(text, text, columId, linhaId, dataId));
                if (callbackOnEdit)
                    callbackOnEdit(text, text, columId, linhaId, dataId);
            }
        };

        elemen.innerHTML = "";
        elemen.appendChild(input);
        input.focus();
        elemen.ondblclick = null;
    };

    /**
     * Função que adiciona ao objeto padrão a linha inserida
     * @param {type} elemen
     * @param {type} type
     * @returns {void}
     */
    var onInsertEvent = function(elemen, type) {
        var linha = elemen.parentNode.parentNode;
        var colunasDaLinha = linha.childNodes.length;

        linha.setAttribute('data-id', linhaAddSemCustomizacao);
        var obj = {
            id: linhaAddSemCustomizacao,
            data: []
        };

        for (var i = 0; i < colunasDaLinha; i++) {
            obj.data.push(linha.childNodes[i].childNodes[0].innerHTML);
        }

        object.rows.push(obj);
        linhaAddSemCustomizacao++;
        onEditEvent(elemen, type);
    };

    /**
     * Monitor de eventos do Edit
     * @param {Function} callback
     * @returns {void}
     */
    this.setCallbackOnEdit = function(callback) {
        callbackOnEdit = callback;
        return;
    };

    /**
     * Novo objeto de editado retornado
     * @param {String} text
     * @param {String} valor
     * @param {Interger} columId
     * @param {Interger} linhaId
     * @param {Interger} dataId
     * @returns {obj|GridElement.object}
     */
    var objectReturn = function(text, valor, columId, linhaId, dataId) {
        if (text === valor) {
            return object;
        }
        if (parseInt(object.rows[linhaId].id) === dataId) {
            object.rows[linhaId].data[columId] = valor;
        }
        return object;
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