import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

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

  useEffect(()=>{ 
    //useEffect 안에 적는 코드들은 1.어려운 연산 2.서버에서 데이터 가져오는 작업 3. 타이머 장착하는 것
    console.log('안녕');
  })

  let[count, setCount] = useState(0)

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  });

  return (
    <div className='container'>
      {count}
      <button onClick={()=>{setCount(count+1)}}>버튼</button>
      {/*styled-components 사용 예시
      <Box>
      <YellowBtn bg='blue'>버튼</YellowBtn>
      <YellowBtn bg='orange'>버튼</YellowBtn>
      </Box> */}
      <div className='row'>
        <div className='col-md-6'>
          <img src='https://codingapple1.github.io/shop/shoes1.jpg' width='100%'/>
        </div>
        <div className='col-md-6'>
          <h4 className='pt-5'>{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className='btn btn-danger'>주문하기</button>
        </div>
      </div>
    </div>
  );
}
export default Detail;
