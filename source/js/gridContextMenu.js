function GridContextMenu() {

    // Globais
    var object = {};
    var contextMenu = [];
    var linhaId = 0;
    var dataId = 0;

    //Callback
    var selectRow;


    this.init = function(json, menuContext, select) {
        object = json;
        contextMenu = menuContext;
        selectRow = select;
        return;
    };


    this.vicContextMenu = function(e) {
        e.preventDefault();
        linhaId = this.getAttribute('linha-id');
        dataId =  this.getAttribute('data-id');
        selectRow(this);
        createContextMenu(e.y, e.x);
    };

    var createContextMenu = function(y, x) {
        var content = selector(".mw-content");
        var menu = create("div");
        var height = 0;
        var width = 0;
        var img = 0;

        // Configurações do menu
        menu.className = "mw-content-context-menu";
        menu.style.top = y + "px";
        menu.style.left = x + "px";

        for (var i = 0; i < contextMenu.length; i++) {
            var obj = contextMenu[i];
            height += 30;

            var div = create('div');
            div.className = "mw-context-menu";
            div.setAttribute('menu-id', i);
            div.onclick = executeCallback;

            if (obj.icon) {
                img = 30;

                var icon = create("div");
                icon.className = "mw-icon";
                icon.style.backgroundImage = 'url(' + obj.icon + ')';

                div.appendChild(icon);
            }

            if (width < obj.name.length) {
                width = obj.name.length;
            }

            var text = create('div');
            text.className = "mw-text";
            text.innerHTML = obj.name;
            text.style.width = (width * 10) + 'px';

            div.appendChild(text);
            menu.appendChild(div);
        }
        menu.style.width = ((width * 10) + 20 + img) + "px";
        menu.style.height = height + "px";
        content.appendChild(menu);
    };

    var executeCallback = function() {
        var content = selector(".mw-content");
        var id = this.getAttribute("menu-id");

        //Execute eventos de callback
        content.removeChild(this.parentNode);
        contextMenu[id].callback(linhaId, dataId);
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