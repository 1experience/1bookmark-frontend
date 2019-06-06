import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Form>
            <Row>
              <Col><Form.Control size="lg" type="text" placeholder="Search"/></Col>
            </Row>
          </Form>
        </Container>
      </header>
    </div>
  );
}

export default App;
