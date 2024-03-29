// with es6
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import axios from 'axios';
import { linkFormatter, NumEscapes } from './utils.jsx';
import { Map, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import { circleMarker } from 'leaflet';
import Control from "react-leaflet-control";

function getStyle(feature, layer) {
	var escapeColor = '#cb2539';
	if(feature.properties.rating) {
		escapeColor = '#388ccd';
		if(feature.properties.rating >=4) {
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
			escape.name.map(n => '<b>' + n + '</b>').join('<br>') + '<br>' + 
				(escape.city || '-') + '<br>' + 
				'<a href="'+ (escape.webpage || '#') +'">'+ (escape.webpage || '-') +'</a>'
		);
}

function Escapes(props) {
	const { SearchBar } = Search;
	const columns = [{
		dataField: 'city',
		text: 'Población',
		headerStyle: {
		  width: '35%'
		},
		headerAlign: 'center',
		align: 'center',
		sort: true
	  }, {
		dataField: 'name',
		text: 'Escape',
		headerAlign: 'center',
		sort: true
	  }, {
		dataField: 'webpage',
		text: 'Web',
		formatter: linkFormatter,
		headerStyle: {
		  width: '50px'
		},
		headerAlign: 'center',
		align: 'center'
	  }];
	
	  const defaultSorted = [{
		dataField: 'city',
		order: 'asc'
	  },{
		dataField: 'name',
		order: 'asc'
	  }];

	const position = [41.394458,2.158904]; //bcn
  	return (
		<div>
			<h3>Buscador de Escapes</h3>
			<p>Aquí encontraréis todos los room escapes que tenemos localizados (<NumEscapes value={props.total} />). También podéis ver <a href="/links">otros listados</a>.</p>
				<Map center={position} zoom={12} maxZoom={18} style={{height:400}} >
					<TileLayer
						url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
						attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
						/>
					<GeoJSON data={props.locations} style={getStyle} pointToLayer={getPointToLayer} onEachFeature={bindPopupToFeature} />
					<Control position="bottomright">
						<ul className="legend">
							<li className="legendItem1"><i style={{ background: '#22ac1e' }}></i>Recomendados</li>
							<li className="legendItem2"><i style={{ background: '#388ccd' }}></i>Jugados</li>
							<li className="legendItem3"><i style={{ background: '#cb2539' }}></i>No Jugados</li>						
						</ul>
					</Control>
				</Map>
				<ToolkitProvider
					keyField='name'
					data={props.data}
					columns={columns}
					defaultSorted={defaultSorted}
					search
				>
					{
					props => (
						<div>
							{/* <h3>Buscar:</h3> */}
							<hr />
							<SearchBar { ...props.searchProps } placeholder="Buscar..." />
							<BootstrapTable { ...props.baseProps } />
						</div>
						)
					}
				</ToolkitProvider>
		</div>
  	);
}

// Get Escapes
axios.get('/data/escapes.json')
  .then(function (escape_response) {
	  	const activeEscapes = escape_response.data.filter(esc => esc.active)
	  	const escapesLocationByWebPage = activeEscapes
		  	.filter(esc => esc.location !== null)
		  	.reduce(function (r, a) {
			  	r[a.webpage] = r[a.webpage] || [];
			  	r[a.webpage].push(a);
			  	return r;
		  }, Object.create(null))

		const escapesLocation = []
		for (var webpage in escapesLocationByWebPage) {
			if (Object.prototype.hasOwnProperty.call(escapesLocationByWebPage, webpage)) {
				const webpageEscapes = escapesLocationByWebPage[webpage]
				const location = Object.assign({}, webpageEscapes[0].location)
				const maxRating = Math.max.apply(null, webpageEscapes.map(e => e.rating || -1))
				const escapeLoc = Object.assign(location, {
					properties: {
						city : webpageEscapes[0].city,
						name : webpageEscapes.map(e => e.name), //.join(','),
						webpage : webpage,
						rating : maxRating > 0 ? maxRating : null
					}
				})
				escapesLocation.push(escapeLoc)
			}
		}

		ReactDOM.render(
        <Escapes data={activeEscapes} total={activeEscapes.length} locations={escapesLocation}/>,
        document.getElementById('escapes')
        );
  })
  .catch(function (error) {
    console.log(error);
  });