import {createWrapper} from 'next-redux-wrapper'
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas'


const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
    console.log(action);
    return next(action);
}

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware(); //  saga 설정 부분

    const middlewares = [sagaMiddleware, loggerMiddleware] // middleWares는 redux에 없던 기능을 추가해준다.

    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares)) // 개발용일 때

    const store = createStore(reducer, enhancer)
    // store.dispatch({   
    //     type : 'CHANGE_NICKNAME',
    //     data: 'wonny',})

    store.sagaTask = sagaMiddleware.run(rootSaga) // rootSaga는 파일명
    return store;
}  

const wrapper = createWrapper(configureStore,{debug: process.env.NODE_ENV === 'development',}); // debug 이 부분이 true이면 좀더 자세한 설명을 해주기 때문에 true로!

// configureStore : store를 생성한다.
// createWrapper : wrapper을 생성한다.



export default wrapper;