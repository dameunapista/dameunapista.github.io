// with es6
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactBsTable, {BootstrapTable, TableHeaderColumn}  from 'react-bootstrap-table';
import axios from 'axios';
import ReactStars from 'react-stars';
//import Link from './link.jsx';
import FaExternalLink from 'react-icons/lib/fa/external-link';

// Get Top Escapes
axios.get('/data/top.json')
  .then(function (response) {
    console.log(response);

    function starsFormatter(cell, row){
      return <ReactStars value={cell} count="5" edit="false"/>;
    }

    function linkFormatter(cell, row){
      return <a href={cell}><FaExternalLink color="black" size="16" /></a>
    }

    //filter top escapes (valoracion>=4)
    var top_escapes = response.data.filter( escape => escape.valoracion>=4);

    ReactDOM.render(
        <BootstrapTable data={top_escapes} options={ {defaultSortName: 'valoracion', defaultSortOrder: 'desc'} }>
            <TableHeaderColumn dataField='valoracion' dataFormat={starsFormatter} width='90' tdStyle={ { textAlign: 'center' } } >Valoración</TableHeaderColumn>
            <TableHeaderColumn isKey dataField='sitio'>Sitio</TableHeaderColumn>
            <TableHeaderColumn dataField='juego'>Juego</TableHeaderColumn>
            <TableHeaderColumn dataField='web' dataFormat={linkFormatter}  width="50" tdStyle={ { textAlign: 'center' } } >Web</TableHeaderColumn>
        </BootstrapTable>,
        document.getElementById('top')
        );
  })
  .catch(function (error) {
    console.log(error);
  });

/*var products = [{
      id: 1,
      name: "Product1",
      price: 120
  }, {
      id: 2,
      name: "Product2",
      price: 80
  }];

ReactDOM.render(
  <BootstrapTable data={products} hover>
      <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
      <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
      <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
  </BootstrapTable>,
  document.getElementById('top')
);*/

/*

<!--div class="wrap">
			<div class="container">
				<h3>Top Escapes</h3>
				<p>Aquí encontraréis los room escapes que más nos han gustado, de entre los <label id="lblNumEscapes">0</label> que llevamos jugados ya!.
				<table id="table1" class="table">
					<thead>
					  <tr>
						<th>Puntuación</th>
						<th>Escape</th>
						<th>Juego</th>
						<th>Web</th>
					  </tr>
					</thead>
					<tbody id="table_rows">
					</tbody>
				</table>
			</div>
		</div-->

*/