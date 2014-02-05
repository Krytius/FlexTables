/**
 * @class Classe que manipula as máscaras do grid
 * @returns {GridManipulate}
 */
function GridManipulate() {

    //Globais
    var self = this;
    var object = {};

    /**
     * Função que passa json para a classe
     * @param {Object} json
     * @returns {void}
     */
    this.init = function(json) {
        object = json;        
        return;
    };
}