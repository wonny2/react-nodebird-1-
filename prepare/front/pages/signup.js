import AppLayout from "../components/AppLayout";
import React, { useCallback, useState } from "react";
import Head from 'next/head'
import {Form,Input,Checkbox, Button} from 'antd'
import styled from "styled-components";
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";

const ErrorMessage = styled.div`
    color:red;
`



const SignUp = () => {
    const dispatch = useDispatch();
    const {signUpLoading} = useSelector((state) => state.user);

    const [email, onChangeEmail] = useInput("")
    // 이 한 줄 자체가 
    // const [id, setId] = useState('')
    // const onChangeId = useCallback((e) => {
//          setId(e.target.value)     
   // })
    //  요 두 기능과 같은 것이다..!!

    const[nickname, onChangeNickname] = useInput("");
    const[password, onChangePassword] = useInput("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const[passwordError, setPasswordError] = useState(false)
    const [term, setTerm] = useState('');
    const[termError, setTermError] = useState(false);

    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked)
        setTermError(false)
    },[])


    const onSubmit = useCallback(() => {
        

        if(password !== passwordCheck) {
            return setPasswordError(true)
        }

        if(!term) {
            return setTermError(true)
        }

        console.log(email, nickname, password)
        dispatch({
            type: SIGN_UP_REQUEST,
            data : {email, password, nickname},
        });
    },[email,password,passwordCheck,term]);

   const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value)
        setPasswordError(e.target.value !== password)
    },[password])
    


    return(
        <AppLayout>
        <Head>
            <meta charSet='utf-8' />
            <title>회원가입</title>
        </Head>

        
        <Form onFinish={onSubmit}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required /> 
            </div>

            <div>
                <label htmlFor="user-nick">닉네임</label>
                <br />
                <Input name="user-nick" value={nickname} onChange={onChangeNickname} required /> 
            </div>

            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input type="password" name="user-password" value={password} onChange={onChangePassword} required /> 
            </div>

            <div>
                <label htmlFor="user-password-check">비밀번호 체크</label>
                <br />
                <Input type="password" name="user-password-check" value={passwordCheck} onChange={onChangePasswordCheck} required /> 
                {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
            </div>            
        
            <div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>꾸준히 할 것을 동의합니다.</Checkbox> 
                {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
            </div>

            <div style={{marginTop: 10}}>
                <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>    
            </div>  
            </Form>
        </AppLayout>
    )
}



export default SignUp;