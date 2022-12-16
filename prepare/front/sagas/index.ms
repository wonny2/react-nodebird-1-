import {all, fork, put, call, takeEvery, takeLatest, throttle, delay} from 'redux-saga/effects'
import axios from 'axios'


// 여기는 saga를 적은 것!
// 길어지니까 saga를 분리했다!

// function뒤에 *이 붙어있다. = generator, 중단점이 있는 함수
export default function* rootSaga() {

    // data에는 로그인데이터(ex.아이디,비밀번호..)가 들어온다.
    function loginAPI(data) {
        return axios.post('/api/login', data)
    };

    function logOutAPI() {
        return axios.post('/api/logout')
    };

    function addPostAPI(data) {
        return axios.post('/api/post', action.data)
    };



    // login함수
    // LOG_IN_REQUEST 액션 자체가 action이란 이름으로 매개변수로 들어오게 된다. // action.type하면 "LOG_IN_REQUEST"가 나오게 되고, action.data하면 로그인 데이터들이 들어가게 된다.
    function* login(action) {
        try{
            yield put({
                type: 'LOG_IN_REQUEST'
            });
            yield delay(1000)
            // const result = yield call(loginAPI, action.data) // call을 쓰면 loginAPI(action.data)를 펼쳐줘야 한다. => call(loginAPI, action.data) / call(함수, 함수의 매개변수1, 함수 매개변수2, ...)
            yield put({
                type: 'LOG_IN_SUCCESS',
                  data: result.data // 성공결과
        }) } catch(err) {
                yield put({
                    type: 'LOG_IN_FAILURE',
                      data: err.response.data // 실패결과
                })
            }
        };

    // logout함수
    function* logOut() {
        try{
            yield put({
                type: 'LOG_OUT_REQUEST'
            });
            yield delay(1000)
            // const result = yield call(loginAPI)
            yield put({
                type: 'LOG_OUT_SUCCESS',
                  data: result.data // 성공결과
        }) } catch(err) {
                yield put({
                    type: 'LOG_OUT_FAILURE',
                    data: err.response.data // 실패결과
                })
            }
    };

    // addPost함수
    function* addPost(action) { // 이 action은 'ADD_POST_REQUEST'이다.
        try{
            yield put({
                type: 'ADD_POST_REQUEST'
            });
            yield delay(1000)
            // const result = yield call(addPostAPI, action.data) // 다시 한번 말하지만 action.data는 'ADD_POST_REQUEST'액션 안에 담긴 데이터들이다!
            yield put({
                type: 'ADD_POST_SUCCESS',
                data: result.data // 성공결과
        }) } catch(err) {
                yield put({
                    type: 'ADD_POST_FAILURE',
                    data: err.response.data // 실패결과
                })
            }
    };
    
    // LOG_IN 액션이 들어오면, login generator함수가 실행된다!
        function* watchLogin() {
                yield throttle("LOG_IN_REQUEST ", login, 2000)
        };

        function* watchLogOut() {
                yield throttle("LOG_OUT_REQUEST",logOut, 2000)
        };

        function* watchAddPost() {
                yield throttle("ADD_POST_REQUEST", addPost, 2000)
        };

        


    return(
        yield all([
            fork(watchLogin),
            fork(watchLogOut),
            fork(watchAddPost),
        ])
    )
};

 
// yield take()는 일회성이다.
// 한 번 사용하고 나면 사라진다. 즉 로그인을 한번하면 사라져서 못하게 된다는 뜻!
// 이를 해결할 수 있는 방법은 while!!
// while (true)는 동기적으로 작동한다. takeEvery는 비동기적으로 작동한다.
