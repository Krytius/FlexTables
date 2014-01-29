function GridEvent() {

    // Globais
    var object;
    var objetoOrdenar = {id: "", ordenacao: ""};

    /**
     * Function que inicia o objeto do grid
     * @param {Object} obj
     * @returns {void}
     */
    this.init = function(obj) {
        object = obj;
    };

    /**
     * Função que ordena as colunas do grid
     * @param {Object} elem
     * @param {Object} json
     * @param {Function} callback
     * @returns {void}
     */
    this.ordenar = function(elem, json, callback) {
        var id = elem.getAttribute('data-id');
        var type = elem.getAttribute('type-coluna');
        var idAntigo = objetoOrdenar.id;
        var antigaOrdenacao = objetoOrdenar.ordenacao;

        if (idAntigo === id && antigaOrdenacao === "ASC") {
            objetoOrdenar.ordenacao = "DESC";
        } else if (idAntigo === id && antigaOrdenacao === "DESC") {
            objetoOrdenar.ordenacao = "ASC";
        } else {
            objetoOrdenar.ordenacao = "ASC";
            objetoOrdenar.id = id;
        }

        if (selector("#ordenacao[data-id='" + id + "']")) {
            var element = document.getElementById("ordenacao");
            element.className = objetoOrdenar.ordenacao;
        } else {

            if (idAntigo !== id && idAntigo) {
                var elementAntigo = selector("#ordenacao[data-id='" + idAntigo + "']");
                var paiElmentoAntigo = elementAntigo.parentNode;
                paiElmentoAntigo.removeChild(elementAntigo);
            }

            var order = document.createElement('div');
            order.className = objetoOrdenar.ordenacao;
            order.id = "ordenacao";
            order.setAttribute('data-id', id);

            elem.appendChild(order);
        }

        var objectJson = organizarJson(json, type, id);
        callback(objectJson);
    };

    /**
     * Função que organiza o objeto original
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
     * Função que organiza o String
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
     * Função que organiza floats
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
     * Função que organiza interger
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