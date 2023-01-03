// 더미데이터
// 앞에 대문자로 다른 정보들고 합쳐서 주기 때문이고, id,contents는 게시글 자체의 속성이기 때문이다.
// 이 구조가 현업에서 더미데이터 구조와 거의 동일하다!!
import shortId from 'shortid'
import produce from 'immer'
import {faker} from '@faker-js/faker'

export const initialState = {
    mainPosts : [
    //     {
    //     id :1 ,

    //     User : {
    //         id : 1,
    //         nickname : '원희최'
    //     },
    //     content : "첫 번째 게시글 #해시태그 #익스프레스",
    //     id: shortId.generate(),
    //     Images : [
    //         {src : "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",},
    //         {src : "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg",},
    //         {src : "https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.webp",}
    // ],

    //     Comments : [
    //     {
    //         id: shortId.generate(),
    //         User : {
    //             id: shortId.generate(),
    //             nickname : 'nero'
    //         },
    //         content : "우와 개정판이 나왔군요!",
    //     },
    //     {
    //         id: shortId.generate(),
    //         User : {
    //             id: shortId.generate(),
    //             nickname : 'hero'
    //     } , 
    //         content : "얼른 사고싶어요~"
    //     }]
    // }
],
    imagePaths : [], // 이미지 업로드할 때 이미지 경로가 저장된다.
    hasMorePosts : true,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false, //게시글 추가 완료여부
    addPostDone: false,
    addPostError: null,
    removePostLoading: false, 
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false, // 댓글 추가 완료여부
    addCommentDone: false,
    addCommentError: null,
    postAdded: false, //게시글 추가 완료여부
};

//1228 1.mainPosts더미데이터 부분을 함수로 만들기!
export const generateDummyPost = (number) => Array(20).fill().map(() => ({
    id: shortId.generate(),
        User : {
            id: shortId.generate(),
            nickname: faker.name.fullName(),
        },
        contents: faker.lorem.paragraph(),

        Images:[{
            src: faker.image.image()
        }],


        Comments:[{
            User : {
                id: shortId.generate(), 
                nickname: faker.name.fullName()
            },
            content: faker.lorem.sentence(),
        }],
}));



// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
 

// action을 그때그때 생성해주는 함수(크리에이터)
export const addPost = (data) => ({
    type : ADD_POST_REQUEST,
    data, // 쓴 게시글 데이터가 들어있는 곳
})

// 댓글등록 버튼 누르면 이 곳이 실행되고,
export const addComment = (data) => ({
    type : ADD_COMMENT_REQUEST,
    data,
});


// 게시글 쓰면 이 state가 나왔음
const dummyPost = (data) => ({
    id: data.id,
    content : data.content,
    User : {
        id : 1,
        nickname : "제로초"
    },
    Images : [],
    Comments : [],
});


const dummyComments = (data) => ({
    id: shortId.generate(),
    content : data,
    User : {
        id : 1,
        nickname : "제로초"
    },
});



// reducer는 이전상태를 action을 통해 다음 상태로 만들어 내는 함!수!
// 단 불변성은 지키면서!!
const reducer = (state = initialState , action) => {
    return produce(state,(draft) => {
        switch(action.type) {
            case LOAD_POSTS_REQUEST :
                // ...state, <- 이 state를 draft로 변경함!
                draft.loadPostsLoading = true;
                draft.loadPostsDone =  false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS :  
                draft.loadPostsLoading = false;
                draft.loadPostsDone  =true;
                draft.mainPosts = action.data.concat(draft.mainPosts) // 기존 데이터에 10개씩 보여줌
                draft.hasMorePosts = draft.mainPosts.length < 50;
                break;
            case LOAD_POSTS_FAILURE :
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.Error;
                break;
            // ============ //
            case ADD_POST_REQUEST :
                // ...state, <- 이 state를 draft로 변경함!
                draft.addPostLoading = true;
                draft.addPostDone =  false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS :  
                draft.addPostLoading = false;
                draft.addPostDone  =true;
                draft.mainPosts.unshift(dummyPost(action.data)); // dummyPost를 앞에 추가해야 글이 아래로 안 내려가고 위에 나타남
                break;
            case ADD_POST_FAILURE :
                draft.addPostLoading = false;
                draft.addPostError = action.Error;
                break;
            // ============ //
            case REMOVE_POST_REQUEST :
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS :
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE :
                draft.removePostLoading  = false;
                draft.removePostError = action.error;
                break;
                // 원래모습 return{
                //     ...state,
                //     removePostLoading : false,
                //     removePostError: action.error,
                // };
            // ============ //
            case ADD_COMMENT_REQUEST :
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;

            // 이 부분 때문에 immer를 사용한 거라고 해도 무방하다
            case ADD_COMMENT_SUCCESS :  {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId)
                post.Comments.unshift(dummyComments(action.data.content)) //  강의에서는 dummyComment (s가 없음)
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId); // 숫자반환
                // const post = {...state.mainPosts[postIndex]};
                // post.Comments = [dummyComments(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
    
                // return{
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                // };
            }
            case ADD_COMMENT_FAILURE :
                draft.addCommentDone = false;
                draft.addCommentError = action.error;
                break;
            default : 
            break;
        }
    });
}

export default reducer;