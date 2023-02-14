/*eslint-disable*/ //warning 메세지(lint) 끄는 기능
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/mainbg.jpg";
import { createContext, useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/Cart.js'

 export let Context1 = createContext(); //contextAPI사용하기 위한 셋팅(1):context(state보관함)를 만들어주는 역할

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [재고] = useState([10,11,12]); //Detail, TabContent에서 쓰고싶음(contextAPI연습)

  return (
    <div className='App'>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link> 
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
            <Nav.Link onClick={()=>{navigate(-1)}}>뒤로가기</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      

      {/* <Link to='/'>홈</Link>
      <Link to='/detail'>상세페이지</Link> */}


      <Routes>
        <Route
          path='/'
          element={
            <>
              <div
                className='main-bg'
                style={{ backgroundImage: "url(" + bg + ")" }}
              ></div>

              <div className='container'>
                <div className='row'>
                  {shoes.map(function (a, i) {
                    return(
                    <Card shoes={shoes[i]} i={i}></Card>)
                  })}
                </div>
              </div>
              <button onClick={()=>{
                // 로딩중UI 띄우기
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((결과)=>{console.log(결과.data);
                  let copy = [...shoes,...결과.data];
                  setShoes(copy);
                  // 로딩중 UI 숨기기
                })
                .catch(()=>{
                  // 로딩중 UI 숨기기
                  console.log('요청 실패');
                })
                //(참고)동시에 axios요청 여러개하려면
                // Promise.all([axios.get('/url1'), axios.get('/url2')]).then(()=>{
                  //2개의 요청 성공했을 시 실행되는 코드 작성
                // }) 
              }}>더보기</button>
            </>
          }
        />

        <Route path='*' element={<div>404페이지</div>} /> 

        <Route path='/detail/:id' element={
          <Context1.Provider value={{재고, shoes}}> {/*contextAPI사용하기 위한 셋팅(2)*/}
          <Detail shoes={shoes}></Detail>
          </Context1.Provider>
          } />

        <Route path='/about' element={<About></About>}>
          <Route path='member' element={<div>멤버임</div>}/>
          <Route path='location' element={<div>위치정보임</div>}/>
        </Route>

        <Route path='/cart' element={<Cart></Cart>}></Route>

      </Routes>

      {/* <div
        className='main-bg'
        style={{ backgroundImage: "url(" + bg + ")" }}
      ></div>

      <div className='container'>
        <div className='row'> */}
          {/* <Card shoes={shoes[0]} i={1}></Card>
          <Card shoes={shoes[1]} i={2}></Card>
          <Card shoes={shoes[2]} i={3}></Card> */}
          {/* {shoes.map(function (a, i) {
            return;
            <Card shoes={shoes[i]} i={i}></Card>;
          })}
        </div>
      </div> */}
    </div>
  );
}

function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={process.env.PUBLIC_URL + "/s" + (props.i + 1) + ".png"} width='80%'></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

export default App;
