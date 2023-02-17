import { memo, useState } from 'react';
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCount } from './../store.js';
import { changeName, increase } from './../store/userSlice.js';

//memo의 원리
//props가 변할 때만 재렌더링해줌(props가 길고 복잡하면 손해임)->꼭 필요한 무거운 컴포넌트에만 필요함
let Child = memo( function(){ //자식 컴포넌트 재렌더링 막기, memo:꼭 필요할 때만 재렌더링해주세요
  console.log('재렌더링됨');
  return <div>자식임</div>
})

function Cart() {
  //Redux store 가져와줌, (state)=>{return state} 안의 state는 store안의 모든 state를 뜻함. 어떤 state만 쓸지 적을 수 있음->(state)=>{return state.user}
  let state = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch(); //store.js로 요청보내주는 함수임
  let [count,setCount] = useState(0)
  //let result = useMemo(()=>{return 복잡한함수()},[state]) : useMemo->컴포넌트 렌더링시 1회만 실행해줌, useEffect와 비교점 : useEffect는 html실행 다 끝나면 실행됨, useMemo는 렌더링 될 때 같이 실행됨(실행시점차이)

  console.log(state.cart[0].name);

  return (
    <div>
        <Child count={count}></Child> {/**Cart컴포넌트 재렌더링 시 자식들도 전부 재렌더링됨 */}
        <button onClick={()=>setCount(count+1)}>count state +1 변경 Cart컴포넌트 재렌더링</button>
        <h6>{state.user.name} {state.user.age}의 장바구니</h6>
        <button onClick={()=>{dispatch(increase(100))}}>버튼</button>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => (
            <tr key={i}>
              <td>{state.cart[i].id}</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td><button onClick={()=>{
                // dispatch(changeName()) //redux의 state 변경(3)dispatch(state변경함수())
                dispatch(addCount(state.cart[i].id)) //버튼 옆의 id를 state 변경함수로 전송-payload와 같은 id 가진 상품 찾아서 +1 시켜줌
              }}>+</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
