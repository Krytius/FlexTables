function GridFilter() {

    //Globais
    var self = this;
    var element;
    var object = {};
    var colunas = [];
    var colunasType = [];
    var filtros = [];
    var filtrado = [];
    var objetoNovo = {
        rows: []
    };

    // Callbacks do filtro
    var callbackFiltro;

    // Colunas do filtro selecionado
    var columSelecionado = {};

    /**
     * Função que informa o objeto principal e os principais parâmetros para montagem do filtro
     * @param {DON} don
     * @param {Object} json
     * @param {Array} col
     * @param {Array} type
     * @param {Function} callback
     * @returns {void}
     */
    this.init = function(don, json, col, type, callback) {
        element = don;
        object = json;
        colunas = col;
        colunasType = type;
        callbackFiltro = callback;
        return;
    };

    /**
     * Função que setá os filtros
     * @param {Array} filter
     * @returns {void}
     */
    this.setColumsFilter = function(filter) {
        filtros = filter;
        return;
    };

    /**
     * Função que retorna filtros
     * @returns {GridFilter.filter|GridFilter.filtros|Array}
     */
    this.getColumsFilter = function() {
        return filtros;
    };

    /**
     * Função que retorna o elemento do DON com todos eventos de filtro disponíveis
     * @returns {void}
     */
    this.constructFilter = function() {

        var div = create('div');
        div.className = "mw-filter";
        div.style.width = element.offsetWidth + "px";
        div.style.height = "25px";

        var espaco = calculoEspacamento();
        var elementButtons = constructButtons(espaco);
        var elementSearch = constructSearch();
        
        div.appendChild(elementButtons);
        div.appendChild(elementSearch);
        element.appendChild(div);
    };

    /**
     * Calculo dos espaçamento do tamanho do botão e do campo de busca
     * @returns {Number|element.offsetWidth|don.offsetWidth}
     */
    var calculoEspacamento = function() {
        return element.offsetWidth - 225;
    };

    /**
     * Função que monta a parte dos botões do filtro
     * @param {interger} espaco
     * @returns {DON|GridFilter.constructButtons.div|Element}
     */
    var constructButtons = function(espaco) {
        var quantButtons = filtros.length;
        var tamanhoButtons = espaco / quantButtons;

        // Negando botão muito grande
        if (tamanhoButtons > 150)
            tamanhoButtons = 150;

        var div = create('div');
        div.className = 'mw-selects';
        div.style.width = espaco + "px";

        for (var i = 0; i < quantButtons; i++) {
            var button = create('div');
            button.className = "mw-buttons";
            button.setAttribute('filtro-id', i);
            button.setAttribute('colum-id', filtros[i][1]);
            button.setAttribute('title', colunas[filtros[i][1]]);
            button.style.width = tamanhoButtons + "px";
            button.onclick = selectFilter;

            var icon = create('i');
            icon.className = 'mw-icon';
            icon.style.backgroundImage = 'url(' + filtros[i][0].icon + ')';

            var text = create('span');
            text.className = 'mw-text';
            text.style.width = (tamanhoButtons - 40) + 'px';
            text.innerHTML = colunas[filtros[i][1]];

            button.appendChild(icon);
            button.appendChild(text);
            div.appendChild(button);
        }

        return div;
    };

    /**
     * Função que faz a construção do input de busca do grid e seus eventos
     * @returns {DON|GridFilter.constructSearch.div|Element}
     */
    var constructSearch = function() {
        var div = create('div');
        div.className = 'mw-search';
        div.style.width = "225px";
        div.onclick = verificaFiltro;

        var input = create('input');
        input.className = 'mw-filter-input';
        input.type = "text";
        input.onkeyup = filter;

        var divBusca = create('div');
        divBusca.className = 'mw-filter-div';

        div.appendChild(input);
        div.appendChild(divBusca);
        return div;
    };

    /**
     * Função que cria o botão de emit do Grid
     * @returns {GridFilter.contructButtonEmitSearch.div|DON|Element}
     */
    var contructButtonEmitSearch = function() {
        var div = create('div');
        div.className = 'mw-emit';
        div.style.width = '25px';

        return div;
    };

    /**
     * Seleciona a coluna do filtro
     * @returns {void}
     */
    var selectFilter = function() {
        var colum = this.getAttribute('colum-id');
        var filtro = this.getAttribute('filtro-id');
        this.className += ' selected';
        if (columSelecionado.columId) {
            var elemento = this.parentNode.childNodes[columSelecionado.filtroId];
            elemento.className = elemento.className.replace(' selected', '');
        }

        selector('.mw-filter-input').focus();

        columSelecionado.columId = colum;
        columSelecionado.filtroId = filtro;
    };

    /**
     * Função que verifica no grid os valor digitado no campo e compara com todo o objeto inicial
     * @returns {void}
     */
    var verificaFiltro = function() {
        if (!columSelecionado.columId) {
            self.forceFilterActive(0);
        }

        selector('.mw-filter-input').focus();
    };

    /**
     * Força um filtro já vir selecionado caso o usuário clique no filtro em ter selecionado um tipo de filtro
     * @param {interger} coluna
     * @returns {void}
     */
    this.forceFilterActive = function(coluna) {
        if (columSelecionado.columId) {
            var elemento = selector('.mw-filter .mw-selects').childNodes[columSelecionado.filtroId];
            elemento.className = elemento.className.replace(' selected', '');
        }

        var element = selector('.mw-selects').childNodes[coluna];
        element.className += ' selected';

        var colum = element.getAttribute('colum-id');
        var filtro = element.getAttribute('filtro-id');

        columSelecionado.columId = colum;
        columSelecionado.filtroId = filtro;
    };

    /**
     * Procidimento que faz depuração no objeto para efetuar o filtro
     * @param {Event} e
     * @returns {void}
     */
    var filter = function(e) {
        if (e.keyCode === 13) {
            return;
        }

        var quant = object.rows.length;

        var filt = [];
        for (var i = 0; i < quant; i++) {
            filt.push(object.rows[i].data[columSelecionado.columId].toLowerCase());
        }

        filtrado = [];
        filt.filter(efectFilter);

        if (filtrado.length > 0) {
            var quantidade = filtrado.length;
            objetoNovo.rows = [];

            for (var i = 0; i < quantidade; i++) {
                objetoNovo.rows.push(object.rows[filtrado[i]]);
            }

            callbackFiltro(objetoNovo);
        } else {
            callbackFiltro(object);
        }
    };

    /**
     * Função que efetua a pesquisa no objeto principal do grid
     * @param {Array} element
     * @param {Array} index
     * @param {Array} array
     * @returns {void}
     */
    var efectFilter = function(element, index, array) {
        var valor, criteria, criteria2;

        switch (colunasType[columSelecionado.columId]) {
            case 'str':
                valor = selector('.mw-filter-input').value.toLowerCase();
                criteria = (element.search(valor) !== -1);
                break;
            case 'int':
                valor = parseInt(selector('.mw-filter-input').value);
                criteria = (parseInt(element) === valor);
                criteria2 = (!valor);
                break;
            case 'flt':
                valor = parseFloat(selector('.mw-filter-input').value);
                criteria = (parseFloat(element) === valor);
                criteria2 = (!valor);
                break;

        }

        if (criteria) {
            filtrado.push(index);
            return;
        } else if (criteria2) {
            filtrado = [];
            return;
        }
    };

    this.clearFilter = function() {
        var elemento = selector('.mw-filter .mw-selects').childNodes[columSelecionado.filtroId];
        if(elemento)
            elemento.className = elemento.className.replace(' selected', '');
        
        objetoNovo = {};
        filtrado = [];
        columSelecionado = {};
        selector('.mw-filter-input').value = "";
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
