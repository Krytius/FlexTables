function MaskPadrao(mask, element) {

    //Globais
    var mascaras = mask;
    var don = element;
    
    /**
     * Função que inicia o procedimento de validação do plugin
     * @returns {void}
     */
    var init = function() {
        var regex;
        switch (mascaras) {
            case "9":
                regex = new RegExp(/^[0-9]+$/);
                break;
            case "9.9":
                regex = new RegExp(/(^[^A-Za-z]+)$/);
                break;
            default:
                regex = new RegExp(/.+/);
                break;
        }

        verificaElement(regex);
    };
    
    /**
     * Função que valida elemento
     * @param {RegExp} regex
     * @returns {void}
     */
    var verificaElement = function(regex) {
        var value = don.value;

        for (var i = 0; i < don.value.length; i++) {
            var teste = regex.test(value[i]);
            if (!teste)
                value = value.slice(0, i);
        }
        don.value = value;
    };

    // Retorno init
    init();
}