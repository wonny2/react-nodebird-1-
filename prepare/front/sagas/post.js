import { all,fork, delay, put, takeLatest, throttle } from "redux-saga/effects";
import axios from 'axios'
import {
    ADD_POST_REQUEST,ADD_POST_SUCCESS,ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,ADD_COMMENT_SUCCESS,ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST,REMOVE_POST_SUCCESS,REMOVE_POST_FAILURE,
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE
} from '../reducers/post'

import {ADD_POST_TO_ME, REMOVE_POST_OF_ME} from '../reducers/user'
import shortid from "shortid";
import { generateDummyPost } from "../reducers/post";


function addPostAPI(data) {
    return axios.post('/api/post', data)
}

function loadPostsAPI(data) {
    return axios.get('/api/post', data)
}

function removePostAPI(data) {
    return axios.delete('/api/post', data)
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data)
}



function* addPost(action) {
    try{
        yield delay(1000)
        const id = shortid.generate();
        // const result = yield call(addPostAPI, action.data)		// addPostAPI 요청 결과 담기
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id, //게시글id를 넘겨줘야 한다.
                content: action.data,
        },
    });
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data
        });
    };
};

function* loadPosts(action) {
    try{
        yield delay(1000)
        const id = shortid.generate();
        // const result = yield call(addPostAPI, action.data)		// addPostAPI 요청 결과 담기
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10),
    });
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data
        });
    };
};


function* removePost(action) {
    try{
        yield delay(1000)
        // const id = shortid.generate(); 
        // const result = yield call(removePostAPI, action.data)		// removePostAPI 요청 결과 담기

        // post reducer 조작부분
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data // 게시글 id가 들어있다. 어떤 게시글을 지웠는지
    });

    // user reducer 조작부분
    // 이 부분이 없으면 REMOVE_SUCCESS까지는 가는데 완전히 삭제가 되지 않는다.
    // 위에 action명 선언이 되어있나 에러줄이 없어도 제대로 확인하기!
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
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
      // 해석 : "'ADD_POST_REQUEST'이라는 액션이 실행되면, addPost 함수를 실행하겠다" 라는 뜻.
};

function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts)
      // 해석 : "'ADD_POST_REQUEST'이라는 액션이 실행되면, addPost 함수를 실행하겠다" 라는 뜻.
};

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
      // 해석 : "'LOG_IN_REQUEST'이라는 액션이 실행되면, addComment 함수를 실행하겠다" 라는 뜻.
}




export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchAddComment),
        fork(watchRemovePost),
    ]);
}