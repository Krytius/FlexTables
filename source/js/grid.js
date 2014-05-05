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
    var gridEvent = new GridEvent();
    var gridMark = new GridMark();
    var gridObject = new GridObject();

    //  
    //  
    //  Variaveis Globais
    //  
    //

    var constante = {
        LARGURA_SCROLL: 17,
        BORDAS: 1
    };

    var element = document.getElementById(idDom);
    var object = {};
    var colunas = [];
    var colunasLargura = [];
    var colunasAlinhamento = [];
    var colunasTipo = [];
    var colunasEventos = [];
    var colunasBotoes = [];

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
    var setConstantes = function(consts) {
        constante = consts;
        return;
    };

    var getConstantes = function() {
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
    var setColunasEventos = function(events) {
        colunasEventos = events;
        return;
    };

    var getColunasEventos = function() {
        return colunasEventos;
    };
    
    // ========================================
    //  Eventos dos Botões
    // ========================================
    var setColunasBotoes = function(colBotoes) {
        colunasBotoes = colBotoes;
        return;
    };
    
    var getColunasBotoes = function() {
        return colunasBotoes;
    };

    //
    //
    //  Procedimentos
    //
    //

    /**
     * Init
     * 
     * @description :: Função que inicia a procedimento de montagem do Grid
     * 
     * @param  {json} json
     * @return {void}
     */
    var init = function(json) {
        setObject(json);
        initGrid();
    };


    /**
     * InitGrid
     * 
     * @description :: Função que inicia processo de plotagem do grid
     * 
     * @return {void}
     */
    var initGrid = function() {
        var error = gridEvent.getErrorCallback();
        if (colunas.length > 0) {
            if (!(colunasLargura.length > 0) && tentativas <= maximoTentativas) {
                tentativas++;
                setTimeout(function() {
                    error(idioma[002]);
                    initGrid();
                }, 30);
                return;
            } else if (!(colunasLargura.length > 0)) {
                setLarguraColunasIgual();
            }

            setLarguraColunas(getColunasWidth());
            iniciarClasses(retorno);
        } else {
            setTimeout(function() {
                error(idioma[001]);
                initGrid();
            }, 300);
        }
    };

    /**
     * Inicia Classes
     * 
     * @description ::  Inicia todas as depêndencias do plugin
     * 
     * @param {Object} retorno
     * @returns {void}
     */
    var iniciarClasses = function(retorno) {
        gridCreate.init(retorno);
        gridEvent.init(retorno);
        gridMark.init(retorno);
        gridObject.init(retorno);
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
     * Selector
     * 
     * @description :: Função que busca elemento DON
     * 
     * @param  {String} elem
     * @return {DON}
     */
    var selector = function(elem) {
        return document.querySelectorAll(elem)[0];
    };

    /**
     * Create
     * 
     * @description :: Função que cria elemento na DON
     * 
     * @param  {String} elem
     * @return {DON}
     */
    var create = function(elem) {
        return document.createElement(elem);
    };
    
    //
    //
    //  Publicas
    //
    //
    
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
        setColunasEventos: setColunasEventos,
        getColunasEventos: getColunasEventos,
        setConstantes: setConstantes,
        getConstantes: getConstantes,
        setColunasBotoes: setColunasBotoes,
        getColunasBotoes: getColunasBotoes,
        // Manipulação de DON
        element: element,
        $: selector,
        create: create,
        // Classes
        gridCreate: gridCreate,
        gridEvent: gridEvent,
        gridMark: gridMark,
        gridObject: gridObject,
        // Eventos
        adicionaLinha: gridCreate.adicionaLinha,
        deletaLinha: gridCreate.deletaLinha,
        deletaLinhaSelecionada: gridCreate.deletaLinhaSelecionada,
        // Monitor de Eventos
        monitorDeEventos: gridEvent.monitorDeEventos
    };

    return retorno;
}