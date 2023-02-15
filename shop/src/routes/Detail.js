import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js';
import { addItem } from '../store.js';
import { useDispatch } from 'react-redux';

// styled-components 사용 예시
// let YellowBtn = styled.button`
//   background: ${props=>props.bg};
//   color: ${props=>props.bg=='blue'?'white':'black'};
//   padding: 10px;
// `

// let NewBtn = styled.button(YellowBtn)

// let Box = styled.div`
//   background: grey;
//   padding: 20px;
// `

function Detail(props) {

  let {재고, shoes} = useContext(Context1); //보관함 해체해주는 함수

  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [탭, 탭변경] = useState(0);
  let dispatch = useDispatch();

  //누가 Detail 페이지에 접속하면, 그 페이지에 보이는 상품id가져와서, localStorage에 watched 항목에 추가
  useEffect(()=>{
    let 꺼낸거 = localStorage.getItem('watched')
    꺼낸거 = JSON.parse(꺼낸거)
    꺼낸거.push(찾은상품.id) //array에 자료 추가하는 코드, 이미 있으면 push()하지마라
    꺼낸거 = new Set(꺼낸거) //이미 있으면 push()하지마라. set자료형은 중복 제거해줌
    꺼낸거 = Array.from(꺼낸거) // array -> Set -> array

    localStorage.setItem('watched', JSON.stringify(꺼낸거))
  },[])


  useEffect(() => {
    //useEffect 안에 적는 코드들은 1.어려운 연산 2.서버에서 데이터 가져오는 작업 3. 타이머 장착하는 것
    //타이머
    let a = setTimeout(() => {
      setAlert(false);
    }, 10000);
    return () => {
      //useEffect 동작 전에 실행되는 코드 ex)clean up function : 기존 타이머 지워주세요(재렌더링 시 비효율 줄이기위함)
      clearTimeout(a);
    };
  }, []);

  return (
    <div className='container'>
      {alert == true ? (
        <div className='alert alert-warning'> 2초이내 구매시 할인 </div>
      ) : null}

      {/* {재고[0]} *props전송없이도 App.js에 있던 state 잘나옴 확인 */}

      {/* {count}
      <button onClick={()=>{setCount(count+1)}}>버튼</button> */}

      {/*styled-components 사용 예시
      <Box>
      <YellowBtn bg='blue'>버튼</YellowBtn>
      <YellowBtn bg='orange'>버튼</YellowBtn>
      </Box> */}
      <div className='row'>
        <div className='col-md-6'>
          <img
            src='https://codingapple1.github.io/shop/shoes1.jpg'
            width='100%'
          />
        </div>
        <div className='col-md-6'>
          <h4 className='pt-5'>{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className='btn btn-danger' onClick={()=>{
            dispatch(addItem({ id: 찾은상품.id, name: 찾은상품.title, count: 찾은상품.count }))
          }}>주문하기</button>
        </div>
      </div>

      {/**defaultActiveKey='기본으로 눌려있을 버튼 */}
      <Nav variant='tabs' defaultActiveKey='link0'> 
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(0)}} eventKey='link0'>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(1)}} eventKey='link1'>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{탭변경(2)}} eventKey='link2'>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <TabContent shoes={props.shoes} 탭={탭}></TabContent>


    </div>
  );
}

function TabContent({탭, shoes}){ //(props) 대신 ({변수명}) 넣고, if(props.탭==0)대신, if(탭==0)넣어도됨

  let {재고} = useContext(Context1); //보관함 해체해주는 함수,Detail 뿐 아니라 그 자식들도 props 없이 사용 가능

  let [fade, setFade] = useState('');

  //state변경 때마다 end(애니메이션 효과 className) 부착
  useEffect(()=>{
    let a = setTimeout(()=>{setFade('end')},100)
    return()=>{
      clearTimeout(a)
      setFade('')
    }
  },[탭])

  // if(탭==0){
  //   return <div>내용0</div>
  // }
  // if(탭==1){
  //   return <div>내용1</div>
  // }
  // if(탭==2){
  //   return <div>내용2</div>
  // }

    //if문 대신 사용할 수 있는 코드
  return (<div className={'start ' + fade}>{[<div>{shoes[0].title}</div>,<div>{재고[1]}</div>,<div>내용2</div>][탭]}</div>) 
}

// function Detail(props) {
//   let [fade2, setFade2] = useState('')

//   useEffect(()=>{
//     setFade2('end')
//     return()=>{
//       setFade2('')
//     }
//   },[])
//   return ( <div className={'container start ' + fade2}></div>)
// }

export default Detail;
