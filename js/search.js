var feedGrabber = 'https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&callback=?&q=',
	numEscapes = 200,
	poblacion = 'A',
	nombre = 'B',
	web = 'C',
	juego = 'D',	
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

	for (var i=0; i<entries.length; i++) {
		cell = entries[i].title;
		content = entries[i].content;
		switch (col(cell)) {
			case poblacion:
				spreadsheet.push({poblacion: content});
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
			default:
				break;
		}
	}
	display();
}

/* left out because getting the RSS feed for a single cell is slow for some reason.
number of officers must be hardcoded above.

// get numOfficers from the spreadsheet
console.log("getting numofficers");
$.ajax({
	url: feedGrabber + encodeURIComponent("https://spreadsheets.google.com/feeds/cells/0Agpa_QVONL1sdEotdUR5Ui1ZWUVyTXdHNm4xaGtZZnc/od6/public/basic?range=E1%3AE1&alt=rss"), 
	dataType: "json", 
	success: function(data) {
		console.log("got numofficers");
		numOfficers = parseInt(data.responseData.feed.entries[0].content);
		// grab the RSS feed, multiple times if >47 officers
		for (var i=0; i<Math.ceil(numOfficers/47); ++i) {
			var URL = "https://spreadsheets.google.com/feeds/cells/0Agpa_QVONL1sdEotdUR5Ui1ZWUVyTXdHNm4xaGtZZnc/od6/public/basic?range=A"+(3+47*i)+"%3AC"+(49+47*i)+"&alt=rss";
			
			(function(i) {
				console.log("grabbing rss");
				$.ajax({
					url: feedGrabber + encodeURIComponent(URL), 
					dataType: "json",
					success: function(data) {
						parseRSS(data, 3+47*i);
					}
				});
			})(i);
		}
	}
});
*/

function loadData(){
	// grab the RSS feed, multiple times if >47 officers
	var numRows = 100;
	var numColumns = 4;
	var maxCellsResults = 100; //default-max value
	//TODO: calculate num calls necessary (100 cells each request)
	var i=0;
	//for (var i=0; i<Math.ceil(numEscapes/47); ++i) {		
		//var URL = "https://spreadsheets.google.com/feeds/cells/0Agpa_QVONL1sdEotdUR5Ui1ZWUVyTXdHNm4xaGtZZnc/od6/public/basic?range=A"+(3+47*i)+"%3AC"+(49+47*i)+"&alt=rss";
		var gdocID = "1bKHe5wg1t_XXV4RTVw6QHlWmw1SsDfIM5evr207XP_U";
		var baseURL = "https://spreadsheets.google.com/feeds/cells/" + gdocID + "/od6/public/basic";
		var columnaInicial = "A";
		var columnaFinal = "D";
		var URL = baseURL + "?range="+ columnaInicial +(2+47*i)+"%3A"+ columnaFinal +(49+47*i)+"&alt=rss";
		
		(function(i) {
			console.log("grabbing rss");
			$.ajax({
				url: feedGrabber + encodeURIComponent(URL), 
				dataType: "json",
				success: function(data) {
					parseRSS(data, 2+47*i);
				}
			});
		})(i);
	//}
}

// display the officers
function display() {
	console.log(spreadsheet.length);
	for (var i=0; i<spreadsheet.length; i++) {
		var escape = spreadsheet[i];
		if (escape.nombre) {
			/*var personHTML = $('<div class="person" id="'+person.name+'"></div>');
			$('#people').append(personHTML);
			$(personHTML).append('<div class="personimage" style="background-image: url(\''+person.imgURL+'\');"></div>');
			$(personHTML).append('<div class="persontitle">'+person.name+'</div>');
			$(personHTML).append('<div class="personarea">'+person.area+'</div>');*/
			//var escapeHTML = $('<tr><td>'+escape.nombre+'</td><td/><td/><td/></tr>');
			var escapeHTML = $('<tr id="escape'+i+'"></tr>');
			escapeHTML.append('<td>'+escape.poblacion+'</td>');
			escapeHTML.append('<td>'+escape.nombre+'</td>');
			escapeHTML.append('<td>'+ (escape.juego || '-') +'</td>');
			escapeHTML.append('<td><a href="#">'+ (escape.web || '-') +'</a></td>');
			$("#table1").find('tbody').append(escapeHTML);
		}
	}
	
	$('.filter').change(function() {
		var key = $(this).val();
		if (key) {
			$('#people').find('div:not(:Contains(' +key+ '))').parent().hide();
			$('#people').find('div:Contains('+key+')').parent().show();
		}
		else {
			$('.person').show();
		}
	}).keyup(function() {
		$(this).change();
	});
}

$.expr[':'].Contains = function(a, i, m){
    return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
};

