/**
 * FlexTables
 * @version: 0.0.1
 * @author: Elvis Ferreira Coelho (elviscoelho.net)
 * Date criation: 11/02/2014
 */
function Grid(a){var b,c,d,e=this,f=new GridElement,g=new GridEvent,h=new GridMark,i=new GridContextMenu,j=new GridFilter,k=document.getElementById(a),l={},m={},n=[],o=[],p=[],q=[],r=[],s=[],t=[],u=0,v=2,w=1e9;this.init=function(a){x(a),z()};var x=function(a){l=a,j.init(k,a,n,p,E,b),f.init(a,s,p,q),g.init(a,q),h.init(a),i.init(a,r,h.selectionRowForce),d&&d(a)},y=function(a){m=a,g.init(a,q),h.init(a),i.init(a,r,h.selectionRowForce)},z=function(){if(n.length>0){if(!(o.length>0||u>=v))return u++,void setTimeout(function(){console.log(idioma[2]),z()},30);A(),B(),C(),D(l)}else setTimeout(function(){console.log(idioma[1]),z()},300)};this.setWidthColums=function(a){for(var b=a.length,c=k.offsetWidth-17,d=0,e=0,f=0;b>f;f++)"*"===a[f]?d++:c-=parseInt(a[f]);e=c/d;for(var f=0;b>f;f++)o.push("*"===a[f]?e:parseInt(a[f]))},this.setWidthColumsPercent=function(a){for(var b=a.length,c=k.offsetWidth-17,d=k.offsetWidth,e=0,f=0,g=0;b>g;g++)if("*"===a[g])e++;else{var h=c*parseInt(a[g])/100;d-=h}f=d/e;for(var g=0;b>g;g++)o.push("*"===a[g]?f:c*parseInt(a[g])/100)};var A=function(){for(var a=n.length,b=k.offsetWidth-17,c=b/a,d=0;a>d;d++)o.push(c)};this.setColums=function(a){n=a},this.setColumsType=function(a){p=a},this.setColumsMask=function(a){s=a},this.setColumsEvents=function(a){q=a},this.setContextMenu=function(a){r=a},this.setColumsFilter=function(a){t=a},this.setSearchFilter=function(a){b=a};var B=function(){if(t.length>0){for(var a=n.length,b=[],c=0;a>c;c++)t[c].status&&b.push([t[c],c]);j.setColumsFilter(b),j.constructFilter()}},C=function(){var a=n.length,b=I("div");b.className="mw-header";var c=I("table");c.style.width=k.offsetWidth-17+"px";for(var d=I("tr"),e=0;a>e;e++){var f=I("td");f.width=o[e],f.setAttribute("data-id",e),f.setAttribute("type-coluna",p[e]),f.className="mw-header-td",f.onclick=function(){g.ordenar(this,function(a){E(a)})};var h=I("div");h.className="mw-header-td-div",h.innerHTML=n[e],f.appendChild(h),d.appendChild(f)}c.appendChild(d),b.appendChild(c),k.appendChild(b)},D=function(a){var b=n.length,c=a.rows.length,d=I("div");d.className="mw-content",d.style.height=k.offsetHeight-42-(j.getColumsFilter().length>0?25:0)+"px",d.tabIndex="1",d.onkeydown=h.movimentLine;var g=I("table");g.style.width=k.offsetWidth-17+"px",r.length>0&&(window.onclick=h.removeContext);for(var l=0;c>l;l++){var m=I("tr");m.className="mw-content-tr",m.setAttribute("linha-id",l),m.setAttribute("data-id",a.rows[l].id),m.onclick=h.selectRow,r.length>0&&(m.oncontextmenu=i.vicContextMenu);for(var s=0;b>s;s++){var t=I("td");t.className="mw-content-td",t.setAttribute("colum-id",s),t.width=o[s];var u=f.createColumType(q[s],a.rows[l].data[s],o[s],s);f.elementEvent(u,q[s],p[s],function(a){x(a)}),t.appendChild(u),m.appendChild(t)}g.appendChild(m)}g.appendChild(m),d.appendChild(g),k.appendChild(d);var v={addRow:e.addRow};h.parametrosPaginacao(d,v)};this.addRow=function(a){var b=n.length,c=!1;a.itensColunas&&a.dataId&&(c=!0,l.rows.push({id:a.dataId,data:a.itensColunas}),x(l));var d=I("tr");d.className="mw-content-tr",d.setAttribute("linha-id",parseInt(H("div.mw-content").childNodes[0].childNodes.length)),d.onclick=h.selectRow,c?d.setAttribute("data-id",parseInt(a.dataId)):d.setAttribute("data-id","-1");for(var e=0;b>e;e++){var g=I("td");g.className="mw-content-td",g.setAttribute("colum-id",e),g.width=o[e];var i;i=c?a.itensColunas[e]:"str"===p[e]?idioma.newRow:"sle"===p[e]?l.rows[0].data[e]:idioma.newRowNumber;var j=f.createColumType(q[e],i,o[e]-10,e);f.elementEvent(j,q[e],p[e],function(a){x(a)}),g.appendChild(j),d.appendChild(g)}var m=H(".mw-content table");return c?(m.insertBefore(d,m.childNodes[a.position]),k.childNodes[1].scrollTop=42*a.position-42,h.selectionRowForce(d)):(m.appendChild(d),k.childNodes[1].scrollTop=m.offsetHeight),w++,d},this.deleteRow=function(a){var b=H(".mw-content table"),d=H(".mw-content").scrollTop,f=b.childNodes[a].getAttribute("data-id");b.removeChild(b.childNodes[a]),l.rows.splice(a,1),e.refreshGrid(l),x(l),H(".mw-content").scrollTop=d,a===h.getLinhaAnterior()&&h.setLinhaAnterior(null),c&&c(parseInt(a),parseInt(f))},this.deleteRowId=function(a){var b=H('tr.mw-content-tr[data-id="'+a+'"]').getAttribute("linha-id"),d=H(".mw-content").scrollTop;l.rows.splice(b,1),e.refreshGrid(l),x(l),H(".mw-content").scrollTop=d,b===h.getLinhaAnterior()&&h.setLinhaAnterior(null),c&&c(parseInt(b),parseInt(a))},this.getRowSelectedId=function(){var a=h.getRowSelect();return a.idSelect},this.getRowSelected=function(){var a=h.getRowSelect();return a.rowSelect},this.clearFilter=function(a){var b=j.clearFilter();a(b.filtroId,b.columId)},this.setMonitorEvents=function(a,b){switch(a){case"onEdit":f.setCallbackOnEdit(b);break;case"onCheck":f.setCallbackOnCheck(b);break;case"onKeyPress":h.setCallbackOnKeyPress(b);break;case"onDeleteRow":F(b);break;case"onObject":G(b)}},this.refreshGrid=function(a){x(a);var b=H(".mw-content");k.removeChild(b),D(a)};var E=function(a){var b=H(".mw-content");k.removeChild(b),D(a),y(a)},F=function(a){c=a},G=function(a){d=a},H=function(a){return document.querySelectorAll(a)[0]},I=function(a){return document.createElement(a)}}function GridContextMenu(){var a,b={},c=[],d=0,e=0;this.init=function(d,e,f){b=d,c=e,a=f},this.vicContextMenu=function(b){b.preventDefault(),d=this.getAttribute("linha-id"),e=this.getAttribute("data-id"),a(this),f(b.pageY,b.pageX)};var f=function(a,b){var d=h(".mw-content"),e=i("div"),f=0,j=0,k=0;e.className="mw-content-context-menu",e.style.top=a+"px",e.style.left=b+"px";for(var l=0;l<c.length;l++){var m=c[l];f+=30;var n=i("div");if(n.className="mw-context-menu",n.setAttribute("menu-id",l),n.onclick=g,m.icon){k=30;var o=i("div");o.className="mw-icon",o.style.backgroundImage="url("+m.icon+")",n.appendChild(o)}j<m.name.length&&(j=m.name.length);var p=i("div");p.className="mw-text",p.innerHTML=m.name,p.style.width=10*j+"px",n.appendChild(p),e.appendChild(n)}e.style.width=10*j+20+k+"px",e.style.height=f+"px",d.appendChild(e)},g=function(){var a=h(".mw-content"),b=this.getAttribute("menu-id");a.removeChild(this.parentNode),c[b].callback(d,e)},h=function(a){return document.querySelectorAll(a)[0]},i=function(a){return document.createElement(a)}}function GridElement(){var a,b,c,d,e=1e9,f=[],g=[],h=[],i=[],j=0;this.init=function(b,c,d,e){a=b,g=c,f=d,h=e},this.createColumType=function(a,b,c,d){var e;switch(j=c-10,a){case"edit":case"number":e=k(b);break;case"check":e=m(b);break;case"select":e=l(b,d);break;default:e=k(b)}return e};var k=function(a){var b=y("div");return b.className="mw-content-td-div",b.style.width=j+"px",b.innerHTML=a,b.setAttribute("title",a),b},l=function(a){var b=y("div");return b.className="mw-content-td-div",b.style.width=j+"px",b.innerHTML=a.itens[a.selected],b.setAttribute("title",a.itens[a.selected]),b},m=function(a){var b=y("div");return b.className="mw-content-td-check",b.className+=parseInt(a)?" enabled":" disabled",b};this.elementEvent=function(a,c,d,e){switch(c){case"edit":case"number":a.ondblclick=function(){b=e,n(a,"text",d)};break;case"select":a.ondblclick=function(){b=e,r(a)};break;case"check":a.onclick=function(){b=e,q(a)}}};var n=function(a,b){var c=a.innerHTML,d=parseInt(a.parentNode.parentNode.getAttribute("linha-id")),e=parseInt(a.parentNode.parentNode.getAttribute("data-id")),f=parseInt(a.parentNode.getAttribute("colum-id"));if(-1===e)return void p(a,b);var h=document.createElement("input");h.type=b,h.className="mw-content-text",h.value=c,h.onblur=function(){var b=this.value;o(a,b,c,f,d,e)},h.onkeyup=function(b){var h=this.value;13===b.keyCode?(this.onblur=null,o(a,h,c,f,d,e)):27===b.keyCode?(this.onblur=null,o(a,c,c,f,d,e)):(46!==b.keyCode||8!==b.keyCode)&&g.length>0&&u(this)},a.innerHTML="",a.appendChild(h),h.focus(),a.ondblclick=null},o=function(a,d,e,f,g,h){a.innerHTML=d,a.setAttribute("title",d),a.ondblclick=function(){n(a)},b(x(e,d,f,g,h)),c&&c(e,d,f,g,h)},p=function(b,c){var d=b.parentNode.parentNode,f=d.childNodes.length;d.setAttribute("data-id",e),d.setAttribute("linha-id",a.rows.length);for(var g={id:e,data:[]},i=0;f>i;i++)g.data.push("select"!==h[i]?d.childNodes[i].childNodes[0].innerHTML:a.rows[0].data[i]);a.rows.push(g),e++,n(b,c)},q=function(a){var c,e,f=a.className.split(" ")[1],g=a.parentNode.parentNode.getAttribute("data-id"),h=a.parentNode.parentNode.getAttribute("linha-id"),i=a.parentNode.getAttribute("colum-id");"enabled"===f?(a.className=a.className.replace("enabled","disabled"),c=1,e=0):(a.className=a.className.replace("disabled","enabled"),c=0,e=1),b(x(c,e,i,h,g)),d&&d(e?!0:!1,parseInt(i),parseInt(h),parseInt(g))},r=function(b){var c=b.parentNode,d=parseInt(b.parentNode.parentNode.getAttribute("linha-id")),e=parseInt(b.parentNode.parentNode.getAttribute("data-id")),f=parseInt(b.parentNode.getAttribute("colum-id"));if(-1===e)return void t(b);var g=a.rows[d].data[f],h=g.itens[g.selected],i=y("label"),j=y("select");j.className="mw-content-td-select";for(var k=0;k<g.itens.length;k++){var l=y("option");l.innerHTML=g.itens[k],l.value=k,l.selected=k===g.selected?!0:!1,j.appendChild(l)}j.onblur=function(){var a={linhaId:d,dataId:e,colum:f,text:h,valor:this.value};this.onchange=null,s(c,a)},j.onchange=function(){var a={linhaId:d,dataId:e,colum:f,text:h,valor:this.value};this.onblur=null,s(c,a)},c.innerHTML="",i.appendChild(j),c.appendChild(i),j.focus(),c.ondblclick=null},s=function(d,e){var f={};a.rows[e.linhaId]?f={selected:parseInt(e.valor),itens:a.rows[e.linhaId].data[e.colum].itens}:(f={selected:parseInt(e.valor),itens:i[e.colum].itens},t(d)),d.innerHTML="";var g=l(f);g.ondblclick=function(){r(g)},d.appendChild(g),b(x(e.text,f,e.colum,parseInt(e.linhaId),e.dataId)),c&&c(e.text,a.rows[e.linhaId].data[e.colum].itens[e.valor],e.colum,e.linhaId,e.dataId)},t=function(b){var c=b.parentNode.parentNode,d=c.childNodes.length;c.setAttribute("data-id",e);for(var f={id:e,data:[]},g=0;d>g;g++)f.data.push("select"!==h[g]?c.childNodes[g].childNodes[0].innerHTML:a.rows[0].data[g]);a.rows.push(f),e++,r(b)},u=function(a){var b=a.parentNode.parentNode.getAttribute("colum-id");"not"===g[b]?w(f[b],a):v(g[b],a)},v=function(a,b){MaskInput(a,b)},w=function(a,b){switch(a){case"int":MaskPadrao("9",b);break;case"flt":MaskPadrao("9.9",b);break;case"mon":MaskPadrao("R$9.9",b);break;default:MaskPadrao("a",b)}};this.setCallbackOnEdit=function(a){c=a},this.setCallbackOnCheck=function(a){d=a};var x=function(b,c,d,e,f){return b===c?a:(parseInt(a.rows[e].id)===parseInt(f)&&(a.rows[e].data[d]=c),a)},y=function(a){return document.createElement(a)}}function GridEvent(){var a,b={id:"",ordenacao:""},c=[],d=null,e=null;this.init=function(b,f){a=b,c=f,d=null,e=null},this.ordenar=function(g,h){var i=g.getAttribute("data-id"),k=g.getAttribute("type-coluna"),l=b.id,m=b.ordenacao;if("select"!==c[parseInt(i)]){if(l===i&&"ASC"===m?b.ordenacao="DESC":l===i&&"DESC"===m?b.ordenacao="ASC":(b.ordenacao="ASC",b.id=i),j("#ordenacao[data-id='"+i+"']")){var n=document.getElementById("ordenacao");n.className=b.ordenacao}else{if(l!==i&&l){var o=j("#ordenacao[data-id='"+l+"']"),p=o.parentNode;p.removeChild(o)}var q=document.createElement("div");q.className=b.ordenacao,q.id="ordenacao",q.setAttribute("data-id",i),g.appendChild(q)}var r=f(a,k,i);!d&&"ASC"===b.ordenacao||i!==l&&"ASC"===b.ordenacao?(d=r,h(d)):d&&"ASC"===b.ordenacao?h(d):!e&&"DESC"===b.ordenacao||i!==l&&"DESC"===b.ordenacao?(e=r,h(e)):e&&"DESC"===b.ordenacao&&h(e)}};var f=function(a,b,c){return a.rows.sort(function(a,d){return"str"===b?g(a.data[c],d.data[c]):"flt"===b?h(a.data[c],d.data[c]):"int"===b?i(a.data[c],d.data[c]):void 0}),a},g=function(a,c){var d=a.toLowerCase(),e=c.toLowerCase();if("ASC"===b.ordenacao){if(e>d)return-1;if(d>e)return 1}else{if(e>d)return 1;if(d>e)return-1}return 0},h=function(a,c){return"ASC"===b.ordenacao?parseFloat(a)-parseFloat(c):parseFloat(c)-parseFloat(a)},i=function(a,c){return"ASC"===b.ordenacao?parseInt(a)-parseInt(c):parseInt(c)-parseInt(a)},j=function(a){return document.querySelectorAll(a)[0]}}function GridFilter(){var a,b,c,d=this,e={},f=[],g=[],h=[],i=[],j={rows:[]},k={};this.init=function(d,h,i,j,k,l){a=d,e=h,f=i,g=j,b=k,c=l},this.setColumsFilter=function(a){h=a},this.getColumsFilter=function(){return h},this.constructFilter=function(){var b=w("div");b.className="mw-filter",b.style.width=a.offsetWidth+"px",b.style.height="25px";var c=l(),d=m(c),e=o();b.appendChild(d),b.appendChild(e),a.appendChild(b)};var l=function(){return a.offsetWidth-225},m=function(a){var b=h.length,c=a/b;c>150&&(c=150);var d=w("div");d.className="mw-selects",d.style.width=a+"px";for(var e=0;b>e;e++){var g=w("div");g.className="mw-buttons",g.setAttribute("filtro-id",e),g.setAttribute("colum-id",h[e][1]),g.setAttribute("title",f[h[e][1]]),g.style.width=h[e][0].width?n(a,c,b,h[e][0].width):c+"px",g.onclick=h[e][0].event?q:p;var i=w("i");i.className="mw-icon",i.style.backgroundImage="url("+h[e][0].icon+")";var j=w("span");j.className="mw-text",j.style.width=h[e][0].width?parseInt(n(a,c,b,h[e][0].width))-40+"px":c-40+"px",j.innerHTML=h[e][0].title?h[e][0].title:f[h[e][1]],g.appendChild(i),g.appendChild(j),d.appendChild(g)}return d},n=function(a,b,c,d){for(var e=0,f=0;f<h.length;f++)h[f][0].width?"*"===h[f][0].width?e++:a-=h[f][0].width:a-=b;return"*"===d?a/e+"px":d+"px"},o=function(){var a=w("div");a.className="mw-search",a.style.width="225px";var b=w("input");b.className="mw-filter-input",b.type="text",c?b.onkeyup=s:(a.onclick=r,b.onkeyup=t);var d=w("div");return d.className="mw-filter-div",a.appendChild(b),a.appendChild(d),a},p=function(){var a=this.getAttribute("colum-id"),b=this.getAttribute("filtro-id");if(this.className+=" selected",k.columId){var c=this.parentNode.childNodes[k.filtroId];c.className=c.className.replace(" selected","")}v(".mw-filter-input").focus(),k.columId=a,k.filtroId=b},q=function(){var a=this.getAttribute("colum-id"),b=this.getAttribute("filtro-id");if(this.className+=" selected",k.columId){var c=this.parentNode.childNodes[k.filtroId];c&&(c.className=c.className.replace(" selected",""))}h[b][0].event(),k.columId=a,k.filtroId=b},r=function(){k.columId||d.forceFilterActive(0),v(".mw-filter-input").focus()};this.forceFilterActive=function(a){if(k.columId){var b=v(".mw-filter .mw-selects").childNodes[k.filtroId];b.className=b.className.replace(" selected","")}var c=v(".mw-selects").childNodes[a];c.className+=" selected";var d=c.getAttribute("colum-id"),e=c.getAttribute("filtro-id");k.columId=d,k.filtroId=e};var s=function(a){c(a.keyCode,this.value)},t=function(a){if(13!==a.keyCode){for(var c=e.rows.length,d=[],f=0;c>f;f++)d.push(e.rows[f].data[k.columId].toLowerCase());if(i=[],d.filter(u),i.length>0){var g=i.length;j.rows=[];for(var f=0;g>f;f++)j.rows.push(e.rows[i[f]]);b(j)}else b(e)}},u=function(a,b){var c,d,e;switch(g[k.columId]){case"str":c=v(".mw-filter-input").value.toLowerCase(),d=-1!==a.search(c);break;case"int":c=parseInt(v(".mw-filter-input").value),d=parseInt(a)===c,e=!c;break;case"flt":c=parseFloat(v(".mw-filter-input").value),d=parseFloat(a)===c,e=!c}return d?void i.push(b):e?void(i=[]):void 0};this.clearFilter=function(){var a=k,b=v(".mw-filter .mw-selects").childNodes[k.filtroId];return b&&(b.className=b.className.replace(" selected","")),j={},i=[],k={},v(".mw-filter-input").value="",a};var v=function(a){return document.querySelectorAll(a)[0]},w=function(a){return document.createElement(a)}}function GridMark(){var a,b,c,d,e=this,f=0,g=0,h=0,i=0,j={};this.init=function(b){a=b},this.getLinhaAnterior=function(){return b},this.setLinhaAnterior=function(a){b=a},this.getRowSelect=function(){return c?{rowSelect:c,idSelect:r('tr.mw-content-tr[linha-id="'+c+'"]').getAttribute("data-id")}:{rowSelect:null,idSelect:null}},this.removeContext=function(){r(".mw-content div.mw-content-context-menu")&&r(".mw-content").removeChild(r(".mw-content div.mw-content-context-menu"))},this.selectRow=function(){if(b){var a=r('tr.mw-content-tr[linha-id="'+b+'"]');a&&(a.className=a.className.replace(" select","")),e.removeContext()}c=this.getAttribute("linha-id"),this.className+=" select",b=c,q("click")},this.selectionRowForce=function(a){if(b){var d=r('tr.mw-content-tr[linha-id="'+b+'"]');d.className=d.className.replace(" select",""),e.removeContext()}c=a.getAttribute("linha-id"),a.className+=" select",b=c,q("click")},this.parametrosPaginacao=function(a,b){j=b,e.configPaginacao()};var k=function(a,b){return 0>a?!0:a>parseInt(b.childNodes.length-1)?!0:!1},l=function(a){if(b){var d=r('tr.mw-content-tr[linha-id="'+b+'"]');d&&(d.className=d.className.replace(" select","")),e.removeContext()}c=a.getAttribute("linha-id"),a.className+=" select",b=c,q("keypress")},m=function(a){var b=a.childNodes[0].childNodes.length,c=a.childNodes[0];a.scrollTop=c.offsetHeight,l(c.childNodes[b-1])},n=function(a){var b=a.childNodes[0];a.scrollTop=0,l(b.childNodes[0])},o=function(a){var b=a.childNodes[0];k(parseInt(c)-1,b)||l(b.childNodes[parseInt(c)-1])},p=function(a){var b=a.childNodes[0];return k(parseInt(c)+1,b)?void(d||l(j.addRow(a))):void l(b.childNodes[parseInt(c)+1])};this.movimentLine=function(a){d?(d(a.keyCode,a.ctrlKey,a.shiftKey,a.altKey),38===a.keyCode?o(this):40===a.keyCode&&p(this)):a.ctrlKey&&38===a.keyCode?(a.preventDefault(),n(this)):a.ctrlKey&&40===a.keyCode?(a.preventDefault(),m(this)):38===a.keyCode?(a.preventDefault(),o(this)):40===a.keyCode&&(a.preventDefault(),p(this))},this.configPaginacao=function(){var a=r(".mw-content").offsetHeight,b=r(".mw-content table").offsetHeight;g=Math.floor(b/a),b/a>g&&(g+=1);var c=r(".mw-content table").childNodes.length;h=Math.floor(c/g),i=42*h};var q=function(a){f=Math.floor(c/h),"keypress"===a&&(r(".mw-content").scrollTop=f*i)};this.setCallbackOnKeyPress=function(a){d=a};var r=function(a){return document.querySelectorAll(a)[0]}}function MaskInput(a,b){var c=a,d=b,e=function(){{var a=f(),b=g(a);h(a,b)}},f=function(){var a=c.length;d.maxLength=a;for(var b=[],e=0;a>e;e++)b.push(k(c[e]));return b},g=function(a){for(var b=a.length,d=[],e=0;b>e;e++)a[e].test(1)||a[e].test("A")||a[e].test("a")||d.push({pos:e,"char":c[e]});return d},h=function(a,b){for(var c=d.value,e=d.value,f=e.length,g=(a.length,b.length),h=0;f>h;h++)for(var k=0;g>k;k++)h===b[k].pos&&e[h]!==b[k].char&&(c=j(b[k].pos,c,b[k].char));for(var h=0;h<c.length;h++){var l=a[h].test(c[h]);l||(c=i(h,c))}d.value=c},i=function(a,b){return b=b.slice(0,a)},j=function(a,b,c){return b.slice(0,a)+c+b.slice(a)},k=function(a){for(var b=a.length,c="",d=1,e="",f=0;b>f;f++)c===a[f]?d++:(d>1?e+="{"+d+"})":1!==d||"A"!==c&&"a"!==c&&"?"!==c&&"9"!==c?1===d&&"*"===c&&(e+="+)"):e+=")",c=a[f],e+="9"===c?"([0-9]":"A"===c?"([A-Z]":"a"===c?"([a-z]":"?"===c?"([A-Za-z]":"*"===c?"([A-Za-z0-9]":" "===c?"\\s":"\\"+c,d=1),f===b-1&&d>1?e+="{"+d+"})":f!==b-1||"A"!==c&&"a"!==c&&"?"!==c&&"9"!==c||1!==d?f===b-1&&1===d&&"*"===c&&(e+="+)"):e+=")";return new RegExp("^"+e+"$")};e()}function MaskPadrao(a,b){var c=a,d=b,e=function(){var a;switch(c){case"9":a=new RegExp(/^[0-9]+$/);break;case"9.9":case"R$9.9":a=new RegExp(/^([^A-Za-z]+)$/);break;default:a=new RegExp(/.+/)}f(a,c)},f=function(a,b){var c=d.value;if("R$9.9"!==b){for(var e=0;e<d.value.length;e++){var f=a.test(c[e]);f||(c=c.slice(0,e))}d.value=c}else{c=c.replace(idioma.moeda,"");for(var e=0;e<c.length;e++){var f=a.test(c[e]);f||(c=c.slice(0,e))}d.value=idioma.moeda+c}};e()}