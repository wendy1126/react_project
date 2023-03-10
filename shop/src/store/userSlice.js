import { createSlice } from "@reduxjs/toolkit";



//redux store에 state 보관하는 법, state하나를 slice라고 부름
let user = createSlice({
  name: "user",
  initialState: { name: "kim", age: 20 }, //*state가 object나 array 자료인 경우
  //redux의 state 변경하는 법 :1.state수정해주는 함수 만들고 2.원할때 그 함수 실행해달라고 store.js에 요청
  reducers: {
    changeName(state) {
      //redux의 state 변경(1)state변경해주는 함수 만들기
      //*state가 object나 array 자료인 경우,return {name:'park', age:20}도 가능하지만, 아래 코드처럼 직접 수정도 가능
      state.name = "park";
    },
    increase(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeName, increase } = user.actions //redux의 state 변경(2)export

export default user

