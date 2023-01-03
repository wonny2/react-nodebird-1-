import produce from "immer"

 export const initialState = {
    followoading : false,  // [팔로우] 시도중 ,얘네들이 true이면 로딩창을 띄우기 위함이다.
    followDone : false,
    followError : null, 
    upfollowLoading : false,  // [언팔로우] 시도중 ,얘네들이 true이면 로딩창을 띄우기 위함이다.
    upfollowDone : false,
    upfollowError : null, 
    logInLoading : false,  // [로그인] 시도중 ,얘네들이 true이면 로딩창을 띄우기 위함이다.
    logInDone : false,
    logInError : null, 
    logOutLoading : false,  // [로그아웃] 시도중 ,얘네들이 true이면 로딩창을 띄우기 위함이다.
    logOutDone : false,
    logOutError : null,
    signUpLoading : false,  // [회원가입] 시도중 ,얘네들이 true이면 로딩창을 띄우기 위함이다.
    signUpDone : false,
    signUpError : null,
    changeNicknameLoading : false,  // [닉네임] 시도중 ,얘네들이 true이면 로딩창을 띄우기 위함이다.
    changeNicknameDone : false,
    changeNicknameError : null,
    me : null,
    signUpData: {},
    loginData: {}
    // user: null, // 나중에 여기에 {id,password} 값이 들어오고, logout하면 null값이 다시 들어온다.
}

// 오타를 막기 위해 변수로 만들어 줌!
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'


const dummyUser = (data) => ({
    ...data,
    nickname : '원희최',
    id : 1,
    Posts : [{id : 1}], // 내가 쓴 게시글들
    Followings : [{nickname : "홍길동"}, {nickname: "스펀지밥"}, {nickname: "뚱이"}],
    Followers: [{nickname : "징징이"}, {nickname: "코난"}, {nickname: "미란이"}],
    // *시퀄라이저에서 합쳐주기 때문에 앞자리가 "대문자"이다.
});


// login Action Creator
// user파일에 오게 된 것은 로그인아웃이 유저와 관련된 것이기 때문이다.
export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
  });
  
  export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
  });


const reducer = (state = initialState , action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case FOLLOW_REQUEST :
                draft.followLoading = true;
                draft.followError = null;
                draft.followDone = false;
                break;
            case FOLLOW_SUCCESS :
                draft.followLoading = false;
                draft.me.Followings.push({id: action.data})
                draft.followDone = true;
                break;
            case FOLLOW_FAILURE :
                draft.followLoading = false;
                draft.followError = action.error;
                break;
            // ============ //
            case UNFOLLOW_REQUEST :
                draft.upfollowLoading = true;
                draft.upfollowError = null;
                draft.upfollowDone = false;
                break;
            case UNFOLLOW_SUCCESS :
                draft.upfollowLoading = false;
                draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data) // 언팔로우한 사람 데이터가 빠지는 것!! (!==)로 했기 때문
                draft.upfollowDone = true;
                break;
            case UNFOLLOW_FAILURE :
                draft.upfollowLoading = false;
                draft.upfollowError = action.error;
                break;
            // ============ //
            case LOG_IN_REQUEST :
                draft.logInLoading = true;
                draft.logInError = null;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS :
                draft.logInLoading = false;
                draft.me = dummyUser(action.data)
                draft.logInDone = true;
                break;
            case LOG_IN_FAILURE :
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            // ============ //
            case LOG_OUT_REQUEST :
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
            case LOG_OUT_SUCCESS :
                draft.logOutLoading = false;
                draft.me = null;
                draft.logOutDone = true;
                break;
            case LOG_OUT_FAILURE :
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            // ============ //
            case SIGN_UP_REQUEST :
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS :
                draft.signUpLoading = false;
                draft.signUpDone = true;
                // draft.me = null;
                break;
            case SIGN_UP_FAILURE :
                draft.signUpLoading = false;
                draft.signUpError = action.error;
                break;
                // ============ //
            case CHANGE_NICKNAME_REQUEST :
                draft.changeNicknameLoading = true;
                draft.changeNicknameDone = false;
                draft.changeNicknameError = null;
                break;
            case CHANGE_NICKNAME_SUCCESS :
                draft.changeNicknameLoading = false;
                draft.changeNicknameDone = true;
                break;
            case CHANGE_NICKNAME_FAILURE :
                draft.changeNicknameLoading = false;
                draft.changeNicknameError = action.error;
                break;
            case ADD_POST_TO_ME : 
                draft.me.Posts.unshift({id: action.data});
                break;
                // return{
                //     ...state,
                //     me : {
                //         ...state.me,
                //         Posts : [{id: action.data}, ...state.me.Posts],
                //     },
                // };
            case REMOVE_POST_OF_ME : //게시글 삭제 action
                draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data)
                break;
                // return{
                //     ...state,
                //     me : {
                //         ...state.me,
                //         Posts : state.me.Posts.filter((v) => v.id !== action.data),
                //     },
                // };
            default : 
                break;
        }
    });
}

export default reducer;