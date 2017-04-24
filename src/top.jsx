// with es6
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactBsTable, {BootstrapTable, TableHeaderColumn}  from 'react-bootstrap-table';
import axios from 'axios';
import {starsFormatter, linkFormatter, NumEscapes} from './utils.jsx';

function TopEscapes(props) {
  let tableOptions = {
    defaultSortName: 'valoracion',
    defaultSortOrder: 'desc'
  };
  return (
    <div>
			<h3>Top Escapes</h3>
			<p>Aquí encontraréis los room escapes que más nos han gustado, de entre los <NumEscapes value={props.total} /> que llevamos jugados ya!.</p>
      <BootstrapTable data={props.data} options={ tableOptions }>
        <TableHeaderColumn dataField='valoracion' dataFormat={starsFormatter} width='90' tdStyle={ { textAlign: 'center' } } >Valoración</TableHeaderColumn>
        <TableHeaderColumn isKey dataField='sitio'>Sitio</TableHeaderColumn>
        <TableHeaderColumn dataField='juego'>Juego</TableHeaderColumn>
        <TableHeaderColumn dataField='web' dataFormat={linkFormatter}  width="50" tdStyle={ { textAlign: 'center' } } >Web</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

// Get Top Escapes
axios.get('/data/top.json')
  .then(function (response) {

    //filter top escapes (valoracion>=4)
    var top_escapes = response.data.filter( escape => escape.valoracion>=4);
    
    ReactDOM.render(
        <TopEscapes data={top_escapes} total={response.data.length}/>,
        document.getElementById('top')
        );
  })
  .catch(function (error) {
    console.log(error);
  });