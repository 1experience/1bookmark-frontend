import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import SearchAutosuggest from './components/SearchAutosuggest'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Form onSubmit={e => {
            e.preventDefault();
          }}>
            <Row>
              <Col><SearchAutosuggest/></Col>
            </Row>
          </Form>
        </Container>
      </header>
    </div>
  );
}

export default App;
