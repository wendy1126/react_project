/*eslint-disable*/ //warning 메세지(lint) 끄는 기능
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import bg from "./img/mainbg.jpg";
import { createContext, lazy, Suspense, useEffect, useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';
//필요해질때 import 해주세요(사이트발행할때도 별도의 js파일로 분리됨)
const Detail = lazy(() => import("./routes/Detail.js"));
const Cart = lazy(() => import("./routes/Cart.js"));

export let Context1 = createContext(); //contextAPI사용하기 위한 셋팅(1):context(state보관함)를 만들어주는 역할

function App() {
  //LocalStorage에 obj,array자료 저장하는 법(원래는 문자형만 저장가능)-JSON으로 변환해서 저장
  // let obj={name:'kim'}
  // localStorage.setItem('data',JSON.stringify(obj)) //JSON으로 변환하는 법
  // let 꺼낸거 = localStorage.getItem('data') //저장했던 자료 꺼내는 법
  // JSON.parse(꺼낸거) //JSON->array/object 변환방법
  // console.log(JSON.parse(꺼낸거).name); //JSON->array/object 변환방법 확인

  useEffect(() => {
    localStorage.getItem("watched", JSON.stringify([]));
  }, []);

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [재고] = useState([10, 11, 12]); //Detail, TabContent에서 쓰고싶음(contextAPI연습)

  let result = useQuery("작명", () => {
    return (
      axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
        console.log("요청됨");
        return a.data;
      }),
      { staleTime: 2000 }
    ); //refetch되는 간격 설정
  });

  result.data; //axios 요청 성공시 가져오는 데이터들
  result.isLoading; //axios 요청이 로딩 중일 때 true
  result.error; //axios 요청이 실패했을 때 true

  return (
    <div className='App'>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='#home'>ShoeShop</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate(-1);
              }}
            >
              뒤로가기
            </Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {/* {result.isLoading ? '로딩중' : result.data.name} *삼항연산자 이용하여 로딩중&데이터출력 */}
            {result.isLoading && "로딩중"}
            {result.error && "에러남"}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to='/'>홈</Link>
      <Link to='/detail'>상세페이지</Link> */}

      <Suspense fallback={<div>로딩중임</div>}>
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
                      return <Card shoes={shoes[i]} i={i}></Card>;
                    })}
                  </div>
                </div>
                <button
                  onClick={() => {
                    // 로딩중UI 띄우기
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((결과) => {
                        console.log(결과.data);
                        let copy = [...shoes, ...결과.data];
                        setShoes(copy);
                        // 로딩중 UI 숨기기
                      })
                      .catch(() => {
                        // 로딩중 UI 숨기기
                        console.log("요청 실패");
                      });
                    //(참고)동시에 axios요청 여러개하려면
                    // Promise.all([axios.get('/url1'), axios.get('/url2')]).then(()=>{
                    //2개의 요청 성공했을 시 실행되는 코드 작성
                    // })
                  }}
                >
                  더보기
                </button>
              </>
            }
          />

          <Route path='*' element={<div>404페이지</div>} />

          <Route
            path='/detail/:id'
            element={
              <Context1.Provider value={{ 재고, shoes }}>
                {" "}
                {/*contextAPI사용하기 위한 셋팅(2)*/}
                <Detail shoes={shoes}></Detail>
              </Context1.Provider>
            }
          />

          <Route path='/about' element={<About></About>}>
            <Route path='member' element={<div>멤버임</div>} />
            <Route path='location' element={<div>위치정보임</div>} />
          </Route>

          <Route path='/cart' element={<Cart></Cart>}></Route>
        </Routes>
      </Suspense>

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
      <img
        src={process.env.PUBLIC_URL + "/s" + (props.i + 1) + ".png"}
        width='80%'
      ></img>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
