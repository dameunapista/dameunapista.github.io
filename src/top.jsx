// with es6
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import ReactBsTable, {BootstrapTable, TableHeaderColumn}  from 'react-bootstrap-table';
import axios from 'axios';
import {starsFormatter, linkFormatter, NumEscapes} from './utils.jsx';

function TopEscapes(props) {
  let tableOptions = {
    defaultSortName: 'rating',
    defaultSortOrder: 'desc'
  };
  return (
    <div>
			<h3>Top Escapes</h3>
			<p>Aquí encontraréis los room escapes que más nos han gustado, de entre los <NumEscapes value={props.total} /> que llevamos jugados ya!.</p>
      <BootstrapTable data={props.data} options={ tableOptions }>
        <TableHeaderColumn dataField='rating' dataAlign='center' dataFormat={starsFormatter} width='70' tdStyle={{ textAlign: 'center' }} >Valoración</TableHeaderColumn>
        <TableHeaderColumn isKey dataField='name'>Escape</TableHeaderColumn>
        <TableHeaderColumn dataField='webpage' dataFormat={linkFormatter}  width="10%" tdStyle={{ textAlign: 'center' }} >Web</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
}

// Get Top Escapes
axios.get('/data/escapes.json')
  .then(function (response) {

    const playedEscapes = response.data.filter(esc => esc.active && esc.play_date !== "")
    
    var top_escapes = playedEscapes
      .filter( escape => escape.rating>=4) //filter top escapes (valoracion>=4)
      .map( escape => Object.assign(escape, { rating: escape.rating - 2}))  // based on 3 stars max. (5-->3, 4-->2)
    
    ReactDOM.render(
        <TopEscapes data={top_escapes} total={playedEscapes.length}/>,
        document.getElementById('top')
        );
  })
  .catch(function (error) {
    console.log(error);
  });