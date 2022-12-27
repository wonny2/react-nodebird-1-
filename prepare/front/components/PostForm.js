import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import {addPost} from '../reducers/post'

// 게시글 Input창
const PostForm = () => {

    const {imagePaths, addPostDone} = useSelector((state) => state.post)
    const [text, onChangeText, setText] = useInput('')
    const dispatch = useDispatch();


    const onSubmit = useCallback(() => {
        dispatch(addPost(text)) // addPost는 reducer/post에서 import 해온 것이다..! 그리고 얘는 reducer이다.
        },[text]);

    useEffect(() => {
        if(addPostDone) {
            setText("");
        };
    },[addPostDone]);


    const imageInput = useRef();
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
        },[imageInput.current]);


    return(
        <Form style={{margin : '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>

            <Input.TextArea 
                value={text}
                onChange={onChangeText} 
                maxLength={140} 
                placeholder="어떤 신기한 일이 있었나요?" />
            <div>
                <input type='file' multiple hidden ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float : 'right'}} htmlType="submit">짹짹</Button>
            </div>

            <div>
                {imagePaths.map((v) => {
                    <div>
                        {/* 이미지 미리보기 부분 */}
                        <img src={v} style={{width: '200px'}} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                })}
            </div>
        </Form>
    )
}

export default PostForm;