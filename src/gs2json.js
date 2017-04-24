var gsjson = require('google-spreadsheet-to-json');
var jsonfile = require('jsonfile');
var path = require('path');
var groupBy = require('json-groupby');
var GeoJSON = require('geojson');

jsonfile.spaces = 4 //format json output

//Escapes
gsjson({
    spreadsheetId: '1bKHe5wg1t_XXV4RTVw6QHlWmw1SsDfIM5evr207XP_U',
    worksheet: 0,
    beautify: true
})
.then(function(result) {
    /*console.log(result.length);
    console.log(result);*/
    var escapes = result.filter(function(escape){
		return (escape.publicar === "si");
	});
	
	jsonfile.writeFile(path.join(process.cwd(),'data', 'escapes.json'), escapes, function (err) {
		if (err) console.error(err);
	});

	//Top Escapes
	var top = result.filter(function(escape){
		return escape.valoracion; //solo los que tienen valoracion
	})
	.sort(function(a, b){
	    return b.valoracion - a.valoracion; //order desc
	});
	
	jsonfile.writeFile(path.join(process.cwd(),'data','top.json'), top, function (err) {
		if (err) console.error(err);
	});

	//GeoJSON data for maps
	var escapes_location = escapes.filter(function(escape){
		return (escape.latitud !== undefined) && (escape.longitud !== undefined);
	});

	var escapes_by_site = escapes_location.map(function(escape){
		if (escape.juego === undefined) escape.juego = "";
		if (escape.web === undefined) escape.web = "";
		if (escape.valoracion === undefined) escape.valoracion = "";
		return escape;
	});

	//Agrupamos los juegos del mismo escape
	var escapes_by_site = groupBy(escapes_by_site, ['sitio'], ['juego', 'latitud', 'longitud', 'web', 'valoracion']);

	escapes_location = [];
	for (var key in escapes_by_site) {
		var escape = {};
		escape.sitio = key;
		escape.juego = escapes_by_site[escape.sitio].juego;
		escape.web = escapes_by_site[escape.sitio].web[0];
		escape.valoracion = escapes_by_site[escape.sitio].valoracion[0];
		escape.latitud = escapes_by_site[escape.sitio].latitud[0];
		escape.longitud = escapes_by_site[escape.sitio].longitud[0];
		escapes_location.push(escape);
	}
	
	escapes_location = GeoJSON.parse(escapes_location, {Point: ['latitud', 'longitud']});

	jsonfile.writeFile(path.join(process.cwd(),'data', 'escapes_location.json'), escapes_location, function (err) {
		if (err) console.error(err);
	});

})
.catch(function(err) {
	if(err) {
	    console.log(err.message);
    	console.log(err.stack);
	}
});