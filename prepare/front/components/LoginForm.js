import React, { useCallback, useMemo } from "react";
import {Form, Input, Button} from 'antd'
import Link from "next/link";
import styled from 'styled-components'
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../reducers/user";

const ButtonWrapper = styled.div`
    margin-top:10px;
`
const FormWrapper = styled(Form)`
    padding:10px;
    
`


// 로그인 화면
const LoginForm = () => {
    const dispatch = useDispatch();
    const {logInLoading} = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const[password, onChangePassword] = useInput('');


    // 이 한 줄 자체가 
    // const [id, setId] = useState('')
    // const onChangeId = useCallback((e) => {
//          setId(e.target.value)     
   // })
    //  요 두 기능과 같은 것이다..!!



    // const[nickname, onChangeNickname] = useInput('');
    
    // const [passwordCheck, setPasswordCheck] = useState('');
    // const[passwordError, setPasswordError] = useState(false)


    // const oonChangePasswordCheck = useCallback((e) => {
    //     setPasswordCheck(e.target.value)
    //     setPasswordError(e.target.value !== password)
    // },[password])



const style = useMemo(() => ({margin: 10}),[])
// 이렇게 해야 최적화가 된다..

const onSubmitForm = useCallback(() => {
    console.log(email, password)
    dispatch(loginRequestAction({email,password})) // {email,password}가 action.data임 => 여기서 data 만든 이름임. 다른 이름으로 변경 가능함
},[email, password])


    return(
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required /> 
            </div>

            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input name="user-password"
                     value={password}
                     onChange={onChangePassword}
                     required
                     type="password"
                     /> 
            </div>

           <ButtonWrapper style={style}>
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href={'/signup'}><a>회원가입</a></Link>
           </ButtonWrapper>
        </FormWrapper>
    )
}


export default LoginForm;