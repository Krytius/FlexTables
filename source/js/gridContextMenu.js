function GridContextMenu() {

    // Globais
    var object = {};
    var contextMenu = [];
    
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
        selectRow(this);
        createContextMenu(e.y, e.x);
    };
    
    var createContextMenu = function(y, x) {
        var content = selector(".mw-content");
        var menu = create("div");
        var height = 0;
        var width = 0;
        
        
        // Configurações do menu
        menu.className = "mw-content-context-menu";
        menu.style.top = y + "px";
        menu.style.left = x + "px";
        
        for(var i=0; i<contextMenu.length; i++) {
            var obj = contextMenu[i];
            height += 30;
            
            var div = create('div');
            div.className = "mw-context-menu";
            div.setAttribute('menu-id', i);
            div.innerHTML = obj.menu;
            div.onclick = executeCallback;
            
            if(width < obj.menu.length) {
                width = obj.menu.length;
            }
            
            menu.appendChild(div);
        }
        menu.style.width = (width * 10) + 20 + "px";
        menu.style.height = height + "px";
        content.appendChild(menu);
    };
    
    var executeCallback = function() {
        var content = selector(".mw-content");
        var id = this.getAttribute("menu-id");
        
        contextMenu[id].callback();
        
        content.removeChild(this.parentNode);
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