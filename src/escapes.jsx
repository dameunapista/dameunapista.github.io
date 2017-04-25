// with es6
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactBsTable, {BootstrapTable, TableHeaderColumn}  from 'react-bootstrap-table';
import axios from 'axios';
import { linkFormatter, NumEscapes } from './utils.jsx';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { circleMarker } from 'leaflet';
import LegendControl from './leaflet-legend.jsx';

function getStyle(feature, layer) {
	var escapeColor = '#cb2539';
	if(feature.properties.valoracion) {
		escapeColor = '#388ccd';
		if(feature.properties.valoracion >=4) {
			escapeColor = '#22ac1e';
		}
	}
	return {
		color: escapeColor,
		weight: 5,
		opacity: 0.65
	}
}

function getPointToLayer(feature, latlng) { 
	//convertim a la representacio que vulguem
	return circleMarker(latlng, {radius: 7, fillOpacity: 0.85});
}

function bindPopupToFeature(feature, layer) {
		var escape = feature.properties;
		layer.bindPopup(
			'<b>' + escape.sitio + '</b><br>' + 
				(escape.juego || '-') + '<br>' + 
				'<a href="'+ (escape.web || '#') +'">'+ (escape.web || '-') +'</a>'
		);
}

function Escapes(props) {
	let tableOptions = {
		defaultSortName:['juego', 'sitio', 'poblacion'], 
		defaultSortOrder:['asc', 'asc','asc']
	};

	const position = [41.394458,2.158904]; //bcn
  return (
    <div>
      <h3>Buscador de Escapes</h3>
      <p>Aquí encontraréis todos los room escapes que tenemos localizados (<NumEscapes value={props.total} />). También podéis ver <a href="/links">otros listados</a>.</p>
			<Map center={position} zoom={12} maxZoom={18} style={{height:400}} >
				<TileLayer
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>
				<GeoJSON data={props.locations} style={getStyle} pointToLayer={getPointToLayer} onEachFeature={bindPopupToFeature} />
				<LegendControl className="supportLegend">
					<ul className="legend">
						<li className="legendItem1"><i style={{ background: '#22ac1e' }}></i>Recomendados</li>
						<li className="legendItem2"><i style={{ background: '#388ccd' }}></i>Jugados</li>
						<li className="legendItem3"><i style={{ background: '#cb2539' }}></i>No Jugados</li>						
					</ul>
				</LegendControl>
			</Map>
      <BootstrapTable data={props.data} options={ tableOptions } multiColumnSort={ 3 } search searchPlaceholder='Buscar...'>
        <TableHeaderColumn dataField='poblacion' dataSort={ true }>Población</TableHeaderColumn>
        <TableHeaderColumn isKey dataField='sitio' dataSort={ true } /*filter={ { type: 'TextFilter', delay: 1000 } }*/>Sitio</TableHeaderColumn>
        <TableHeaderColumn dataField='juego' dataSort={ true }>Juego</TableHeaderColumn>
        <TableHeaderColumn dataField='web' dataFormat={linkFormatter}  width="50" tdStyle={ { textAlign: 'center' } } >Web</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

// Get Escapes
axios.get('/data/escapes.json')
  .then(function (escape_response) {
		// Get Escapes Location
		axios.get('/data/escapes_location.json')
			.then(function (locations_response) {

    	ReactDOM.render(
        <Escapes data={escape_response.data} total={escape_response.data.length} locations={locations_response.data}/>,
        document.getElementById('escapes')
        );
		})
		.catch(function (error) {
			console.log(error);
		});
  })
  .catch(function (error) {
    console.log(error);
  });