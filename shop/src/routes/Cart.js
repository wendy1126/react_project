import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from './../store/userSlice.js';

function Cart() {
  //Redux store 가져와줌, (state)=>{return state} 안의 state는 store안의 모든 state를 뜻함. 어떤 state만 쓸지 적을 수 있음->(state)=>{return state.user}
  let state = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch(); //store.js로 요청보내주는 함수임

  console.log(state.cart[0].name);

  return (
    <div>
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
              <td>1</td>
              <td>{state.cart[i].name}</td>
              <td>{state.cart[i].count}</td>
              <td><button onClick={()=>{
                dispatch(changeName()) //redux의 state 변경(3)dispatch(state변경함수())
              }}>+</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
