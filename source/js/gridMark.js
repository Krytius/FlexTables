function GridMark() {

    //
    //
    //  Globais
    //
    //

    var $, create, element, object, constante;
    var largura, colunas, eventos, tipo, alinhamento;

    var linhaAnterior;
    var linhaSelectAtual;

    // Variavel de controle de paginação
    var paginaAtual = 0;
    var quantidadePaginas = 0;
    var linhasPorPagina = 0;
    var tamanhoPagina = 0;
    
    //
    //
    //  Getters e Setters  
    //
    //
    
    // ====================================
    //  Linha Anterior
    // ====================================
    var setLinhaAnterior = function(val) {
        linhaAnterior = val;
        return;
    };

    var getLinhaAnterior = function() {
        return linhaAnterior;
    };
    
    // ====================================
    //  Linha Selecionada
    // ====================================
    var getRowSelect = function() {
        if (linhaSelectAtual) {
            return {
                linha: linhaSelectAtual,
                id: $('tr.mw-content-tr[linha-id="' + linhaSelectAtual + '"]').getAttribute('data-id')
            };
        }
        return idioma["linhaSelecionada"];
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
        largura = retorno.getLarguraColunas();
        eventos = retorno.getColunasEventos();
        colunas = retorno.getColunas();
        tipo = retorno.getColunasTipo();
        alinhamento = retorno.getColunasAlinhamento();

        // =====================================================================
        // Init Paginação
        // =====================================================================
        configPaginacao();
    };

    /**
     * ConfigPaginacao
     * 
     * @description ::  Configura paginação do grid
     * 
     * @returns {void}
     */
    var configPaginacao = function() {
        var contentHeight = $(".mw-content").offsetHeight;
        var tableHeight = $(".mw-content table").offsetHeight;
        var larguraLinha = $(".mw-content table tr").offsetHeight;
        var quantidadeRow = $(".mw-content table").childNodes.length;

        // Verificação da quantidade de páginas
        quantidadePaginas = Math.floor(tableHeight / contentHeight);


        if ((tableHeight / contentHeight) > quantidadePaginas)
            quantidadePaginas += 1;
        
        // Verificação da quantidade de itens por página
        linhasPorPagina = Math.floor(quantidadeRow / quantidadePaginas);
        
        if ((quantidadeRow/quantidadePaginas) > (linhasPorPagina + 0.5))
            linhasPorPagina += 1;
        
        tamanhoPagina = linhasPorPagina * larguraLinha;
    };
    
   /**
     * SelectRow
     * 
     * @description ::  Seleciona linha a partir do click
     * 
     * @returns {void}
     */
    var selectRow = function() {
        if (linhaAnterior) {
            var elemet = $('tr.mw-content-tr[linha-id="' + linhaAnterior + '"]');

            if (elemet) {
                elemet.className = elemet.className.replace(" select", "");
            }

            //self.removeContext();
        }
        linhaSelectAtual = this.getAttribute("linha-id");
        this.className += " select";

        linhaAnterior = linhaSelectAtual;
        paginacao("click");
    };
    

    /**
     * SelecionaLinha
     * 
     * @description ::  Seleciona Linha a partir do keypress
     * 
     * @param {DON} element
     * @returns {void}
     */
    var selecionaLinha = function(element) {
        if (linhaAnterior) {
            var elemet = $('tr.mw-content-tr[linha-id="' + linhaAnterior + '"]');

            if (elemet) {
                elemet.className = elemet.className.replace(" select", "");
            }
        }

        linhaSelectAtual = element.getAttribute("linha-id");
        element.className += " select";

        linhaAnterior = linhaSelectAtual;
        paginacao("keypress");
    };
    
    /**
     * Paginacao
     * 
     * @description ::  Paginação do grid do grid por click
     * 
     * @param {type} val
     * @returns {void}
     */
    var paginacao = function(val) {
        paginaAtual = Math.floor(linhaSelectAtual / linhasPorPagina);
        if (val === "keypress")
            $(".mw-content").scrollTop = paginaAtual * tamanhoPagina;
    };
    
    /**
     * MovimentLine
     * 
     * @description ::  Função que manipula comandos do grid
     * 
     * @param {Object} e
     * @returns {void}
     */
    var movimentLine = function(e) {
        if (e.keyCode === 38) {
            e.preventDefault();
            selectRowUp(this);
        } else if (e.keyCode === 40) {
            e.preventDefault();
            selectRowDown(this);
        }
    };
    
    /**
     * selectRowUp
     * 
     * @description ::  Sobe uma linha do grid
     * 
     * @param {DON} elemet
     * @returns {void}
     */
    var selectRowUp = function(elemet) {
        var table = elemet.childNodes[0];

        if (validacaoAcontecimento(parseInt(linhaSelectAtual) - 1, table)) {
            return;
        }

        selecionaLinha(table.childNodes[parseInt(linhaSelectAtual) - 1]);
    };

    /**
     * selectRowDown
     * 
     * @description ::  Desce uma linha do grid
     * 
     * @param {DON} elemet
     * @returns {void}
     */
    var selectRowDown = function(elemet) {
        var table = elemet.childNodes[0];

        if (validacaoAcontecimento(parseInt(linhaSelectAtual) + 1, table)) {
            return;
        }
        selecionaLinha(table.childNodes[parseInt(linhaSelectAtual) + 1]);
    };
    
    /**
     * ValidacaoAcontecimento
     * 
     * @description ::  Verifica se é possivel ocorrer uma movimentação de linha
     *                  para baixo ou para cima.
     * 
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
    

    var retorno = {
        init: init,
        // Getters e Setters
        setLinhaAnterior: setLinhaAnterior,
        getLinhaAnterior: getLinhaAnterior,
        getRowSelect: getRowSelect,
        
        
        selectRow: selectRow,
        selecionaLinha: selecionaLinha,
        // Eventos
        movimentLine: movimentLine,
        configPaginacao: configPaginacao
    };
    return retorno;
}