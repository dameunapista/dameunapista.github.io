var gsjson = require('google-spreadsheet-to-json');
var jsonfile = require('jsonfile');

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
	})
	jsonfile.writeFile('escapes.json', escapes, function (err) {
		if (err) console.error(err);
	});

	//Top Escapes
	var top = result.filter(function(escape){
		return escape.valoracion; //solo los que tienen valoracion
	})
	.sort(function(a, b){
	    return b.valoracion - a.valoracion; //order desc
	});
	jsonfile.writeFile('top.json', top, function (err) {
		if (err) console.error(err);
	});
})
.catch(function(err) {
	if(err) {
	    console.log(err.message);
    	console.log(err.stack);
	}
});