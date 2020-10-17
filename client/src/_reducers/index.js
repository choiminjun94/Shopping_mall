import {combineReducers} from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({

    user,
})

export default rootReducer
// 다른 곳 에서도 사용 할수 있게

// combineReducers - store에 여러가지 reducer가 존재 할 수 잇다.
// 이렇때 Root Reducer에서 합쳐주게 도와 준다.