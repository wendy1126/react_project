/*eslint-disable*/ //warning 메세지(lint) 끄는 기능
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/mainbg.jpg";
import { useState } from 'react';
import data from './data.js';


function App() {

  let [shoes] = useState(data);  

  return (
    <div className='App'>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#features'>Cart</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div
        className='main-bg' style={{ backgroundImage: "url(" + bg + ")" }}></div>

      <div className='container'>
        <div className='row'>

          {/* <Card shoes={shoes[0]} i={1}></Card>
          <Card shoes={shoes[1]} i={2}></Card>
          <Card shoes={shoes[2]} i={3}></Card> */}
          {
            shoes.map(function(a,i){
              return (
                <Card shoes={shoes[i]} i={i}></Card>
              )
            })
          }

        </div>
      </div>
    </div>
  );
}

function Card(props){
  return (
    <div className='col-md-4'>
      <img src={process.env.PUBLIC_URL +'/s'+(props.i+1)+'.png'} width='80%'></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
