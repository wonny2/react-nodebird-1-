import { all,fork, delay, put, takeLatest } from "redux-saga/effects";
import {LOG_IN_REQUEST,LOG_IN_SUCCESS,LOG_IN_FAILURE,
    LOG_OUT_REQUEST,LOG_OUT_SUCCESS,LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,SIGN_UP_SUCCESS,SIGN_UP_FAILURE,
    FOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE,
    UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE
} from '../reducers/user'


// 로그인할 때 넣는 정보들 = data
function logInAPI(data) {
    // [주의] 이 함수는 *(generator)를 붙이지 않는다.
    return axios.post('/api/login', data)
}

// 로그아웃 할 땐 넣는 정보가 없으니까 없음.
function logOutAPI() {
    return axios.post('/api/logout')
}

function signUpAPI() {
    return axios.post('/api/signUp')
};

function followAPI() {
    return axios.post('/api/follow')
};

function unfollowAPI() {
    return axios.post('/api/unfollow')
};


// 매개변수로 받는 action은 login할 때 넣는 데이터들
function* logIn(action) {
    try{
        console.log("saga logIn")
        yield delay(1000);
        // const result = yield call(logInAPI, action.data)		// logInAPI 요청 결과 담기
            yield put({
                type: LOG_IN_SUCCESS,
                data: action.data,
            })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }
};


function* logOut() {
    try{
        console.log("logout saga")
        yield delay(1000)
        // const result = yield call(logOutAPI)		// logOutAPI 요청 결과 담기
            yield put({
                type: LOG_OUT_SUCCESS,
                // data: result.data
            })  
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
};

function* signUp() {
    try{
        yield delay(1000)
            yield put({
                type: SIGN_UP_SUCCESS,
                // data: result.data
            })  
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data
        })
    }
};

function* follow() {
    try{
        yield delay(1000)
            yield put({
                type: FOLLOW_SUCCESS,
                // data: result.data
            })  
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data
        })
    }
};

function* unfollow() {
    try{
        yield delay(1000)
            yield put({
                type: UNFOLLOW_SUCCESS,
                // data: result.data
            })  
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data
        })
    }
};


// 이벤트 리스너 같은 역할을 한다.
// 로그인 버튼 누르면 이 부분 실행됨
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn)    // 해석 : "'LOG_IN_REQUEST'이라는 액션이 실행되면, logIn 함수를 실행하겠다" 라는 뜻.
};

function* watchLogOut() {
yield takeLatest(LOG_OUT_REQUEST, logOut)     // 해석 : "'LOG_IN_REQUEST'이라는 액션이 실행되면, logOut 함수를 실행하겠다" 라는 뜻.
};

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
};


function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow)
};

function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unfollow)
};




export default function* userSaga() {
    yield all ([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchFollow),
        fork(watchUnFollow),
    ])
}

