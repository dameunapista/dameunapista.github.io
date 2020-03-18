// with es6
import React from 'react'
import ReactDOM from 'react-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import {starsFormatter, linkFormatter, NumEscapes} from './utils.jsx'

function EscapesList(props) {
  let tableOptions = {
    defaultSortName: 'rating',
    defaultSortOrder: 'desc'
  };
  return (
    <div>
			<h3>Lista de Jugados</h3>
			<p>Aquí encontraréis los <NumEscapes value={props.total} /> que llevamos jugados ya!</p>
      <Container>
        <Row>
            <Col sm={8}><Button variant="primary">sm=8</Button></Col>
            <Col sm={4}><Button variant="primary">sm=4</Button></Col>
        </Row>
        <Row>
            <Col sm={4}><Button variant="primary">sm=4</Button></Col>
            <Col sm={4}><Button variant="primary">sm=4</Button></Col>
            <Col sm={4}>sm=4</Col>
        </Row>
      </Container>
    </div>
  )
}

// Get Top Escapes
axios.get('/data/escapes.json')
  .then(function (response) {

    const playedEscapes = response.data.filter(esc => esc.active && esc.play_date !== "")
    
    var top_escapes = playedEscapes
      .filter( escape => escape.rating>=4) //filter top escapes (valoracion>=4)
      .map( escape => Object.assign(escape, { rating: escape.rating - 2}))  // based on 3 stars max. (5-->3, 4-->2)
    
    ReactDOM.render(
        <EscapesList data={top_escapes} total={playedEscapes.length}/>,
        document.getElementById('played')
        )
  })
  .catch(function (error) {
    console.log(error);
  })