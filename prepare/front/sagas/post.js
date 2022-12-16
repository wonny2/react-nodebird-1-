import { all,fork, delay, put, takeLatest } from "redux-saga/effects";
import axios from 'axios'
import {
    ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS,ADD_COMMENT_FAILURE  } from '../reducers/post'


function addPostAPI(data) {
    return axios.post('/api/post', data)
}


function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data)
}



function* addPost(action) {
    try{
        yield delay(1000)
        // const result = yield call(addPostAPI, action.data)		// addPostAPI 요청 결과 담기
            yield put({
                type: ADD_POST_SUCCESS,
                data: action.data
            });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data
        })
    }
}

function* addComment(action) {
    try{
        yield delay(1000)
        // const result = yield call(addCommentAPI, action.data)		// addPostAPI 요청 결과 담기
            yield put({
                type: ADD_COMMENT_SUCCESS,
                data: action.data // 댓글작성 버튼 누르면 댓글데이터들이 요기로 들어온다.
            });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        })
    }
}

// post할 때 넣는 정보들 =  data

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
      // 해석 : "'LOG_IN_REQUEST'이라는 액션이 실행되면, addPost 함수를 실행하겠다" 라는 뜻.
};


function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
      // 해석 : "'LOG_IN_REQUEST'이라는 액션이 실행되면, addComment 함수를 실행하겠다" 라는 뜻.
}


export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment)
    ]);
}