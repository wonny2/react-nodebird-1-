// 더미데이터
// 앞에 대문자로 다른 정보들고 합쳐서 주기 때문이고, id,contents는 게시글 자체의 속성이기 때문이다.
// 이 구조가 현업에서 더미데이터 구조와 거의 동일하다!!
import shortId from 'shortid'


export const initialState = {
    mainPosts : [{
        id :1 ,
        User : {
            id : 1,
            nickname : '원희최'
        },
        content : "첫 번째 게시글 #해시태그 #익스프레스",
        Images : [
            {src : "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",},
            {src : "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg",},
            {src : "https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.webp",}
    ],
        Comments : [
        {
            User : {
                nickname : 'nero'
            },
            content : "우와 개정판이 나왔군요!",
        },
        {
            User : {
                nickname : 'hero'
        } , 
            content : "얼른 사고싶어요~"
        }]
    }],
    imagePaths : [], // 이미지 업로드할 때 이미지 경로가 저장된다.
    addPostLoading: false, //게시글 추가 완료여부
    addPostDone : false,
    addPostError : null,
    addCommentLoading: false, // 댓글 추가 완료여부
    addCommentDone : false,
    addCommentError : null,
    postAdded: false, //게시글 추가 완료여부
};


export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

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
})




// 게시글 쓰면 이 state가 나왔음
const dummyPost = (data) => ({
    id: shortId.generate(),
    content : data,
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


const reducer = (state = initialState , action) => {
    switch(action.type) {

        case ADD_POST_REQUEST :
            return{
                ...state,
                addPostLoading : true,
                addPostDone : false,
                addPostError : null,
            };
        case ADD_POST_SUCCESS :  
            return{
                ...state,
                addPostLoading : false,
                addPostDone: true,
                mainPosts : [dummyPost(action.data), ...state.mainPosts], // dummyPost를 앞에 추가해야 글이 아래로 안 내려가고 위에 나타남
            };

        case ADD_POST_FAILURE :
            return{
                ...state,
                addPostLoading : false,
                addPostError: action.error,
            };
        // ============ //
        case ADD_COMMENT_REQUEST :
            return{
                ...state,
                addCommentLoading : true,
                addCommentDone : false,
                addCommentError : null,
            };
        case ADD_COMMENT_SUCCESS :  {
            const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId); // 숫자반환
            const post = {...state.mainPosts[postIndex]};
            post.Comments = [dummyComments(action.data.content), ...post.Comments];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;

            return{
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true,
            };
        }
        case ADD_COMMENT_FAILURE :
                return{
                    ...state,
                    addCommentDone: false,
                    addCommentError: action.error,
                };
        default : 
        return state;
    }
}

export default reducer;