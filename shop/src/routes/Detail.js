import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {Nav} from 'react-bootstrap';

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
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id;
  });

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [탭, 탭변경] = useState(0);


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
          <button className='btn btn-danger'>주문하기</button>
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
  return (<div className={'start ' + fade}>{[<div>{shoes[0].title}</div>,<div>내용1</div>,<div>내용2</div>][탭]}</div>) 
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
