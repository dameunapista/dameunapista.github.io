// with es6
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import BootstrapTable from 'react-bootstrap-table-next'
import axios from 'axios';
import {starsFormatter, linkFormatter, NumEscapes} from './utils.jsx';

function TopEscapes(props) {
  const columns = [{
    dataField: 'rating',
    text: 'Valoración',
    formatter: starsFormatter,
    headerStyle: {
      width: '110px'
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
    dataField: 'rating',
    order: 'desc'
  },{
    dataField: 'name',
    order: 'desc'
  }];
  return (
    <div>
			<h3>Top Escapes</h3>
			<p>Aquí encontraréis los room escapes que más nos han gustado, de entre los <NumEscapes value={props.total} /> que llevamos jugados ya!.</p>
      <BootstrapTable keyField='name' data={props.data} columns={columns} defaultSorted={defaultSorted} ></BootstrapTable>
    </div>
  );
}

// Get Top Escapes
axios.get('/data/escapes.json')
  .then(function (response) {

    const playedEscapes = response.data.filter(esc => esc.play_date !== "")
    
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