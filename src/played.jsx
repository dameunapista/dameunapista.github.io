// with es6
import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, CardDeck, Card } from 'react-bootstrap'
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
        {/* <Row>
            <Col sm={8}><Button variant="primary">sm=8</Button></Col>
            <Col sm={4}><Button variant="primary">sm=4</Button></Col>
        </Row>
        <Row>
            <Col sm={4}><Button variant="primary">sm=4</Button></Col>
            <Col sm={4}><Button variant="primary">sm=4</Button></Col>
            <Col sm={4}>sm=4</Col>
        </Row> */}
        <Row>
          <Col>
          <CardDeck>
            <Card>
              <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22331%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20331%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_170eee93a01%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_170eee93a01%22%3E%3Crect%20width%3D%22331%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22121.328125%22%20y%3D%2287.8%22%3E331x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22331%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20331%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_170eee93a01%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_170eee93a01%22%3E%3Crect%20width%3D%22331%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22121.328125%22%20y%3D%2287.8%22%3E331x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to additional
                  content.{' '}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22331%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20331%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_170eee93a01%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_170eee93a01%22%3E%3Crect%20width%3D%22331%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22121.328125%22%20y%3D%2287.8%22%3E331x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural lead-in to
                  additional content. This card has even longer content than the first to
                  show that equal height action.
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Last updated 3 mins ago</small>
              </Card.Footer>
            </Card>
          </CardDeck>
          </Col>
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