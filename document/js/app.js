var buscaPaginas = function() {
	var endereco = location.href.split('#')[1];
	if(!endereco) {
		return;
	}

	endereco = endereco.replace('-', '/') + '.html';
	var url = BASE_URL + endereco;
	
	$.post(url, function(resp) {
		$('#localPagina').html(resp);
	});
};

window.onload = function() {
	buscaPaginas();
};

window.onpopstate = buscaPaginas;