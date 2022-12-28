import React, { useCallback, useState } from "react";
import { Card , Popover, Button, Avatar, List, Comment} from "antd";
import {RetweetOutlined , HeartOutlined , MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux";
import PostImages from './PostImages'
import CommentForm from './CommentForm'
import PropTypes from 'prop-types'
import PostCardContent from './PostCardContent'
import styled from 'styled-components'
import { REMOVE_POST_REQUEST } from "../reducers/post";
import FollowButton from "./FollowButton";



const PostCard = ({ post }) => {

    const CardWrapper = styled.div`
    margin-bottom: 20px;
  `;

    // {post는 pages/index에서 받아오는 post}

    // const id = useSelector((state) => state.user)
    const id = useSelector((state) => state.user.me && state.user.me.id);
    // console.log(id) // initialState이 나옴

    const dispatch = useDispatch();

    const {removePostLoading}= useSelector((state) => state.post);

    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened ] = useState(false);

    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev)
    },[]);

    const onToggleComment = useCallback(()=>{
        setCommentFormOpened((prev) => !prev)
    },[]);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        });
    },[]);


    return (
        <CardWrapper key={post.id}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} /> }
                //  배열 안에 jsx를 넣을 때는 각 key를 넣어줘야 한다. 그래서 map 함수로 뿌릴 때 key를 넣어주는 것이다!!!
                actions={[
                    <RetweetOutlined key="retweet"/>,
                   liked
                    ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike}/>
                    : <HeartOutlined key="heart"  onClick={onToggleLike} /> ,
                    <MessageOutlined key="comment" onClick={onToggleComment}/>, 
                        <Popover key="more" content={(
                            <Button.Group>               {/* 수정,삭제는 내가 쓴 글만 되도록, 신고는 남이 쓴 글이 되도록 조.건.문 을 적어야 한다. */}
                                {id && post.User.id === id ? (
                                    <>
                                        <Button>수정</Button>
                                        <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                                    </>
                                ) : <Button>신고</Button>}
                            </Button.Group>
                        )}>
                            <EllipsisOutlined />
                        </Popover>,
                ]}
                extra={id && <FollowButton post={post} />}
                >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>} 
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.contents} /> }
                />

            </Card>
            {commentFormOpened && (
                <div>
                    {/* input창 */}
                    <CommentForm post={post} />
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment post={post} //post를 넘겨주는 이유: 게시글의 댓글이라 어떤 게시글의 댓글인지 게시글의 id가 필요하기 때문이다.
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
        </CardWrapper>

    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
      id: PropTypes.number,
      User: PropTypes.object,
      content: PropTypes.string,
      createdAt: PropTypes.object,
      Comments: PropTypes.arrayOf(PropTypes.any),
      Images: PropTypes.arrayOf(PropTypes.any),
    }),
  };


export default PostCard;