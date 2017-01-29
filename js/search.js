function loadData(){
	//Init Map
	var mymap = L.map('mapid').setView([41.394458,2.158904], 12);

	var baseMaps = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);

	//From sample: http://leafletjs.com/examples/choropleth/
	var legend = L.control({position: 'bottomright'});
	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			colors = ['22ac1e','388ccd', 'cb2539'],
			labels = ['Recomendados', 'Jugados', 'No jugados'];

		// loop through our density intervals and generate a label with a colored square for each interval
		for (var i = 0; i < colors.length; i++) {
			div.innerHTML +=
				// '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
				'<i style="background:#'+ colors[i] +'"></i> ' + labels[i] + '<br>';
		}

		return div;
	};

	legend.addTo(mymap, baseMaps);	

	console.log("GET json data");
	$.ajax({
		url: "/data/escapes.json", 
		dataType: "json",
		success: function(data) {
			display(data, mymap);
		}
	});
}

// display escapes
function display(data, map, basemap) {
	console.log(data.length);

	//init markers arrays
	topEscapesMarkers = [];		
	playedEscapesMarkers = [];
	notPlayedEscapesMarkers = [];
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

		//add to the map
		if(escape.latitud) {
			var escapeIcon = redIcon;
			var escapeGroup = notPlayedEscapesMarkers;
			if(escape.valoracion) {
				escapeIcon = blueIcon;
				escapeGroup = playedEscapesMarkers;
				if(escape.valoracion >=4) {
					escapeIcon = greenIcon;
					escapeGroup = topEscapesMarkers;
				}
			}
			var marker = L.marker([escape.latitud, escape.longitud], { icon: escapeIcon }); //.addTo(map);
			marker.bindPopup(
				'<b>' + escape.sitio + '</b><br>' + 
				(escape.juego || '-') + '<br>' + 
				'<a href="'+ (escape.web || '#') +'">'+ (escape.web || '-') +'</a>'
			);
			escapeGroup.push(marker);
		}	
	}
	var topEscapes = L.layerGroup(topEscapesMarkers).addTo(map);
	var playedEscapes = L.layerGroup(playedEscapesMarkers).addTo(map);
	var notPlayedEscapes = L.layerGroup(notPlayedEscapesMarkers).addTo(map);
	var overlayMaps = {
		"Recomendados": topEscapes,	
		"Jugados": playedEscapes,
		"No jugados": notPlayedEscapes		
	};
	L.control.layers(basemap, overlayMaps).addTo(map);	

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
