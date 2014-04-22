/**
 * FlexTables
 * @version: 0.0.1
 * @author: Elvis Ferreira Coelho (elviscoelho.net)
 * Date criation: 22/04/2014
 */
function Grid(a){var b=new GridCreate,c=new GridEvent,d=new GridMark,e=new GridObject,f={LARGURA_SCROLL:17,BORDAS:1},g=document.getElementById(a),h={},i=[],j=[],k=[],l=[],m=[],n=0,o=2,p=function(a){f=a},q=function(){return f},r=function(a){h=a},s=function(){return h},t=function(a){i=a},u=function(){return i},v=function(a){j=a},w=function(){return j},x=function(a){k=a},y=function(){return k},z=function(a){l=a},A=function(){return l},B=function(a){m=a},C=function(){return m},D=function(a){r(a),E()},E=function(){var a=c.getErrorCallback();if(i.length>0){if(!(j.length>0)&&o>=n)return n++,void setTimeout(function(){a(idioma[2]),E()},30);j.length>0||H(),G(w()),F(K)}else setTimeout(function(){a(idioma[1]),E()},300)},F=function(a){b.init(a),c.init(a),d.init(a),e.init(a)},G=function(a){j=[];for(var b=a.length,c=g.offsetWidth-f.LARGURA_SCROLL,d=0,e=0,h=0;b>h;h++)"*"===a[h]?d++:c-=parseInt(a[h]);e=c/d;for(var h=0;b>h;h++)j.push("*"===a[h]?e:parseInt(a[h]));return j},H=function(){j=[];for(var a=i.length,b=g.offsetWidth-17,c=b/a,d=0;a>d;d++)j.push(c);return j},I=function(a){return document.querySelectorAll(a)[0]},J=function(a){return document.createElement(a)},K={init:D,setObject:r,getObject:s,setColunas:t,getColunas:u,setLarguraColunas:v,getLarguraColunas:w,setColunasAlinhamento:x,getColunasAlinhamento:y,setColunasTipo:z,getColunasTipo:A,setColunasEventos:B,getColunasEventos:C,setConstantes:p,getConstantes:q,element:g,$:I,create:J,gridCreate:b,gridEvent:c,gridMark:d,gridObject:e,adicionaLinha:b.adicionaLinha,deletaLinha:b.deletaLinha,deletaLinhaSelecionada:b.deletaLinhaSelecionada,monitorDeEventos:c.monitorDeEventos};return K}function GridContextMenu(){var a,b={},c=[],d=0,e=0;this.init=function(d,e,f){b=d,c=e,a=f},this.vicContextMenu=function(b){b.preventDefault(),d=this.getAttribute("linha-id"),e=this.getAttribute("data-id"),a(this),f(b.pageY,b.pageX)};var f=function(a,b){var d=h(".mw-content"),e=i("div"),f=0,j=0,k=0;e.className="mw-content-context-menu",e.style.top=a+"px",e.style.left=b+"px";for(var l=0;l<c.length;l++){var m=c[l];f+=30;var n=i("div");if(n.className="mw-context-menu",n.setAttribute("menu-id",l),n.onclick=g,m.icon){k=30;var o=i("div");o.className="mw-icon",o.style.backgroundImage="url("+m.icon+")",n.appendChild(o)}j<m.name.length&&(j=m.name.length);var p=i("div");p.className="mw-text",p.innerHTML=m.name,p.style.width=10*j+"px",n.appendChild(p),e.appendChild(n)}e.style.width=10*j+20+k+"px",e.style.height=f+"px",d.appendChild(e)},g=function(){var a=h(".mw-content"),b=this.getAttribute("menu-id");a.removeChild(this.parentNode),c[b].callback(d,e)},h=function(a){return document.querySelectorAll(a)[0]},i=function(a){return document.createElement(a)}}function GridCreate(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n=0,o=function(a){l=a},p=function(){return l},q=function(a){m=a},r=function(){return m},s=function(f){d=f,c=f.element,e=f.getConstantes(),a=f.$,b=f.create,g=f.getLarguraColunas(),i=f.getColunasEventos(),h=f.getColunas(),j=f.getColunasTipo(),k=f.getColunasAlinhamento(),t()},t=function(){u(),v()},u=function(){var i=h.length,l=b("div");l.className="mw-header";var m=b("table");m.style.width=c.offsetWidth-e.LARGURA_SCROLL+"px";for(var n=b("tr"),o=0;i>o;o++){var p=b("td");p.setAttribute("data-id",o),p.setAttribute("type-coluna",j[o]),p.className="mw-header-td",p.onclick=d.gridEvent.ordenar;var q=b("div");q.className="mw-header-td-div",q.style.width=g[o]+"px",k[o]||(k[o]="left"),q.style.textAlign=k[o],q.innerHTML=h[o],p.appendChild(q),n.appendChild(p)}m.appendChild(n),l.appendChild(m),c.appendChild(l),f=a(".mw-header").offsetHeight},v=function(){var a=d.getObject(),g=a.rows.length,h=b("div");if(h.className="mw-content",h.style.height=c.offsetHeight-f+"px",h.tabIndex="1",h.onkeydown=d.gridMark.movimentLine,g>0){var i=b("table");i.style.width=c.offsetWidth-e.LARGURA_SCROLL+"px";for(var j=0;g>j;j++){var k=x(a.rows[j],j);i.appendChild(k)}h.appendChild(i)}else{var l=b("div");l.className="mw-content-clear",l.style.width=c.offsetWidth-e.LARGURA_SCROLL+"px",l.style.height=c.offsetHeight-f+"px",l.style.lineHeight=c.offsetHeight-f+"px",l.innerHTML=idioma[0],h.appendChild(l)}c.appendChild(h)},w=function(d){var g=a(".mw-content");g.innerHTML="";var h=d.rows.length;if(h>0){var i=b("table");i.style.width=c.offsetWidth-e.LARGURA_SCROLL+"px";for(var j=0;h>j;j++){var k=x(d.rows[j],j);i.appendChild(k)}g.appendChild(i)}else{var l=b("div");l.className="mw-content-clear",l.style.width=c.offsetWidth-e.LARGURA_SCROLL+"px",l.style.height=c.offsetHeight-f+"px",l.style.lineHeight=c.offsetHeight-f+"px",l.innerHTML=idioma[0],g.appendChild(l)}},x=function(a,c){c>n&&(n=c);var e=h.length,f=b("tr");f.className="mw-content-tr",f.setAttribute("linha-id",c),f.setAttribute("data-id",a.id),f.onclick=d.gridMark.selectRow;for(var j=0;e>j;j++){var k=b("td");k.className="mw-content-td",k.setAttribute("colum-id",j),k.width=g[j];var l=y(i[j],j,a.data[j]);k.appendChild(l),f.appendChild(k)}return f},y=function(a,b,c){var d;switch(a){case"check":d=A(b,c);break;case"edit":default:d=z(b,c)}return d},z=function(a,c){var e=b("div");return e.className="mw-content-td-div",e.style.width=g[a]+"px",k[a]||(k[a]="left"),e.style.textAlign=k[a],e.innerHTML=c,e.setAttribute("title",c),"edit"===i[a]&&(e.ondblclick=d.gridEvent.textfield),e},A=function(a,c){var e=b("div");return e.className="mw-content-td-check "+(parseInt(c)?"enabled":"disabled"),e.setAttribute("value",c),e.onclick=d.gridEvent.check,e},B=function(b,c){var d=a(".mw-content table"),e={id:b,data:c},f=x(e,n+1);d.appendChild(f),l&&l(e)},C=function(b){var c=a('.mw-content table tr[data-id="'+b+'"]'),e=c.getAttribute("linha-id");a(".mw-content table").removeChild(c),d.gridObject.removeIdObject(b),m&&m(b,e)},D=function(){var a=d.gridMark.getRowSelect();if(a.id)C(parseInt(a.id));else{var b=d.gridEvent.getErrorCallback();b(a)}},E={init:s,refresh:w,adicionaLinha:B,deletaLinha:C,deletaLinhaSelecionada:D,setAdicionaCallback:o,getAdicionaCallback:p,setDeletaCallback:q,getDeletaCallback:r};return E}function GridElement(){var a,b,c,d,e=1e9,f=[],g=[],h=[],i=[],j=0;this.init=function(b,c,d,e){a=b,g=c,f=d,h=e},this.createColumType=function(a,b,c,d){var e;switch(j=c-10,a){case"edit":case"number":e=k(b);break;case"check":e=m(b);break;case"select":e=l(b,d);break;default:e=k(b)}return e};var k=function(a){var b=y("div");return b.className="mw-content-td-div",b.style.width=j+"px",b.innerHTML=a,b.setAttribute("title",a),b},l=function(a){var b=y("div");return b.className="mw-content-td-div",b.style.width=j+"px",b.innerHTML=a.itens[a.selected],b.setAttribute("title",a.itens[a.selected]),b},m=function(a){var b=y("div");return b.className="mw-content-td-check",b.className+=parseInt(a)?" enabled":" disabled",b};this.elementEvent=function(a,c,d,e){switch(c){case"edit":case"number":a.ondblclick=function(){b=e,n(a,"text",d)};break;case"select":a.ondblclick=function(){b=e,r(a)};break;case"check":a.onclick=function(){b=e,q(a)}}};var n=function(a,b){var c=a.innerHTML,d=parseInt(a.parentNode.parentNode.getAttribute("linha-id")),e=parseInt(a.parentNode.parentNode.getAttribute("data-id")),f=parseInt(a.parentNode.getAttribute("colum-id"));if(-1===e)return void p(a,b);var h=document.createElement("input");h.type=b,h.className="mw-content-text",h.value=c,h.onblur=function(){var b=this.value;o(a,b,c,f,d,e)},h.onkeyup=function(b){var h=this.value;13===b.keyCode?(this.onblur=null,o(a,h,c,f,d,e)):27===b.keyCode?(this.onblur=null,o(a,c,c,f,d,e)):(46!==b.keyCode||8!==b.keyCode)&&g.length>0&&u(this)},a.innerHTML="",a.appendChild(h),h.focus(),a.ondblclick=null},o=function(a,d,e,f,g,h){a.innerHTML=d,a.setAttribute("title",d),a.ondblclick=function(){n(a)},b(x(e,d,f,g,h)),c&&c(e,d,f,g,h)},p=function(b,c){var d=b.parentNode.parentNode,f=d.childNodes.length;d.setAttribute("data-id",e),d.setAttribute("linha-id",a.rows.length);for(var g={id:e,data:[]},i=0;f>i;i++)g.data.push("select"!==h[i]?d.childNodes[i].childNodes[0].innerHTML:a.rows[0].data[i]);a.rows.push(g),e++,n(b,c)},q=function(a){var c,e,f=a.className.split(" ")[1],g=a.parentNode.parentNode.getAttribute("data-id"),h=a.parentNode.parentNode.getAttribute("linha-id"),i=a.parentNode.getAttribute("colum-id");"enabled"===f?(a.className=a.className.replace("enabled","disabled"),c=1,e=0):(a.className=a.className.replace("disabled","enabled"),c=0,e=1),b(x(c,e,i,h,g)),d&&d(e?!0:!1,parseInt(i),parseInt(h),parseInt(g))},r=function(b){var c=b.parentNode,d=parseInt(b.parentNode.parentNode.getAttribute("linha-id")),e=parseInt(b.parentNode.parentNode.getAttribute("data-id")),f=parseInt(b.parentNode.getAttribute("colum-id"));if(-1===e)return void t(b);var g=a.rows[d].data[f],h=g.itens[g.selected],i=y("label"),j=y("select");j.className="mw-content-td-select";for(var k=0;k<g.itens.length;k++){var l=y("option");l.innerHTML=g.itens[k],l.value=k,l.selected=k===g.selected?!0:!1,j.appendChild(l)}j.onblur=function(){var a={linhaId:d,dataId:e,colum:f,text:h,valor:this.value};this.onchange=null,s(c,a)},j.onchange=function(){var a={linhaId:d,dataId:e,colum:f,text:h,valor:this.value};this.onblur=null,s(c,a)},c.innerHTML="",i.appendChild(j),c.appendChild(i),j.focus(),c.ondblclick=null},s=function(d,e){var f={};a.rows[e.linhaId]?f={selected:parseInt(e.valor),itens:a.rows[e.linhaId].data[e.colum].itens}:(f={selected:parseInt(e.valor),itens:i[e.colum].itens},t(d)),d.innerHTML="";var g=l(f);g.ondblclick=function(){r(g)},d.appendChild(g),b(x(e.text,f,e.colum,parseInt(e.linhaId),e.dataId)),c&&c(e.text,a.rows[e.linhaId].data[e.colum].itens[e.valor],e.colum,e.linhaId,e.dataId)},t=function(b){var c=b.parentNode.parentNode,d=c.childNodes.length;c.setAttribute("data-id",e);for(var f={id:e,data:[]},g=0;d>g;g++)f.data.push("select"!==h[g]?c.childNodes[g].childNodes[0].innerHTML:a.rows[0].data[g]);a.rows.push(f),e++,r(b)},u=function(a){var b=a.parentNode.parentNode.getAttribute("colum-id");"not"===g[b]?w(f[b],a):v(g[b],a)},v=function(a,b){MaskInput(a,b)},w=function(a,b){switch(a){case"int":MaskPadrao("9",b);break;case"flt":MaskPadrao("9.9",b);break;case"mon":MaskPadrao("R$9.9",b);break;default:MaskPadrao("a",b)}};this.setCallbackOnEdit=function(a){c=a},this.setCallbackOnCheck=function(a){d=a};var x=function(b,c,d,e,f){return b===c?a:(parseInt(a.rows[e].id)===parseInt(f)&&(a.rows[e].data[d]=c),a)},y=function(a){return document.createElement(a)}}function GridEvent(){var a,b,c,d,e,f,g,h,i,j={id:"",ordenacao:""},k=null,l=null,m="",n="",o="",p=function(a){m=a},q=function(){return m},r=function(a){n=a},s=function(a){o=a},t=function(j){d=j,c=j.element,e=j.getConstantes(),a=j.$,b=j.create,g=j.getColunasEventos(),f=j.getColunas(),h=j.getColunasTipo(),i=j.getLarguraColunas()},u=function(a,b){switch(a){case"onError":p(b);break;case"onAdicionar":d.gridCreate.setAdicionaCallback(b);break;case"onEditar":r(b);break;case"onDelete":d.gridCreate.setDeletaCallback(b);break;case"onCheck":s(b)}},v=function(){var a=this.innerHTML,c=this.parentNode.parentNode.getAttribute("linha-id"),d=this.parentNode.parentNode.getAttribute("data-id"),e=this.parentNode.getAttribute("colum-id"),f=b("input");f.type="text",f.style.width=i[e]-7+"px",f.className="mw-content-text",f.value=a,f.setAttribute("valor",a),f.setAttribute("linha-id",c),f.setAttribute("data-id",d),f.setAttribute("coluna-id",e),f.onblur=C,f.onkeyup=C,this.innerHTML="",this.appendChild(f),this.ondblclick=null,f.focus()},w=function(){var a=this.parentNode.getAttribute("colum-id"),b=this.parentNode.parentNode.getAttribute("linha-id"),c=this.parentNode.parentNode.getAttribute("data-id"),e=this.getAttribute("value");parseInt(e)?(this.className=this.className.replace("enabled","disabled"),e=0):(this.className=this.className.replace("disabled","enabled"),e=1),this.setAttribute("value",e);for(var f=d.getObject(),g=0;g<f.rows.length;g++)if(f.rows[g].id===c){f.rows[g].data[a]=e;break}d.gridObject.atualizaObject(f),o&&o(e,c,b,a)},x=function(){var c=this.getAttribute("data-id"),e=h[c],f=j.id,i=j.ordenacao;if("select"!==g[parseInt(c)]){if(f===c&&"ASC"===i?j.ordenacao="DESC":f===c&&"DESC"===i?j.ordenacao="ASC":(j.ordenacao="ASC",j.id=c),a("#ordenacao[data-id='"+c+"']")){var m=a("#ordenacao");m.className=j.ordenacao}else{if(f!==c&&f){var n=a("#ordenacao[data-id='"+f+"']"),o=n.parentNode;o.removeChild(n)}var p=b("div");p.className=j.ordenacao,p.id="ordenacao",p.setAttribute("data-id",c),this.childNodes[0].appendChild(p)}var q=y(d.getObject(),e,c);!k&&"ASC"===j.ordenacao||c!==f&&"ASC"===j.ordenacao?(k=q,d.gridCreate.refresh(k)):k&&"ASC"===j.ordenacao?d.gridCreate.refresh(k):!l&&"DESC"===j.ordenacao||c!==f&&"DESC"===j.ordenacao?(l=q,d.gridCreate.refresh(l)):l&&"DESC"===j.ordenacao&&d.gridCreate.refresh(l)}},y=function(a,b,c){return a.rows.sort(function(a,d){return"str"===b?z(a.data[c],d.data[c]):"flt"===b?A(a.data[c],d.data[c]):"int"===b?B(a.data[c],d.data[c]):void 0}),a},z=function(a,b){var c=a.toLowerCase(),d=b.toLowerCase();if("ASC"===j.ordenacao){if(d>c)return-1;if(c>d)return 1}else{if(d>c)return 1;if(c>d)return-1}return 0},A=function(a,b){return"ASC"===j.ordenacao?parseFloat(a)-parseFloat(b):parseFloat(b)-parseFloat(a)},B=function(a,b){return"ASC"===j.ordenacao?parseInt(a)-parseInt(b):parseInt(b)-parseInt(a)},C=function(a){var b="",c=!1,d=this.getAttribute("valor"),e=this.value,f=this.getAttribute("linha-id"),g=this.getAttribute("data-id"),h=this.getAttribute("coluna-id");a.preventDefault(),a.keyCode?13===a.keyCode?(this.onblur=null,b=e,this.parentNode.ondblclick=v,this.parentNode.innerHTML=b,c=!0):27===a.keyCode&&(this.onblur=null,b=d,this.parentNode.ondblclick=v,this.parentNode.innerHTML=b,c=!0):(b=e,this.parentNode.ondblclick=v,this.parentNode.innerHTML=b,c=!0),c&&b!==d&&n(d,b,g,f,h)},D={init:t,monitorDeEventos:u,getErrorCallback:q,ordenar:x,textfield:v,check:w};return D}function GridFilter(){var a,b,c,d=this,e={},f=[],g=[],h=[],i=[],j={rows:[]},k={};this.init=function(d,h,i,j,k,l){a=d,e=h,f=i,g=j,b=k,c=l},this.setColumsFilter=function(a){h=a},this.getColumsFilter=function(){return h},this.constructFilter=function(){var b=w("div");b.className="mw-filter",b.style.width=a.offsetWidth+"px",b.style.height="25px";var c=l(),d=m(c),e=o();b.appendChild(d),b.appendChild(e),a.appendChild(b)};var l=function(){return a.offsetWidth-225},m=function(a){var b=h.length,c=a/b;c>150&&(c=150);var d=w("div");d.className="mw-selects",d.style.width=a+"px";for(var e=0;b>e;e++){var g=w("div");g.className="mw-buttons",g.setAttribute("filtro-id",e),g.setAttribute("colum-id",h[e][1]),g.setAttribute("title",f[h[e][1]]),g.style.width=h[e][0].width?n(a,c,b,h[e][0].width):c+"px",g.onclick=h[e][0].event?q:p;var i=w("i");i.className="mw-icon",i.style.backgroundImage="url("+h[e][0].icon+")";var j=w("span");j.className="mw-text",j.style.width=h[e][0].width?parseInt(n(a,c,b,h[e][0].width))-40+"px":c-40+"px",j.innerHTML=h[e][0].title?h[e][0].title:f[h[e][1]],g.appendChild(i),g.appendChild(j),d.appendChild(g)}return d},n=function(a,b,c,d){for(var e=0,f=0;f<h.length;f++)h[f][0].width?"*"===h[f][0].width?e++:a-=h[f][0].width:a-=b;return"*"===d?a/e+"px":d+"px"},o=function(){var a=w("div");a.className="mw-search",a.style.width="225px";var b=w("input");b.className="mw-filter-input",b.type="text",c?b.onkeyup=s:(a.onclick=r,b.onkeyup=t);var d=w("div");return d.className="mw-filter-div",a.appendChild(b),a.appendChild(d),a},p=function(){var a=this.getAttribute("colum-id"),b=this.getAttribute("filtro-id");if(this.className+=" selected",k.columId){var c=this.parentNode.childNodes[k.filtroId];c.className=c.className.replace(" selected","")}v(".mw-filter-input").focus(),k.columId=a,k.filtroId=b},q=function(){var a=this.getAttribute("colum-id"),b=this.getAttribute("filtro-id");if(this.className+=" selected",k.columId){var c=this.parentNode.childNodes[k.filtroId];c&&(c.className=c.className.replace(" selected",""))}h[b][0].event(),k.columId=a,k.filtroId=b},r=function(){k.columId||d.forceFilterActive(0),v(".mw-filter-input").focus()};this.forceFilterActive=function(a){if(k.columId){var b=v(".mw-filter .mw-selects").childNodes[k.filtroId];b.className=b.className.replace(" selected","")}var c=v(".mw-selects").childNodes[a];c.className+=" selected";var d=c.getAttribute("colum-id"),e=c.getAttribute("filtro-id");k.columId=d,k.filtroId=e};var s=function(a){c(a.keyCode,this.value,a)},t=function(a){if(13!==a.keyCode){for(var c=e.rows.length,d=[],f=0;c>f;f++)d.push(e.rows[f].data[k.columId].toLowerCase());if(i=[],d.filter(u),i.length>0){var g=i.length;j.rows=[];for(var f=0;g>f;f++)j.rows.push(e.rows[i[f]]);b(j)}else b(e)}},u=function(a,b){var c,d,e;switch(g[k.columId]){case"str":c=v(".mw-filter-input").value.toLowerCase(),d=-1!==a.search(c);break;case"int":c=parseInt(v(".mw-filter-input").value),d=parseInt(a)===c,e=!c;break;case"flt":c=parseFloat(v(".mw-filter-input").value),d=parseFloat(a)===c,e=!c}return d?void i.push(b):e?void(i=[]):void 0};this.clearFilter=function(){var a=k,b=v(".mw-filter .mw-selects").childNodes[k.filtroId];return b&&(b.className=b.className.replace(" selected","")),j={},i=[],k={},v(".mw-filter-input").value="",a};var v=function(a){return document.querySelectorAll(a)[0]},w=function(a){return document.createElement(a)}}function GridMark(){var a,b,c,d,e,f,g,h,i,j,k,l,m=0,n=0,o=0,p=0,q=function(a){k=a},r=function(){return k},s=function(){return l?{linha:l,id:a('tr.mw-content-tr[linha-id="'+l+'"]').getAttribute("data-id")}:idioma.linhaSelecionada},t=function(k){d=k,c=k.element,e=k.getConstantes(),a=k.$,b=k.create,f=k.getLarguraColunas(),h=k.getColunasEventos(),g=k.getColunas(),i=k.getColunasTipo(),j=k.getColunasAlinhamento(),u()},u=function(){var b=a(".mw-content").offsetHeight,c=a(".mw-content table").offsetHeight,d=a(".mw-content table tr").offsetHeight,e=a(".mw-content table").childNodes.length;n=Math.floor(c/b),c/b>n&&(n+=1),o=Math.floor(e/n),e/n>o+.5&&(o+=1),p=o*d},v=function(){if(k){var b=a('tr.mw-content-tr[linha-id="'+k+'"]');b&&(b.className=b.className.replace(" select",""))}l=this.getAttribute("linha-id"),this.className+=" select",k=l,x("click")},w=function(b){if(k){var c=a('tr.mw-content-tr[linha-id="'+k+'"]');c&&(c.className=c.className.replace(" select",""))}l=b.getAttribute("linha-id"),b.className+=" select",k=l,x("keypress")},x=function(b){m=Math.floor(l/o),"keypress"===b&&(a(".mw-content").scrollTop=m*p)},y=function(a){38===a.keyCode?(a.preventDefault(),z(this)):40===a.keyCode&&(a.preventDefault(),A(this))},z=function(a){var b=a.childNodes[0];B(parseInt(l)-1,b)||w(b.childNodes[parseInt(l)-1])},A=function(a){var b=a.childNodes[0];B(parseInt(l)+1,b)||w(b.childNodes[parseInt(l)+1])},B=function(a,b){return 0>a?!0:a>parseInt(b.childNodes.length-1)?!0:!1},C={init:t,setLinhaAnterior:q,getLinhaAnterior:r,getRowSelect:s,selectRow:v,selecionaLinha:w,movimentLine:y,configPaginacao:u};return C}function GridObject(){var a,b,c,d,e,f=function(f){d=f,c=f.element,e=f.getConstantes(),a=f.$,b=f.create},g=function(a){for(var b=d.getObject(),c=b.rows.length,e=0,f=0;c>f;f++){var g=b.rows[f];if(parseInt(g.id)===a){e=f;break}}b.rows.splice(e,1),d.setObject(b),d.gridCreate.refresh(b),d.gridMark.configPaginacao()},h=function(a){d.gridCreate.refresh(a),d.gridMark.configPaginacao()},i={init:f,removeIdObject:g,atualizaObject:h};return i}function MaskInput(a,b){var c=a,d=b,e=function(){{var a=f(),b=g(a);h(a,b)}},f=function(){var a=c.length;d.maxLength=a;for(var b=[],e=0;a>e;e++)b.push(k(c[e]));return b},g=function(a){for(var b=a.length,d=[],e=0;b>e;e++)a[e].test(1)||a[e].test("A")||a[e].test("a")||d.push({pos:e,"char":c[e]});return d},h=function(a,b){for(var c=d.value,e=d.value,f=e.length,g=(a.length,b.length),h=0;f>h;h++)for(var k=0;g>k;k++)h===b[k].pos&&e[h]!==b[k].char&&(c=j(b[k].pos,c,b[k].char));for(var h=0;h<c.length;h++){var l=a[h].test(c[h]);l||(c=i(h,c))}d.value=c},i=function(a,b){return b=b.slice(0,a)},j=function(a,b,c){return b.slice(0,a)+c+b.slice(a)},k=function(a){for(var b=a.length,c="",d=1,e="",f=0;b>f;f++)c===a[f]?d++:(d>1?e+="{"+d+"})":1!==d||"A"!==c&&"a"!==c&&"?"!==c&&"9"!==c?1===d&&"*"===c&&(e+="+)"):e+=")",c=a[f],e+="9"===c?"([0-9]":"A"===c?"([A-Z]":"a"===c?"([a-z]":"?"===c?"([A-Za-z]":"*"===c?"([A-Za-z0-9]":" "===c?"\\s":"\\"+c,d=1),f===b-1&&d>1?e+="{"+d+"})":f!==b-1||"A"!==c&&"a"!==c&&"?"!==c&&"9"!==c||1!==d?f===b-1&&1===d&&"*"===c&&(e+="+)"):e+=")";return new RegExp("^"+e+"$")};e()}function MaskPadrao(a,b){var c=a,d=b,e=function(){var a;switch(c){case"9":a=new RegExp(/^[0-9]+$/);break;case"9.9":case"R$9.9":a=new RegExp(/^([^A-Za-z]+)$/);break;default:a=new RegExp(/.+/)}f(a,c)},f=function(a,b){var c=d.value;if("R$9.9"!==b){for(var e=0;e<d.value.length;e++){var f=a.test(c[e]);f||(c=c.slice(0,e))}d.value=c}else{c=c.replace(idioma.moeda,"");for(var e=0;e<c.length;e++){var f=a.test(c[e]);f||(c=c.slice(0,e))}d.value=idioma.moeda+c}};e()}