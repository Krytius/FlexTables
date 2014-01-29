function GridManipulate() {

    //Globais
    var self = this;
    var element;
    var object = {};
    var colunas = [];
    var colunasWidth = [];
    var colunasType = [];
    var colunasEvents = [];

    /**
     * Função que segura objeto na classe
     * @param {type} elem
     * @param {type} json
     * @param {type} col
     * @param {type} colW
     * @param {type} colT
     * @param {type} colE
     * @returns {void}
     */
    this.init = function(elem, json, col, colW, colT, colE) {
        element = elem;
        object = json;
        colunas = col;
        colunasWidth = colW;
        colunasType = colT;
        colunasEvents = colE;
    };

    

}