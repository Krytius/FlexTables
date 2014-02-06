function GridElement() {
    //Globais
    var self = this;
    var object;
    var linhaAddSemCustomizacao = 1000000000;
    var callbackEdit;

    // Monitor de Eventos
    var callbackOnEdit;
    var callbackOnCheck;

    // Masks
    var colunasType = [];
    var colunasMask = [];
    var colunasEvents = [];

    // Temporarios
    var paramSelect = [];


    // Parametros
    var columTamanho = 0;

    /**
     * Função que inicia o objeto da funcao
     * @param {Object} obj
     * @param {Array} masks
     * @param {Array} types
     * @param {Array} events
     * @returns {void}
     */
    this.init = function(obj, masks, types, events) {
        object = obj;
        colunasMask = masks;
        colunasType = types;
        colunasEvents = events;
        return;
    };

    /**
     * Função que seleciona o tipo de coluna a ser criado o element
     * @param {String} events
     * @param {String} val
     * @param {Interger} tamanho
     * @param {Interger} indice
     * @returns {DON|GridElement.createDiv.divTd|Element|GridElement.createElmentCheck.check}
     */
    this.createColumType = function(events, val, tamanho, indice) {
        var element;
        columTamanho = tamanho - 10;
        switch (events) {
            case "edit":
            case "number":
                element = createDiv(val);
                break;
            case "check":
                element = createElmentCheck(val);
                break;
            case "select":
                element = createSelected(val, indice);
                break;
            default:
                element = createDiv(val);
                break;
        }
        return element;
    };

    /**
     * Função cria elemento para os tipos (edit|number)
     * @param {String} val
     * @returns {DON|GridElement.createDiv.divTd|Element}
     */
    var createDiv = function(val) {
        var divTd = create('div');
        divTd.className = "mw-content-td-div";
        divTd.style.width = columTamanho + "px";
        divTd.innerHTML = val;
        divTd.setAttribute('title', val);
        return divTd;
    };

    var createSelected = function(val, indice) {
        var divTd = create('div');
        divTd.className = "mw-content-td-div";
        divTd.style.width = columTamanho + "px";
        divTd.innerHTML = val.itens[val.selected];
        divTd.setAttribute('title', val.itens[val.selected]);
        return divTd;
    };

    /**
     * Função cria elemento para os tipos (check)
     * @param {String} val
     * @returns {DON|GridElement.createElmentCheck.check|Element}
     */
    var createElmentCheck = function(val) {
        var check = create('div');
        check.className = "mw-content-td-check";
        check.className += (parseInt(val)) ? ' enabled' : ' disabled';
        return check;
    };

    /**
     * Eventos do grid
     * @param {DON} element
     * @param {String} evt
     * @param {String} type
     * @param {Function} callback
     * @returns {void}
     */
    this.elementEvent = function(element, evt, type, callback) {
        switch (evt) {
            case "edit":
            case "number":
                element.ondblclick = function() {
                    callbackEdit = callback;
                    onEditEvent(element, "text", type);
                };
                break;
            case "select":
                element.ondblclick = function() {
                    callbackEdit = callback;
                    onSelectEvent(element);
                };
                break;
            case "check":
                element.onclick = function() {
                    callbackEdit = callback;
                    onChackUncheck(element);
                };
                break;
            default:
                break;
        }
    };

    /**
     * Função que aplica eventos de edição
     * @param {DON} elemen
     * @param {String} type
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
        input.onblur = function() {
            var valor = this.value;
            editEvent(elemen, valor, text, columId, linhaId, dataId);
        };
        input.onkeyup = function(e) {
            var valor = this.value;
            if (e.keyCode === 13) {
                this.onblur = null;
                editEvent(elemen, valor, text, columId, linhaId, dataId);
            } else if (e.keyCode === 27) {
                this.onblur = null;
                editEvent(elemen, text, text, columId, linhaId, dataId);
            } else if (e.keyCode !== 46 || e.keyCode !== 8) {
                if (colunasMask.length > 0) {
                    verificaMask(this);
                }
            }
        };

        elemen.innerHTML = "";
        elemen.appendChild(input);
        input.focus();
        elemen.ondblclick = null;
    };

    /**
     * Função que tem callbacks do edit
     * @param {DON} elemen
     * @param {string} valor
     * @param {string} text
     * @param {interger} columId
     * @param {interger} linhaId
     * @param {interger} dataId
     * @returns {void}
     */
    var editEvent = function(elemen, valor, text, columId, linhaId, dataId) {
        elemen.innerHTML = valor;
        elemen.setAttribute('title', valor);
        elemen.ondblclick = function() {
            onEditEvent(elemen);
        };
        callbackEdit(objectReturn(text, valor, columId, linhaId, dataId));
        if (callbackOnEdit)
            callbackOnEdit(text, valor, columId, linhaId, dataId);
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
            if (colunasEvents[i] !== "select")
                obj.data.push(linha.childNodes[i].childNodes[0].innerHTML);
            else
                obj.data.push(object.rows[0].data[i]);
        }

        object.rows.push(obj);
        linhaAddSemCustomizacao++;
        onEditEvent(elemen, type);
    };

    /**
     * Função que faz alteração do procedimento de check
     * @param {DON} element
     * @returns {void}
     */
    var onChackUncheck = function(element) {
        var className = element.className.split(" ")[1];
        var text, valor;
        var dataId = element.parentNode.parentNode.getAttribute('data-id');
        var rowId = element.parentNode.parentNode.getAttribute('linha-id');
        var colum = element.parentNode.getAttribute('colum-id');

        if (className === "enabled") {
            element.className = element.className.replace("enabled", "disabled");
            text = 1;
            valor = 0;
        } else {
            element.className = element.className.replace("disabled", "enabled");
            text = 0;
            valor = 1;
        }
        callbackEdit(objectReturn(text, valor, colum, rowId, dataId));
        if (callbackOnCheck)
            callbackOnCheck((valor) ? true : false, parseInt(colum), parseInt(rowId), parseInt(dataId));
    };

    /**
     * Função que faz alteração no procedimento de select
     * @param {DON} element
     * @returns {void}
     */
    var onSelectEvent = function(element) {
        var coluna = element.parentNode;
        var linhaId = parseInt(element.parentNode.parentNode.getAttribute('linha-id'));
        var dataId = parseInt(element.parentNode.parentNode.getAttribute('data-id'));
        var columId = parseInt(element.parentNode.getAttribute('colum-id'));
        
        if (dataId === -1) {
            insertObject(element);
            return;
        }
        
        var obj = object.rows[linhaId].data[columId];
        var text = obj.itens[obj.selected];

        var label = create('label');
        var select = create('select');
        select.className = 'mw-content-td-select';

        for (var i = 0; i < obj.itens.length; i++) {
            var option = create('option');
            option.innerHTML = obj.itens[i];
            option.value = i;

            if (i === obj.selected)
                option.selected = true;
            else
                option.selected = false;

            select.appendChild(option);
        }

        select.onblur = function() {
            var objectFinal = {
                linhaId: linhaId,
                dataId: dataId,
                colum: columId,
                text: text,
                valor: this.value
            };
            this.onchange = null;
            eventSelect(coluna, objectFinal);
        };

        select.onchange = function() {
            var objectFinal = {
                linhaId: linhaId,
                dataId: dataId,
                colum: columId,
                text: text,
                valor: this.value
            };
            this.onblur = null;
            eventSelect(coluna, objectFinal);
        };

        coluna.innerHTML = "";
        label.appendChild(select);
        coluna.appendChild(label);
        select.focus();
        coluna.ondblclick = null;
    };

    /**
     * Função que aplica as regras para o evento de selecionar ou sair do campo
     * @param {DON} don
     * @param {Object} obj
     * @returns {void}
     */
    var eventSelect = function(don, obj) {
        var reformularLinha = {};
        
        if (object.rows[obj.linhaId]) {
            reformularLinha = {
                selected: parseInt(obj.valor),
                itens: object.rows[obj.linhaId].data[obj.colum].itens
            };
        } else {
            reformularLinha = {
                selected: parseInt(obj.valor),
                itens: paramSelect[obj.colum].itens
            };
            insertObject(don);
        }

        don.innerHTML = "";
        var elemen = createSelected(reformularLinha);
        elemen.ondblclick = function() {
            onSelectEvent(elemen);
        };
        don.appendChild(elemen);

        callbackEdit(objectReturn(obj.text, reformularLinha, obj.colum, parseInt(obj.linhaId), obj.dataId));
        if (callbackOnEdit)
            callbackOnEdit(obj.text, object.rows[obj.linhaId].data[obj.colum].itens[obj.valor], obj.colum, obj.linhaId, obj.dataId);
    };
    
    /**
     * Insere linha no objeto principal
     * @param {DON} don
     * @returns {void}
     */
    var insertObject = function(don) {
        var linha = don.parentNode.parentNode;
        var colunasDaLinha = linha.childNodes.length;
        
        linha.setAttribute('data-id', linhaAddSemCustomizacao);
        var obj = {
            id: linhaAddSemCustomizacao,
            data: []
        };

        for (var i = 0; i < colunasDaLinha; i++) {
            if (colunasEvents[i] !== "select")
                obj.data.push(linha.childNodes[i].childNodes[0].innerHTML);
            else
                obj.data.push(object.rows[0].data[i]);
        }

        object.rows.push(obj);
        linhaAddSemCustomizacao++;
        onSelectEvent(don);
    };

    /**
     * Verifica se o usuário vai utilizar mascara padrão do tipo do campo ou personalizada
     * @param {DON} element
     * @returns {void}
     */
    var verificaMask = function(element) {
        var coluna = element.parentNode.parentNode.getAttribute('colum-id');

        if (colunasMask[coluna] === "not")
            addMaskPadrao(colunasType[coluna], element);
        else
            addMaskPersonalizada(colunasMask[coluna], element);
    };

    /**
     * Função e faz o todo o processo para mascaras personalizadas
     * @param {String} mask
     * @param {DON} element
     * @returns {void}
     */
    var addMaskPersonalizada = function(mask, element) {
        MaskInput(mask, element);
    };

    /**
     * Função que adiciona máscara padrão pelo tipo do elemento
     * @param {String} type
     * @param {DON} element
     * @returns {void}
     */
    var addMaskPadrao = function(type, element) {
        switch (type) {
            case "int":
                MaskPadrao("9", element);
                break;
            case "flt":
                MaskPadrao("9.9", element);
                break;
            default:
                MaskPadrao("a", element);
                break;
        }
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
     * Monitor de eventos do Check
     * @param {Function} callback
     * @returns {void}
     */
    this.setCallbackOnCheck = function(callback) {
        callbackOnCheck = callback;
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
        if (parseInt(object.rows[linhaId].id) === parseInt(dataId)) {
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