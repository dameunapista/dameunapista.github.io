// Convert csv list to md documents

const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
const os = require("os")
const results = [];

const textToLine = (text) => text + os.EOL
const metadataSeparator = () => textToLine('---')
const metadataNumberField = (key, value) => textToLine(`${key}: ${value.replace(',','.')}`)
const metadataTextField = (key, value) => textToLine(`${key}: "${value}"`)
const metadataField = (key, value) => textToLine(`${key}: ${value}`)

fs.createReadStream(path.join(__dirname,'..','data','escapes.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    // console.log(results);
    results.map(escape => {
        const filename = (escape.sitio + (escape.juego.length>0? '-' + escape.juego : ''))
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")  // remove accents
            .replace(/\s+/g, '-')  // whitespaces --> '-'
            .replace(/(:|"|'|\.)/g, '')  // remove special characters
            .toLowerCase()
        
        if(filename) {
            console.log("Writing file..." + filename)
            const filepath = path.join(__dirname,'..','_escapes',filename + '.md')
            var logger = fs.createWriteStream(filepath, {
                // flags: 'a' // 'a' means appending (old data will be preserved)
            })
            // FIX escape.juego
            escape.juego = escape.juego.replace(/\"/g, '')
              
            logger.write(metadataSeparator()) // begin metadata
            // legacy fields
            logger.write(metadataTextField('poblacion', escape.poblacion)) 
            logger.write(metadataTextField('sitio', escape.sitio)) 
            logger.write(metadataTextField('web', escape.web)) 
            logger.write(metadataTextField('juego', escape.juego)) 
            logger.write(metadataTextField('tematica', escape.tematica)) 
            logger.write(metadataNumberField('max_jugadores', escape.max_jugadores)) 
            logger.write(metadataNumberField('latitud', escape.latitud)) 
            logger.write(metadataNumberField('longitud', escape.longitud)) 
            logger.write(metadataTextField('publicar', escape.publicar)) 
            logger.write(metadataTextField('fecha', escape.fecha)) 
            logger.write(metadataTextField('jugadores', escape.jugadores)) 
            logger.write(metadataNumberField('valoracion', escape.valoracion)) 
            logger.write(metadataTextField('foto', escape.foto)) 
            // new fields:
            const nameID = (escape.sitio + (escape.juego.length>0? '-' + escape.juego : ''))
            logger.write(metadataTextField('name', nameID))  // Unique name ID
            const location = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [escape.latitud, escape.longitud]
                }
            }
            logger.write(metadataTextField('webpage', escape.web))  //webpage
            logger.write(metadataTextField('city', escape.poblacion)) //city
            logger.write(metadataTextField('location', JSON.stringify(location).replace(/\"/g,'\\"')))  //location map
            logger.write(metadataField('active', escape.publicar==="si")) //active, open
            logger.write(metadataTextField('play_date', escape.fecha)) //play date
            
            logger.write(metadataSeparator()) // end metadata
        
            logger.end()
        }
    })
  });