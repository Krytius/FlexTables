function GridObject() {

    //
    //
    //  Globais
    //
    //

    var $, create, element, object, constante;

    //
    //
    //  Getters e Setters  
    //
    //

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
    };
    
    /**
     * 
     * @description :: Remove o id do objeto em questão
     * 
     * @param {Interger} id
     * @returns {void}
     */
    var removeIdObject = function(id) {
        var obj = object.getObject();
        var quant = obj.rows.length;
        var indice = 0;
        
        for (var i = 0; i < quant; i++) {
            var item = obj.rows[i];
            if(parseInt(item.id) === id) {
                indice = i;
                break;
            }
        }
        
        obj.rows.splice(indice, 1);
        object.setObject(obj);
        
        // Classes trabalhando com novo objeto
        object.gridCreate.refresh(obj);
        object.gridMark.configPaginacao();
    };
    
    /**
     * AtualizaObject
     * 
     * @description :: Atualiza o objeto
     * 
     * @param {type} obj
     * @returns {void}
     */
    var atualizaObject = function(obj) {
        object.gridCreate.refresh(obj);
        object.gridMark.configPaginacao();
    };


    var retorno = {
        init: init,
        // Getters e Setters
        // Procedimentos
        removeIdObject: removeIdObject,
        atualizaObject: atualizaObject
    };
    return retorno;
}