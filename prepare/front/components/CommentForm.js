import React, { useCallback, useEffect } from "react";
import {Button, Form, Input} from 'antd';
import useInput from "../hooks/useInput";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";


// 게시글 댓글 쓰는 부분
const CommentForm = ({ post }) => {

    const id = useSelector((state) => state.user.me?.id)
    const [commentText, onChangeCommentText, setCommentText] = useInput('')
  
    // const [commentText, CommentText] = useState('')
    // const onChangeCommentText = useState('')
    // 위의 두 줄을 useInput 사용하여 한 줄로 줄일 수 있다.

    const {addCommentDone , addCommentLoading} = useSelector((state) => state.post)
    const dispatch = useDispatch();

    const onSubmitComment = useCallback(() => {
        console.log(post.id , commentText)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data : {content : commentText, postId:post.id, userId: id},
        });
    },[commentText, id])

    useEffect(() => {
        if(addCommentDone) {
            setCommentText("")
        }
    },[addCommentDone])
    
    return(
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{position:'relative', margin : 0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} row={4} />
                <Button type="primary" htmlType="submit" style={{position: 'absolute',right: 0, bottom: -40, zIndex: 1}} loading={addCommentLoading} >삐약</Button>
                {/* Button에 style={{position: 'absolute',right: 0, bottom: -40}} 을 넣으면 안되고 , 안 넣으면 된다,, 만약 style을 할려면 useMemo로 만들어야 한다고 함*/}
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post : PropTypes.object.isRequired,
};
 
export default CommentForm;