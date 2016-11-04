function loadData(){
	console.log("GET json data");
	$.ajax({
		url: "/data/escapes.json", 
		dataType: "json",
		success: function(data) {
			display(data);
		}
	});
}

// display escapes
function display(data) {
	console.log(data.length);
	for (var i=0; i<data.length; i++) {
		var escape = data[i];
		if (escape.sitio && escape.sitio !== '-' && escape.publicar !== 'no') {
			var escapeHTML = $('<tr id="escape'+i+'" class="escape"></tr>');
			escapeHTML.append('<td>'+escape.poblacion+'</td>');
			escapeHTML.append('<td>'+escape.sitio+'</td>');
			escapeHTML.append('<td>'+ (escape.juego || '-') +'</td>');
			escapeHTML.append('<td><a href="'+ (escape.web || '#') +'">'+ (escape.web || '-') +'</a></td>');
			$("#table1").find('tbody').append(escapeHTML);
		}
	}
	//update num total escapes
	$('#lblNumEscapes').text(data.length);

	
	$('#filter1').change(function() {
		var key = $(this).val();
		if (key) {
			$('#table_rows').find('td:not(:Contains(' +key+ '))').parent().hide();
			$('#table_rows').find('td:Contains('+key+')').parent().show();
		}
		else {
			$('.escape').show();
		}
	}).keyup(function() {
		$(this).change();
	});
}

$.expr[':'].Contains = function(a, i, m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

