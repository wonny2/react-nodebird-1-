 export const initialState = {
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
    isLoggingIn : false,  // [로그인]시도중 ,얘네들이 true이면 로딩창을 띄우기 위함이다.
    isLoggedIn : false,
    isLoggingOut : false, // [로그아웃]시도중 ,얘네들이 true이면 로딩창을 띄우기 위함이다.
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


const dummyUser = (data) => ({
    ...data,
    nickname : '원희최',
    id : 1,
    Posts : [] , // 내가 쓴 게시글들
    Followings : [],
    Followers: [],
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
    switch(action.type) {
        case LOG_IN_REQUEST :
            console.log("reducer logIn")
            return{
                // 데이터를 보여지는 상태에서 로딩창을 띄울 때
                ...state,
                logInLoading: true,
                logInError: null,
                logInDone: false,
                // user : action.data // user객체 안에 있는 user! (6번줄) user = null 이라고 적혔던 부분
                };

        case LOG_IN_SUCCESS :
            return{
                ...state,
                logInLoading : false,
                logInDone: true,
                // 위에 3줄이 실행되면 아래 me에 data가 들어가게 된다. 들어가면 isLoggedIn이 true가 된다.
                me : dummyUser(action.data),
                // = {...action.data, nickname: '원희최'}
                };
        case LOG_IN_FAILURE :
            return{
                ...state,
                logInLoading: false,
                logInError: action.error,
                };

        // ============ //
        case LOG_OUT_REQUEST :
            return{
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: null,
                // me : null // user객체 안에 있는 user! (6번줄)
                };

        case LOG_OUT_SUCCESS :
            return{
                ...state,
                logOutLoading: false,
                logOutDone:true,
                me : null,
                // me : {...action.data, nickname: '원희최'}
                };

        case LOG_OUT_FAILURE :
            return{
                ...state,
                logOutLoading: false,
                logOutError: action.error
                };
        // ============ //
        case LOG_OUT_REQUEST :
            return{
                ...state,
                isLoggingOut: true,
                me : null // user객체 안에 있는 user! (6번줄)
                };

        case LOG_OUT_SUCCESS :
            return{
                ...state,
                signUpLoading : false,
                signUpDone: true,
                // me : null
                isLoggingOut : false,
                isLoggedIn: false,
                me : null 
            };

        case LOG_OUT_FAILURE :
            return{
                ...state,
                isLoggingOut : false,
            };
            // ============ //
        case SIGN_UP_REQUEST :
            return{
                ...state,
                signUpLoading: true,
                signUpDone: false,
                signUpError: null,
                // me : null // user객체 안에 있는 user! (6번줄)
            };
    
        case SIGN_UP_SUCCESS :
            return{
                ...state,
                signUpLoading : false,
                signUpDone: true,
                me : null 
            };
    
        case SIGN_UP_FAILURE :
            return{
                ...state,
                signUpLoading : false,
                signUpError: action.error,
            };
            // ============ //
        case CHANGE_NICKNAME_REQUEST :
            return{
                ...state,
                changeNicknameLoading: true,
                changeNicknameDone: false,
                changeNicknameError : null,
                // me : null // user객체 안에 있는 user! (6번줄)
                };

        case CHANGE_NICKNAME_SUCCESS :
            return{
                ...state,
                changeNicknameLoading : false,
                changeNicknameDone: true,
                me : null
                };

        case CHANGE_NICKNAME_FAILURE :
            return{
                ...state,
                changeNicknameLoading : false,
                changeNicknameError : action.error,
                };
        default : 
        return state;
    }
}

export default reducer;