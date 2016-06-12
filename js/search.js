var feedGrabber = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&callback=?&q=',
	totalEscapes = 100,
	poblacion = 'A',
	nombre = 'B',
	web = 'C',
	juego = 'D',	
	publicar = 'E',	
	spreadsheet = [];
	
function row(cell) {
	return parseInt(cell.substr(1));
}

function col(cell) {
	return cell[0];
}
	
function parseRSS(data, firstRow) {
	console.log("parsing RSS");
	var entries = data.responseData.feed.entries,
		content,
		cell;

	for (var i=0; i<entries.length; ++i) {
		cell = entries[i].title;
		content = entries[i].content;
		switch (col(cell)) {
			case poblacion:
				spreadsheet.push({poblacion: content});
				spreadsheet[row(cell) - firstRow].poblacion = content;
				break;
			case nombre:
				spreadsheet[row(cell) - firstRow].nombre = content;
				break;
			case web:
				spreadsheet[row(cell) - firstRow].web = content;
				break;
			case juego:
				spreadsheet[row(cell) - firstRow].juego = content;
				break;
			case publicar:
				spreadsheet[row(cell) - firstRow].publicar = content;
				break;
			default:
				break;
		}
	}
	display();
}

function loadData(numRequest){
	var numColumns = 5;
	var maxCellsResults = 100; //default-max value
	var numRows = Math.ceil(maxCellsResults/numColumns);
	var totalNumRequests = Math.ceil(totalEscapes/numRows); //number of request necessary to get all Escapes
	var numRequest = numRequest || 0; //initial value
	//for (var numRequest=0; numRequest<totalNumRequests; numRequest++) {		
	if(numRequest < totalNumRequests){
		var gdocID = "1bKHe5wg1t_XXV4RTVw6QHlWmw1SsDfIM5evr207XP_U";
		var sheetPosition = 2; //second sheet
		var baseURL = "https://spreadsheets.google.com/feeds/cells/" + gdocID + "/" + sheetPosition + "/public/basic";
		var columnaInicial = "A";
		var columnaFinal = "E";
		var filaInicial = 2 + (numRows * numRequest); //+2 --> Excel Header
		var filaFinal = 1 + numRows + (numRows * numRequest); // +1 --> Excel Header
		var d = new Date();
		var URL = baseURL + "?range="+ columnaInicial + filaInicial +"%3A"+ columnaFinal + filaFinal +"&alt=rss&t="+d.getTime();
		console.log(URL);
		(function(numRequest) {
			console.log("grabbing rss");
			$.ajax({
				url: feedGrabber + encodeURIComponent(URL), 
				dataType: "json",
				success: function(data) {
					parseRSS(data, 2 + (numRows * numRequest));
					loadData(numRequest + 1); //recursive call for next block request
				}
			});
		})(numRequest);
	}
}

// display the officers
function display() {
	console.log(spreadsheet.length);
	for (var i=0; i<spreadsheet.length; i++) {
		var escape = spreadsheet[i];
		if (escape.nombre && escape.nombre !== '-' && escape.publicar !== 'no') {
			var escapeHTML = $('<tr id="escape'+i+'" class="escape"></tr>');
			escapeHTML.append('<td>'+escape.poblacion+'</td>');
			escapeHTML.append('<td>'+escape.nombre+'</td>');
			escapeHTML.append('<td>'+ (escape.juego || '-') +'</td>');
			escapeHTML.append('<td><a href="'+ (escape.web || '#') +'">'+ (escape.web || '-') +'</a></td>');
			$("#table1").find('tbody').append(escapeHTML);
		}
	}
	
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

